"""Recover public Judge.me review fields from archived product HTML."""
import json, sys
from pathlib import Path
from html.parser import HTMLParser
class Node:
 def __init__(self,tag='',attrs=()): self.tag=tag;self.a=dict(attrs);self.children=[]
 def text(self): return ''.join(c if isinstance(c,str) else c.text() for c in self.children)
 def find(self,cls):
  out=[self] if cls in self.a.get('class','').split() else []
  for c in self.children:
   if isinstance(c,Node):out+=c.find(cls)
  return out
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.root=Node();self.stack=[self.root]
 def handle_starttag(self,t,a):
  n=Node(t,a);self.stack[-1].children.append(n)
  if t not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.stack.append(n)
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag==t:self.stack=self.stack[:i];break
 def handle_data(self,d):self.stack[-1].children.append(d)
root=Path(__file__).resolve().parents[1]
products=json.loads((root/'data/products.json').read_text())['products'];handles={p['handle'] for p in products}
records={};counts={}
for file in sorted(Path(sys.argv[1]).glob('*.html')):
 p=Parser();p.feed(file.read_text());found={}
 for n in p.root.find('jdgm-rev'):
  if not n.a.get('data-review-id'):continue
  def field(c):
   ns=n.find(c);return ns[0].text().strip() if ns else ''
  handle=n.a.get('data-product-url','').rstrip('/').split('/')[-1]
  assert handle in handles,handle
  times=n.find('jdgm-rev__timestamp');ratings=n.find('jdgm-rev__rating')
  r={'id':'judgeme:'+n.a['data-review-id'],'handle':handle,'name':field('jdgm-rev__author'),'title':field('jdgm-rev__title'),'body':field('jdgm-rev__body'),'rating':int(ratings[0].a['data-score']),'date':times[0].a.get('datetime','')[:10] if times else '', 'source':'Shopify / Judge.me','verifiedPurchase':False,'status':'published'}
  assert r['body'] and r['name'] and 1<=r['rating']<=5
  if r['id'] in records:assert records[r['id']]==r
  records[r['id']]=r;found[r['id']]=r
 if found:counts[file.stem]=len(found)
(root/'data/reviews.json').write_text(json.dumps({'reviews':list(records.values())},indent=2,ensure_ascii=False)+'\n')
print(f'Recovered {len(records)} reviews across {len(counts)} products')
