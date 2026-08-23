#!/usr/bin/env python3
"""Headless 視覺探測：結局畫面與結局圖鑑美術載入狀況。
用法：python3 tools/ending_probe.py [ending|gallery|all]
截圖輸出至 /tmp/opencode/ending_probe_*.png，量測結果印到 stdout。"""
import subprocess, threading, http.server, functools, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8979
MODE = sys.argv[1] if len(sys.argv) > 1 else 'all'
OUT = '/tmp/opencode'

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)

HOOK = ('<div id="__probe" style="position:fixed;top:0;left:0;z-index:99999;'
        'background:#000;color:#0f0;font-size:13px;padding:6px;max-width:760px;'
        'white-space:pre-wrap;">READY</div>')

HEAD = '''<script>
var out=[];
function wait(ms){return new Promise(function(r){setTimeout(r,ms);});}
'''

JS_ENDING = '''
setTimeout(async function(){
  try{
    UM.settings={fastText:true};
    UM.Engine.newGame({bgIdx:0,gender:'m',name:'probe',job:'科學家'},null);
    // rAF 在 headless 虛擬時間下時序不穩定，做輪詢避免探測抖動
    var end=UM.DATA.ENDINGS_BY_KEY['rebirth'];
    UM.Screens.showEndingScreen(end);
    // rAF 可能在 headless 虛擬時間下晚於 setTimeout，先輪詢再強制保底，確保截圖可見
    for(var _i=0;_i<12;_i++){ await wait(180); if(document.getElementById('ending-screen')?.classList.contains('show')) break; }
    var ov=document.getElementById('ending-screen');
    var rafHit=ov.classList.contains('show');
    if(!rafHit) ov.classList.add('show');
    out.push('ov_exists='+!!ov);
    out.push('ov_show_raf='+rafHit);
    out.push('ov_show_final='+ov.classList.contains('show'));
    var img=ov.querySelector('.end-art img');
    out.push('src='+(img?img.getAttribute('src'):'NONE'));
    out.push('loaded='+(!!img&&img.complete&&img.naturalWidth>0));
    if(img){
      var r=img.getBoundingClientRect();
      out.push('rect='+Math.round(r.width)+'x'+Math.round(r.height));
      out.push('ratio='+(r.width/r.height).toFixed(3)+' (expect ~1.600)');
      var t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
      out.push('center_hit='+(t?(t===img||img.contains(t)?'YES':t.tagName):'null'));
    }
    out.push('h_overflow='+(document.documentElement.scrollWidth>window.innerWidth));
  }catch(e){out.push('EXC:'+e.message);}
  document.getElementById('__probe').textContent=out.join('\\n');
},500);
'''

JS_GALLERY = '''
setTimeout(async function(){
  try{
    UM.DATA.ENDINGS.forEach(function(e){UM.Save.unlockEnding(e.key);});
    UM.Screens.showGallery();
    await wait(2600);
    var imgs=document.querySelectorAll('.gal-card img');
    var ok=0;
    imgs.forEach(function(im){if(im.complete&&im.naturalWidth>0)ok++;});
    out.push('imgs='+ok+'/'+imgs.length+' loaded');
    var bad=[],missing=[];
    imgs.forEach(function(im){
      var name=im.src.split('/').pop();
      if(!(im.complete&&im.naturalWidth>0))missing.push(name);
      var r=im.getBoundingClientRect();
      if(r.width>0&&Math.abs(r.width/r.height-1.6)>0.02)bad.push(name+'='+(r.width/r.height).toFixed(3));
    });
    out.push('not_loaded='+(missing.length?missing.join(','):'none'));
    out.push('ratio_bad='+(bad.length?bad.join(','):'none'));
    out.push('h_overflow='+(document.documentElement.scrollWidth>window.innerWidth));
    var im0=document.querySelector('.gal-card img');
    if(im0){
      im0.scrollIntoView({block:'center'});await wait(120);
      var r=im0.getBoundingClientRect();
      var t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
      out.push('first_hit='+(t&&(t===im0||im0.contains(t))?'YES':'NO:'+(t?t.tagName:'null')));
    }
  }catch(e){out.push('EXC:'+e.message);}
  document.getElementById('__probe').textContent=out.join('\\n');
},500);
'''

RUNS = []
if MODE in ('ending', 'all'):
    RUNS.append(('ending', JS_ENDING, os.path.join(OUT, 'ending_probe_ending.png')))
if MODE in ('gallery', 'all'):
    RUNS.append(('gallery', JS_GALLERY, os.path.join(OUT, 'ending_probe_gallery.png')))


def run_one(name, js, shot):
    html = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    auto = HEAD + js + '</scr' + 'ipt></body>'
    page = html.replace('<body>', '<body>' + HOOK, 1).replace('</body>', auto, 1)
    tmp_page = '__ending_probe_%s.html' % name
    tmp = os.path.join(ROOT, tmp_page)
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write(page)
    try:
        res = subprocess.run(
            ['google-chrome', '--headless=new', '--disable-gpu', '--no-sandbox',
             '--hide-scrollbars', '--window-size=%s,1000' % os.environ.get('PROBE_W', '1440'), '--virtual-time-budget=180000',
             '--screenshot=' + shot,
             '--dump-dom', 'http://127.0.0.1:%d/%s' % (PORT, tmp_page)],
            capture_output=True, text=True, timeout=240).stdout
        m = re.search(r'id="__probe"[^>]*>([\s\S]*?)</div>', res)
        print('== %s ==' % name)
        print(m.group(1) if m else 'PROBE FAILED: no output')
        print('screenshot: %s (%s)' % (shot, 'saved' if os.path.exists(shot) else 'MISSING'))
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def main():
    os.makedirs(OUT, exist_ok=True)
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        for name, js, shot in RUNS:
            run_one(name, js, shot)
    finally:
        srv.shutdown()


if __name__ == '__main__':
    main()
