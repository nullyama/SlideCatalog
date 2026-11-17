// Progressive enhancement: retain all sections when this script cannot run.
(() => {
 const main=document.querySelector('main');
 const views=['style','catalog','settings','brief'];
 const nav=document.querySelector('.workflow-nav');
 const guide=document.createElement('details');guide.className='workspace-guide';
 guide.innerHTML='<summary>使い方・試作・参考資料</summary>';
 [...main.children].filter(e=>(e.matches('aside')||e.matches('section:not([id])')||e.id==='actual-sample')).forEach(e=>guide.append(e));
 main.append(guide);
 const intro=document.createElement('details');intro.className='catalog-explainer';intro.innerHTML='<summary>見本の種類・内容について</summary>';const style=document.getElementById('style');[...style.children].filter(e=>e.tagName==='P'&&!e.id).forEach(p=>intro.append(p));style.querySelector('h2').after(intro);
 const hero=document.querySelector('.hero');hero.classList.add('compact-hero');
 const heading=hero.querySelector('h1');heading.textContent='研修スライド工房';
 hero.querySelector('.lead').textContent='見本選びから制作指示まで。工程を切り替えて、必要なものだけを表示。';
 const pager=document.createElement('div');pager.className='gallery-pager';pager.innerHTML='<button class="button button-secondary" id="page-prev">前へ</button><span id="page-status" role="status"></span><button class="button button-secondary" id="page-next">次へ</button>';
 document.getElementById('styles').after(pager);
 document.getElementById('page-prev').onclick=()=>{galleryPage--;paginateDesigns();document.getElementById('styles').scrollIntoView({block:'start'});};
 document.getElementById('page-next').onclick=()=>{galleryPage++;paginateDesigns();document.getElementById('styles').scrollIntoView({block:'start'});};
 window.addEventListener('resize',paginateDesigns);
 const rec=document.getElementById('recommend-text').closest('aside')||document.getElementById('recommend-text').parentElement;const recDetails=document.createElement('details');recDetails.className='recommend-disclosure';recDetails.innerHTML='<summary>目的をざっくり伝えて、おすすめを探す</summary>';rec.before(recDetails);recDetails.append(rec);
 const tags=document.getElementById('tags');const detail=document.createElement('details');detail.className='tag-disclosure';detail.innerHTML='<summary>タグでさらに絞る</summary>';tags.before(detail);detail.append(tags);
 function show(id,focus=false){if(!views.includes(id))return;views.forEach(v=>document.getElementById(v).hidden=v!==id);nav.querySelectorAll('a').forEach(a=>{const active=a.hash==='#'+id;a.setAttribute('aria-current',active?'step':'false');});if(focus){const h=document.getElementById(id).querySelector('h2');h.tabIndex=-1;h.focus({preventScroll:true});nav.scrollIntoView({block:'start'});}}
 document.querySelectorAll('a[href^="#"]').forEach(a=>{const id=a.hash.slice(1);if(views.includes(id))a.addEventListener('click',()=>show(id,true));if(id==='actual-sample')a.addEventListener('click',()=>guide.open=true);});
 window.addEventListener('hashchange',()=>show(location.hash.slice(1)));
 show(views.includes(location.hash.slice(1))?location.hash.slice(1):'style');filterDesigns();
})();
