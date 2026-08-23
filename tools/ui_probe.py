#!/usr/bin/env python3
import subprocess, threading, http.server, functools, os, re, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8977
STEPS = int(sys.argv[2]) if len(sys.argv) > 2 else 10

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
srv = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()

html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
hook = ('<div id="__probe" style="position:fixed;top:0;left:0;z-index:99999;'
        'background:#000;color:#0f0;font-size:13px;padding:6px;max-width:760px;'
        'white-space:pre-wrap;">READY</div>')
auto = '''<script>
var out=[];
function wait(ms){return new Promise(function(r){setTimeout(r,ms);});}
function realClick(el){var r=el.getBoundingClientRect();var t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);if(t&&t.click)t.click();return t;}
function btnPoint(id){var r=document.getElementById(id).getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2];}
setTimeout(async function(){
  try{
    var ov=document.getElementById('overlay');
    out.push('overlay_closed_display='+getComputedStyle(ov).display);
    var p=btnPoint('btn-new');var h=document.elementFromPoint(p[0],p[1]);
    out.push('btn_new_hit='+(h?(h.id||h.className):'null'));
    h.click();await wait(150);
    out.push('screen='+(document.querySelector('.screen.active')||{id:'none'}).id);
    UM.settings={fastText:true};
    document.getElementById('inp-name').value='probe';
    document.getElementById('btn-start').scrollIntoView({block:'center'});await wait(80);
    p=btnPoint('btn-start');document.elementFromPoint(p[0],p[1]).click();await wait(300);
    out.push('game='+(document.querySelector('.screen.active')||{id:'none'}).id+'/'+UM.state.node);
    for(var k=0;k<%STEPS%;k++){
      var c=document.querySelectorAll('#choices .choice-btn:not(.disabled)');
      if(!c.length){await wait(200);continue;}
      var b=c[c.length-1],r=b.getBoundingClientRect();
      var t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
      out.push(k+':'+UM.state.node+' hit='+(t?(t.className||t.tagName).toString().slice(0,16):'null'));
      t.click();await wait(250);
      if(UM.state.ended){out.push('ENDED='+UM.state.ended);break;}
    }
    var fabs=['fab-status','fab-inv','fab-log','fab-map','fab-lore','fab-save'];
    for(var i=0;i<fabs.length;i++){
      var f=document.getElementById(fabs[i]);
      f.scrollIntoView({block:'center'});await wait(60);
      var hit=realClick(f);await wait(220);
      var opened=!document.getElementById('overlay').hidden;
      out.push(fabs[i]+'='+(opened?'OPEN':'FAIL')+' hit='+(hit?(hit.id||hit.className).toString().slice(0,14):'null'));
      var x=document.querySelector('#panel-card .x');if(x)x.click();
      await wait(320);
    }
  }catch(e){out.push('EXC:'+e.message);}
  document.getElementById('__probe').textContent=out.join('\\n');
},500);
'''
auto = auto.replace('%STEPS%', str(STEPS))
auto += '</scr' + 'ipt></body>'
html = html.replace('<body>', '<body>' + hook, 1).replace('</body>', auto, 1)

tmp = os.path.join(ROOT, '__ui_probe.html')
open(tmp, 'w', encoding='utf-8').write(html)
try:
    res = subprocess.run(['google-chrome', '--headless=new', '--disable-gpu', '--no-sandbox',
                          '--window-size=1440,1000', '--virtual-time-budget=180000',
                          '--dump-dom', 'http://127.0.0.1:%d/__ui_probe.html' % PORT],
                         capture_output=True, text=True, timeout=240).stdout
    m = re.search(r'id="__probe"[^>]*>([\s\S]*?)</div>', res)
    print(m.group(1) if m else 'PROBE FAILED: no output')
finally:
    if os.path.exists(tmp):
        os.remove(tmp)
    srv.shutdown()
