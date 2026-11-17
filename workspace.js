/* Navigation and pagination behavior. Layout is declared in index.html. */
(() => {
 const views=['style','catalog','settings','brief'];
 const nav=document.querySelector('.workflow-nav');
 const guide=document.querySelector('.workspace-guide');
 const sidebar=document.querySelector('.catalog-sidebar');
 sidebar.open=false;
 for(const [id,delta] of [['page-prev',-1],['page-next',1]]) document.getElementById(id).onclick=()=>{
   catalogState.page+=delta;paginateDesigns();document.getElementById('styles').scrollIntoView({block:'start'});
 };
 window.addEventListener('resize',paginateDesigns);
 function show(id,focus=false){
   if(!views.includes(id))return;
   for(const view of views)document.getElementById(view).hidden=view!==id;
   nav.querySelectorAll('a').forEach(a=>a.setAttribute('aria-current',a.hash==='#'+id?'step':'false'));
   if(focus){const h=document.getElementById(id).querySelector('h2');h.tabIndex=-1;h.focus({preventScroll:true});nav.scrollIntoView({block:'start'});}
 }
 document.querySelectorAll('a[href^="#"]').forEach(a=>{
   const id=a.hash.slice(1);
   if(views.includes(id))a.addEventListener('click',()=>show(id,true));
   if(id==='actual-sample')a.addEventListener('click',()=>guide.open=true);
 });
 window.addEventListener('hashchange',()=>show(location.hash.slice(1)));
 show(views.includes(location.hash.slice(1))?location.hash.slice(1):'style');
 filterDesigns();
})();
