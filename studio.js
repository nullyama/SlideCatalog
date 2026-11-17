/* Local-only authoring controls. No model calls, uploads, or external requests. */
(() => {
 const form=document.querySelector('.studio-controls');
 const prefs=catalogState.preview;
 const topic=document.getElementById('preview-topic');topic.value=prefs.topic||document.getElementById('topic').value;
 ['bg','ink','tint'].forEach(k=>document.getElementById('preview-'+k).value=prefs[k]);document.getElementById('custom-palette').checked=prefs.custom;
 function contrast(a,b){const luminance=h=>{const v=h.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722};const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
 function refresh(){
   const p=catalogState.preview;
   p.topic=topic.value.slice(0,28);
   for(const k of ['bg','ink','tint'])p[k]=document.getElementById('preview-'+k).value;
   p.custom=document.getElementById('custom-palette').checked;
   document.getElementById('topic').value=p.topic;
   document.querySelectorAll('.design-card').forEach((c,i)=>{c.querySelector('.sample-open svg').outerHTML=sample(designs[i]);});
   savePreview();
   const ratio=Math.min(contrast(p.ink,p.bg),contrast(p.ink,p.tint));
   document.getElementById('contrast-warning').textContent=p.custom?`文字と背景／補助色の最小コントラスト比：${ratio.toFixed(1)}:1${ratio<4.5?'。小さな文字は読みにくくなる可能性があります。配色を見直してください。':''}`:'';
   generate();
 }
 document.querySelectorAll('.studio-controls input,#preview-topic').forEach(e=>e.addEventListener('input',refresh));document.getElementById('topic').addEventListener('change',()=>{topic.value=document.getElementById('topic').value;refresh()});
 const comparison=catalogState.comparison;const compare=document.getElementById('comparison-dialog');
 document.getElementById('compare-close').onclick=()=>compare.close();
 function selection(){document.getElementById('compare-open').textContent=`比較する（${comparison.size} / 3）`;document.getElementById('compare-open').disabled=comparison.size<2;document.querySelectorAll('[name=compare]').forEach(e=>e.checked=comparison.has(e.value));}
 document.querySelectorAll('.design-card').forEach((c,i)=>{const l=document.createElement('label');l.className='compare-choice';l.innerHTML=`<input type="checkbox" name="compare" value="${designs[i].id}"> 比較に追加`;c.querySelector('.actions').append(l);l.querySelector('input').onchange=e=>{if(e.target.checked){if(comparison.size>=3){e.target.checked=false;document.getElementById('compare-open').textContent='比較は3件までです';return;}comparison.add(e.target.value);}else comparison.delete(e.target.value);selection();};});
 document.getElementById('compare-clear').onclick=()=>{comparison.clear();selection()};
 document.getElementById('compare-open').onclick=()=>{const grid=compare.querySelector('.comparison-grid');grid.innerHTML=[...comparison].map(id=>{const d=designs.find(x=>x.id===id);return `<article><h3>${esc(d.id+' '+d.name)}</h3>${sample(d)}<p>${esc(d.purpose)}</p><button class="button" data-adopt="${id}">この見本を採用</button></article>`}).join('');grid.querySelectorAll('[data-adopt]').forEach(b=>b.onclick=()=>{const d=designs.find(x=>x.id===b.dataset.adopt);document.querySelectorAll('[name=style]').forEach(e=>e.checked=e.value===d.name);generate();compare.close();});compare.showModal();};
 refresh();
})();
