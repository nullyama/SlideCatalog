/* One navigation controller: URL is authoritative; saved view is only a resume fallback. */
(() => {
 const views=['style','catalog','settings','brief'];
 const saved=readLocal('slide-workspace-v1',{});
 const nav=document.querySelector('.workflow-nav');
 const guide=document.querySelector('.workspace-guide');
 let current='style',pendingNavigation=null;
 function navigate(id){if(location.hash!=='#'+id)history.pushState(null,'','#'+id);show(id,true);}
 function remember(){writeLocal('slide-workspace-v1',{view:current,page:catalogState.page,purpose:document.getElementById('purpose').value,query:document.getElementById('design-search').value,tags:[...document.querySelectorAll('[name=tag]:checked')].map(e=>e.value),favOnly});}
 function show(id,focus=false){
   if(!views.includes(id))id='style';current=id;
   document.querySelectorAll('dialog[open]').forEach(d=>{routeClosedDialogs.add(d);d.close();});
   for(const view of views)document.getElementById(view).hidden=view!==id;
   nav.querySelectorAll('a').forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});
   if(id==='brief')generate();
   document.title=`${nav.querySelector('[aria-current]').textContent.trim()} — 研修スライド工房`;
   remember();
   if(focus){const h=document.getElementById(id).querySelector('h2');h.tabIndex=-1;h.focus({preventScroll:true});nav.scrollIntoView({block:'start'});}
 }
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
   const id=a.hash.slice(1);
   if(views.includes(id)){e.preventDefault();if(catalogState.modalReturn){pendingNavigation=id;return;}navigate(id)}
   if(id==='actual-sample')guide.open=true;
 }));
 window.addEventListener('popstate',()=>{const id=history.state?.catalogDialog;if(id){const d=document.getElementById(id);if(d&&!d.open)d.showModal();return;}const modalReturn=catalogState.modalReturn||!!document.querySelector('dialog[open]');catalogState.modalReturn=false;const hash=location.hash.slice(1);show(['main-content','actual-sample'].includes(hash)?current:hash,!modalReturn);if(pendingNavigation){const next=pendingNavigation;pendingNavigation=null;navigate(next)}});
 window.addEventListener('hashchange',()=>{if(views.includes(location.hash.slice(1)))show(location.hash.slice(1))});
 for(const [id,delta] of [['page-prev',-1],['page-next',1]])document.getElementById(id).onclick=()=>{catalogState.page+=delta;paginateDesigns();remember();document.getElementById('styles').scrollIntoView({block:'start'});};
 window.addEventListener('resize',paginateDesigns);
 document.getElementById('clear-empty').onclick=()=>document.getElementById('clear-filters').click();
 const purpose=document.getElementById('purpose');if([...purpose.options].some(o=>o.value===saved.purpose))purpose.value=saved.purpose;
 document.getElementById('design-search').value=typeof saved.query==='string'?saved.query:'';
 document.querySelectorAll('[name=tag]').forEach(e=>e.checked=Array.isArray(saved.tags)&&saved.tags.includes(e.value));
 favOnly=saved.favOnly===true;document.getElementById('only-favorites').textContent=favOnly?'すべての候補へ戻す':'お気に入りだけ表示';
 catalogState.page=Number.isInteger(saved.page)?saved.page:0;filterDesigns(false);
 document.getElementById('style').addEventListener('input',remember);
 document.getElementById('style').addEventListener('click',()=>queueMicrotask(remember));
 const initial=views.includes(location.hash.slice(1))?location.hash.slice(1):views.includes(saved.view)?saved.view:'style';
 const auxiliary=['main-content','actual-sample'].includes(location.hash.slice(1));
 if(!auxiliary)history.replaceState(null,'','#'+initial);
 show(initial);
 if(location.hash==='#actual-sample'){guide.open=true;document.getElementById('actual-sample').scrollIntoView();}
 if(saved.view)document.getElementById('resume-status').textContent='前回の工程・設定を復元しました。上の手順から、いつでも選び直せます。';
})();
