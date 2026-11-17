/* Explicit two-region catalog shell. Move existing controls without rebuilding inputs. */
(() => {
 const section=document.getElementById('style');const gallery=document.getElementById('styles');const pager=section.querySelector('.gallery-pager');
 const sidebar=document.createElement('details');sidebar.className='catalog-sidebar';sidebar.open=window.innerWidth>900;sidebar.innerHTML='<summary>検索・題材・配色を調整</summary><div class="sidebar-content"></div>';
 const results=document.createElement('div');results.className='catalog-results';
 [...section.children].filter(e=>e.tagName!=='H2'&&e!==gallery&&e!==pager).forEach(e=>sidebar.querySelector('.sidebar-content').append(e));
 window.matchMedia('(max-width:900px)').addEventListener('change',e=>{sidebar.open=!e.matches;});
 results.append(gallery,pager);section.append(sidebar,results);section.classList.add('catalog-workspace');
})();
