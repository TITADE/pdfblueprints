// Minimal GitHub OAuth provider for Decap CMS (github backend), run as a
// standalone Cloudflare Worker. Implements the two endpoints Decap expects:
//   GET /auth      -> redirects the admin user to GitHub to authorize
//   GET /callback  -> exchanges the code for a token and hands it back to
//                     the Decap admin panel via postMessage, as Decap requires
//
// Required secrets (set with `npx wrangler secret put NAME`):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET
//
// These come from a GitHub OAuth App you register once (see ADMIN_SETUP.md).

function randomState() {
  return crypto.randomUUID();
}

function htmlResponse(body) {
  return new Response(body, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const state = randomState();
      const redirectUri = `${url.origin}/callback`;
      const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
      authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authorizeUrl.searchParams.set('redirect_uri', redirectUri);
      authorizeUrl.searchParams.set('scope', 'repo,user');
      authorizeUrl.searchParams.set('state', state);

      const headers = new Headers({ Location: authorizeUrl.toString() });
      // Stash state in a short-lived cookie to check on callback.
      headers.append('Set-Cookie', `oauth_state=${state}; Max-Age=600; Path=/; HttpOnly; Secure; SameSite=Lax`);
      return new Response(null, { status: 302, headers });
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const returnedState = url.searchParams.get('state');
      const cookie = request.headers.get('Cookie') || '';
      const match = cookie.match(/oauth_state=([^;]+)/);
      const savedState = match ? match[1] : null;

      if (!code || !returnedState || !savedState || returnedState !== savedState) {
        return htmlResponse('<p>OAuth state mismatch or missing code. Close this window and try logging in again.</p>');
      }

      const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/callback`,
        }),
      });
      const tokenData = await tokenResp.json();

      if (!tokenData.access_token) {
        return htmlResponse(`<p>GitHub did not return a token: ${JSON.stringify(tokenData)}</p>`);
      }

      const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
      // Decap listens for this exact postMessage protocol from the popup it opened.
      const script = `
        <script>
          (function() {
            function receiveMessage() {
              window.opener.postMessage(
                'authorization:github:success:${payload.replace(/'/g, "\\'")}',
                '*'
              );
              window.removeEventListener('message', receiveMessage, false);
            }
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          })();
        </script>
        <p>Authenticated. You can close this window.</p>
      `;
      return htmlResponse(script);
    }

    return new Response('Decap CMS OAuth provider. Endpoints: /auth, /callback', { status: 200 });
  },
};
