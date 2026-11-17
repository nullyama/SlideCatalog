const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function sample(d){
d=previewDesign(d);
const t=(x,y,s,size=20,color=d.ink,weight=500)=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}">${esc(s)}</text>`;
const box=(x,y,w,h,s='',color=d.tint)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${color}"/>${s?t(x+14,y+h/2+7,s,19):''}`;
const line=(x,y,x2,y2)=>`<path d="M${x} ${y} L${x2} ${y2}" stroke="${d.ink}" stroke-width="3" fill="none"/>`;
const circle=(x,y,r,s)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${d.tint}"/>${t(x-r+12,y+7,s,19)}`;
let body='',headline=previewTitle(d.name);
switch(d.kind){
case 'title': body=t(36,150,'安全な情報共有',40)+t(36,200,'まずは、基本の3つから。',23)+box(36,260,220,40,'60分 / 入門研修');break;
case 'statement': body=t(36,153,'共有する前に、',33)+t(36,205,'宛先と権限を確かめる。',33)+line(36,235,604,235)+t(36,280,'今日持ち帰る、ひとつの原則。');break;
case 'question':body=t(44,150,'そのリンク、',38)+t(44,205,'誰まで開けますか？',38)+t(44,270,'まず30秒、隣の人と考えてみよう。',22);break;
case 'three':body=['分類できる','設定できる','説明できる'].map((x,i)=>box(32+i*204,120,188,150)+t(48+i*204,158,'0'+(i+1),30)+t(48+i*204,224,x,21)).join('');break;
case 'timeline':body=line(60,184,574,184)+['知る','試す','振り返る'].map((x,i)=>circle(80+i*240,184,30,String(i+1))+t(48+i*240,250,x,19)).join('');break;
case 'flow':body=['情報','共有先','権限'].map((x,i)=>box(30+i*210,150,170,95,x)+(i<2?t(204+i*210,209,'→',24):'')).join('');break;
case 'layers':body=['利用者：誰が使うか','共有方法：どう渡すか','基盤：どこに保存するか'].map((x,i)=>box(65,104+i*70,510,55,x)).join('');break;
case 'hub':body=circle(320,200,65,'共有')+box(35,100,150,55,'情報')+box(455,100,150,55,'人')+box(245,290,150,45,'権限')+line(185,140,255,175)+line(385,175,455,140)+line(320,265,320,290);break;
case 'process':body=box(28,125,165,150,'入力資料')+box(238,125,165,150,'確認する')+box(448,125,165,150,'安全に共有')+t(202,208,'→')+t(412,208,'→');break;
case 'network':body=circle(320,200,45,'担当')+[ [110,120,'上司'],[520,120,'相手'],[110,280,'同僚'],[520,280,'管理者']].map(([x,y,s])=>line(320,200,x,y)+circle(x,y,45,s)).join('');break;
case 'compare':body=box(32,105,276,205)+box(332,105,276,205)+t(52,145,'全員に公開',27)+t(352,145,'対象者だけ',27)+t(52,208,'速い／広く届く')+t(352,208,'管理／範囲を限定')+t(52,270,'公開資料向け')+t(352,270,'内部資料向け');break;
case 'matrix':body=line(320,95,320,310)+line(70,200,570,200)+t(90,130,'公開・低リスク')+t(350,130,'公開・高リスク')+t(90,260,'限定・低リスク')+t(350,260,'限定・高リスク');break;
case 'pros':body=t(40,130,'＋ 便利になること',26)+t(345,130,'! 注意すること',26)+box(35,165,270,130,'すぐに共同編集')+box(335,165,270,130,'公開範囲を確認');break;
case 'before':body=box(32,115,240,180,'メール添付')+t(295,215,'→',36)+box(370,115,240,180,'権限付きリンク')+t(40,320,'変更前')+t(380,320,'変更後');break;
case 'choices':body=['A / 閲覧だけ','B / 編集可能','C / 期限付き'].map((x,i)=>box(40,100+i*75,560,60,x)).join('');break;
case 'steps':body=['宛先を選ぶ','権限を設定','送信前に確認'].map((x,i)=>t(40,130+i*80,String(i+1),38)+box(100,95+i*80,500,60,x)).join('');break;
case 'screen':body=box(35,100,370,220)+box(50,120,335,30,'共有設定',d.bg)+box(60,180,200,40,'対象者を指定',d.bg)+line(260,200,455,200)+t(440,165,'ここを確認',22)+t(440,240,'全員公開に')+t(440,270,'なっていない？');break;
case 'check':body=['□ 宛先が正しい','□ 必要な権限だけ','□ 期限を設定した'].map((x,i)=>box(60,100+i*70,520,55,x)).join('');break;
case 'branch':body=box(220,95,200,50,'公開してよい？')+line(320,145,150,210)+line(320,145,490,210)+box(50,220,220,70,'はい：公開')+box(370,220,220,70,'いいえ：限定');break;
case 'log':body=line(120,100,120,310)+['09:00 作成','09:10 確認','09:20 共有'].map((x,i)=>circle(120,120+i*85,12,'')+t(160,128+i*85,x,25)).join('');break;
case 'metric':body=t(45,217,'3',115)+t(160,200,'つの確認',35)+t(45,285,'宛先・権限・情報の種類',25);break;
case 'bars':body=[110,180,250].map((v,i)=>box(80+i*150,320-v,90,v,'')+t(80+i*150,345,['導入前','試行','定着'][i],18)).join('')+t(420,115,'改善を見える化',24);break;
case 'line':body=line(60,300,580,300)+line(60,100,60,300)+`<path d="M60 270 L170 230 L280 245 L390 170 L500 125 L580 90" fill="none" stroke="${d.ink}" stroke-width="7"/>`+t(70,340,'4月 → 5月 → 6月 → 7月 → 8月',20);break;
case 'donut':body=`<circle cx="210" cy="210" r="88" fill="none" stroke="${d.tint}" stroke-width="38"/><circle cx="210" cy="210" r="88" fill="none" stroke="${d.ink}" stroke-width="38" stroke-dasharray="350 560"/>`+t(158,220,'64%',42)+t(350,175,'確認できた',26)+t(350,230,'残りの課題は？',22);break;
case 'dashboard':body=box(32,100,175,95,'80%')+box(230,100,175,95,'24件')+box(430,100,175,95,'3分')+box(32,220,573,90,'率・件数・時間を並べる');break;
case 'hero':body=t(40,150,'便利さの隣に、',34)+t(40,205,'小さな落とし穴。',34)+line(40,250,600,250)+t(40,300,'ある日の情報共有を振り返る');break;
case 'case':body=box(35,110,190,200,'CASE 01')+t(260,145,'急いでいた担当者',28)+t(260,205,'締切まであと5分。')+t(260,250,'何を確認すべき？');break;
case 'problem':body=t(40,125,'困りごと',22)+box(35,150,250,130,'版が分からない')+t(300,225,'→',30)+t(365,125,'解決の方針',22)+box(360,150,250,130,'正本を1つに');break;
case 'mistake':body=t(40,135,'「いつもの宛先」のつもりが…',26)+box(40,175,560,65,'思い込みが確認を飛ばした')+t(40,290,'再発防止：送信前に一呼吸',23);break;
case 'dialogue':body=box(35,100,430,75,'「このリンク、開けないよ」')+box(175,220,430,75,'「権限の範囲を見てみよう」');break;
case 'quiz':body=t(40,125,'どちらの設定が適切？',30)+box(40,175,270,105,'A：全員')+box(335,175,270,105,'B：対象者のみ')+t(40,325,'理由も一言で説明しよう。',20);break;
case 'individual':body=t(40,130,'自分の業務に置き換える',28)+box(40,165,390,135,'気づいたことを書こう')+circle(535,232,60,'3分');break;
case 'pair':body=circle(175,185,60,'自分')+circle(465,185,60,'相手')+line(240,185,400,185)+t(90,295,'説明する → 聞く → 役割交代',25);break;
case 'group':body=['司会','記録','発表','時間'].map((x,i)=>box(35+i*150,130,135,95,x)).join('')+t(45,290,'全員の意見を1つの提案にまとめる',25);break;
case 'judge':body=box(35,100,570,80,'社外の相手に内部資料を送る')+['OK','要確認','NG'].map((x,i)=>box(35+i*195,220,180,85,x)).join('');break;
case 'rule':body=box(35,105,570,85,'原則：必要な人だけ')+box(35,220,570,85,'例外：承認された公開資料');break;
case 'pillars':body=['限定','記録','期限'].map((x,i)=>box(45+i*195,115,160,205)+t(80+i*195,225,x,32)).join('');break;
case 'alternative':body=box(35,110,570,70,'× 個人用サービスへ保存')+box(35,225,570,70,'○ 組織が認めた場所へ保存');break;
case 'risk':body=[['公開',80],['内部',135],['機密',200]].map(([x,h],i)=>box(45+i*195,320-h,170,h,x)).join('');break;
case 'roles':body=['作成｜担当者','確認｜上司','承認｜責任者'].map((x,i)=>box(45,100+i*75,550,60,x)).join('');break;
case 'code':body=box(35,100,570,210)+t(55,145,'share({',25)+t(90,195,'scope: "team",',25)+t(90,240,'permission: "read"',25)+t(55,285,'})',25);break;
case 'architecture':body=box(35,115,170,70,'利用者')+box(240,115,170,70,'認証')+box(445,115,170,70,'資料')+line(205,150,240,150)+line(410,150,445,150)+box(240,250,170,65,'監査ログ')+line(325,185,325,250);break;
case 'demo':body=box(35,100,365,220,'実際の画面')+t(430,140,'観察ポイント',22)+t(430,200,'① 公開範囲')+t(430,245,'② 権限')+t(430,290,'③ 期限');break;
case 'api':body=t(60,110,'クライアント')+t(430,110,'サーバー')+line(130,130,130,320)+line(505,130,505,320)+line(130,180,505,180)+t(245,165,'要求 →')+line(505,260,130,260)+t(245,245,'← 応答');break;
case 'trouble':body=t(40,125,'開けないとき、どこを見る？',28)+['通信','認証','権限'].map((x,i)=>box(35+i*195,185,180,90,x)).join('');break;
case 'summary':body=['宛先を見る','権限を見る','情報を分ける'].map((x,i)=>t(45,145+i*75,'0'+(i+1),32)+t(125,145+i*75,x,28)).join('');break;
case 'reflect':body=['分かった','まだ不安','試したい'].map((x,i)=>box(35+i*195,110,180,200,x)).join('');break;
case 'action':body=t(40,145,'明日、ひとつ変える。',34)+box(40,190,560,65,'共有設定を送信前に見直す')+t(40,310,'いつ？ どの業務で？ 誰と？',23);break;
case 'qa':body=box(35,110,270,185,'今、確認したい')+box(335,110,270,185,'持ち帰って調べる');break;
case 'takeaway':body=t(40,130,'□ 共有前の3点確認',25)+t(40,195,'□ 困ったときの相談先',25)+t(40,260,'□ 自分の次の行動',25)+line(35,300,600,300);break;
}
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${esc(d.name)}の独自サンプル"><rect width="640" height="360" fill="${d.bg}"/><g font-family="Arial, Noto Sans JP, sans-serif">${t(30,40,d.id+' / '+d.purpose,14)}${t(30,77,headline,23)}${body}</g></svg>`;
}
const savedFavorites=readLocal('slide-favorites',[]);let favorites=Array.isArray(savedFavorites)?savedFavorites.filter(id=>designs.some(d=>d.id===id)):[];let favOnly=false;
function designSpec(name){const d=previewDesign(designs.find(x=>x.name===name)||designs[0]);return `見本ID：${d.id}\n用途：${d.purpose}\n見本セット：表紙1枚＋本編3枚。配色を共通化して異なる役割に展開する。見本セットのページ番号に合わせて、次の役割を引き継ぐ。${deckSamples(d).map((p,i)=>`\n  ${i}：${p.role}`).join('')}\n配色：背景 ${d.bg}、文字・強調 ${d.ink}、補助面 ${d.tint}\nレイアウト：${d.layout}\nタイポグラフィ：日本語ゴシック（游ゴシック/Noto Sans JP等）、16:9、見出し32〜40pt、本文22〜28pt。1枚1論点。余白を確保。\n見本再現：見本セットの配色と配置を基準にし、内容は研修テーマに置換する。文字・図形は可能な限りネイティブPPTX要素にし、全画面を画像1枚にしない。\n${describeDesignLayout(d)}\nプレビュー題材：${catalogState.preview.topic||'未指定'}。見本本文は架空例であり、そのまま研修の事実として使わない。`}
function updateSelectedDesign(){const name=document.querySelector('[name=style]:checked')?.value||designs[0].name;const d=designs.find(x=>x.name===name)||designs[0];document.getElementById('selected-design').textContent=`選択中：${d.id} ${d.name} / ${d.purpose}。絞り込みで非表示になっても選択は保持します。`;document.querySelectorAll('.design-card').forEach(c=>c.classList.toggle('is-selected',c.dataset.name===d.name));}
function filterDesigns(resetPage=true){const q=document.getElementById('design-search').value.trim().toLowerCase();const purpose=document.getElementById('purpose').value;const tags=[...document.querySelectorAll('[name=tag]:checked')].map(e=>e.value);let n=0;document.querySelectorAll('.design-card').forEach((e,i)=>{const d=designs[i],yes=(purpose==='all'||d.purpose===purpose)&&tags.every(t=>d.tags.includes(t))&&(!q||JSON.stringify(d).toLowerCase().includes(q))&&(!favOnly||favorites.includes(d.id));e.dataset.matched=yes?'yes':'no';e.hidden=!yes;if(yes)n++});document.getElementById('design-count').textContent=`${n} / 50件を表示`;document.getElementById('no-designs').hidden=n>0;if(resetPage!==false)catalogState.page=0;paginateDesigns();}
function initGallery(){
 document.getElementById('purpose').innerHTML+=[...new Set(designs.map(d=>d.purpose))].map(p=>`<option>${p}</option>`).join('');
 document.getElementById('tags').innerHTML=[...new Set(designs.flatMap(d=>d.tags))].map(t=>`<label class="tag"><input type="checkbox" name="tag" value="${t}"> ${t}</label>`).join('');
 document.getElementById('styles').innerHTML=designs.map((d,i)=>`<article class="design-card" data-name="${d.name}"><button class="sample-open" data-id="${d.id}" aria-label="${d.id} ${d.name}の見本を拡大">${sample(d)}<span class="sample-count">表紙＋本編3枚を見る ↗</span></button><label class="stylelabel"><input type="radio" name="style" value="${d.name}" ${i===0?'checked':''}> <b>${d.id} ${d.name}</b></label><p>${d.purpose}</p><p class="metadata">${d.tags.map(t=>'#'+t).join(' ')}</p><div class="actions"><button class="button button-secondary favorite" data-id="${d.id}" aria-pressed="${favorites.includes(d.id)}">${favorites.includes(d.id)?'★':'☆'} お気に入り</button></div></article>`).join('');
 const dialog=document.createElement('dialog');dialog.id='sample-dialog';dialog.setAttribute('aria-label','見本の拡大と採用');dialog.innerHTML='<button id="close-sample" class="button button-secondary">閉じる</button><button id="adopt-sample" class="button">この見本を採用</button><div id="sample-large"></div><p id="sample-spec"></p>';document.body.append(dialog);
 document.querySelectorAll('.sample-open').forEach(b=>b.onclick=()=>{const d=designs.find(x=>x.id===b.dataset.id);openSampleSet(d)});document.getElementById('close-sample').onclick=()=>dialog.close();
 document.querySelectorAll('.favorite').forEach(b=>b.onclick=()=>{const id=b.dataset.id;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];try{localStorage.setItem('slide-favorites',JSON.stringify(favorites))}catch{}b.setAttribute('aria-pressed',String(favorites.includes(id)));b.textContent=(favorites.includes(id)?'★':'☆')+' お気に入り';filterDesigns()});
 ['purpose','design-search'].forEach(id=>document.getElementById(id).addEventListener('input',filterDesigns));document.querySelectorAll('[name=tag]').forEach(e=>e.addEventListener('change',filterDesigns));
 document.getElementById('clear-filters').onclick=()=>{document.getElementById('purpose').value='all';document.getElementById('design-search').value='';document.querySelectorAll('[name=tag]').forEach(e=>e.checked=false);favOnly=false;document.getElementById('only-favorites').textContent='お気に入りだけ表示';filterDesigns()};
 document.getElementById('only-favorites').onclick=()=>{favOnly=!favOnly;document.getElementById('only-favorites').textContent=favOnly?'すべての候補へ戻す':'お気に入りだけ表示';filterDesigns()};
 document.getElementById('recommend').onclick=()=>{const q=document.getElementById('recommend-text').value;const rules=[[/新人|初めて|入門|基礎|初心者/,'導入・目的','初学者向けの入口をつくる'],[/図解|構造|仕組み|関係/,'仕組み・図解','関係と全体像を見せる'],[/比較|判断|選ぶ|選択|違い/,'比較・判断','選択肢と判断軸を並べる'],[/手順|操作|使い方|申請/,'手順・操作','順序と確認点を示す'],[/数値|データ|分析|統計|グラフ/,'データ・分析','数値の意味を伝える'],[/事例|ストーリー|物語|失敗/,'事例・ストーリー','具体的な場面から考える'],[/演習|クイズ|参加|討議|ワーク/,'演習・参加','聞くだけでなく参加して学ぶ'],[/セキュリティ|ルール|制度|規則|リスク/,'制度・ルール','原則と判断の境界を示す'],[/実演|コード|API|技術|デモ/,'技術・実演','動きと観察点を示す'],[/まとめ|行動|振り返り|要点/,'まとめ・行動','次の行動に結びつける']];const hits=rules.filter(r=>r[0].test(q));const target=document.getElementById('recommend-result');target.replaceChildren();if(!hits.length){target.textContent='一致する目的を見つけられませんでした。「比較」「操作」「クイズ」などを加えるか、下の目的・タグから選んでください。';return;}hits.slice(0,4).forEach((r,i)=>{const d=designs.find(x=>x.purpose===r[1]);const p=document.createElement('p');p.textContent=`${i+1}. ${r[1]}：${r[2]}（候補 ${d.id} ${d.name}）`;const b=document.createElement('button');b.className='button button-secondary';b.textContent=d.id+'を選ぶ';b.onclick=()=>{document.querySelectorAll('[name=style]').forEach(e=>e.checked=e.value===d.name);document.getElementById('purpose').value=r[1];document.getElementById('design-search').value='';document.querySelectorAll('[name=tag]').forEach(e=>e.checked=false);favOnly=false;document.getElementById('only-favorites').textContent='お気に入りだけ表示';filterDesigns();generate();};p.append(' ',b);target.append(p)});};
 filterDesigns();updateSelectedDesign();
}

function coverSample(d){d=previewDesign(d);const subject=catalogState.preview.topic.trim();const i=Number(d.id.slice(1))-1;const right=i%2===0;const x=right?44:240;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${esc(d.name)}の表紙"><rect width="640" height="360" fill="${d.bg}"/><rect x="${right?470:0}" width="170" height="360" fill="${d.tint}"/><g fill="${d.ink}" font-family="Arial,Noto Sans JP,sans-serif"><text x="${x}" y="74" font-size="14">職員向け入門研修 / 60分</text><text x="${x}" y="154" font-size="32" font-weight="600">${subject?'研修テーマ':'安全な'}</text><text x="${x}" y="200" font-size="32" font-weight="600">${subject?esc(subject.length>10?subject.slice(0,10)+'…':subject):'情報共有'}</text><text x="${x}" y="260" font-size="17">宛先と権限を、送信前に確認する。</text><text x="${x}" y="322" font-size="12">${d.id} ${esc(d.name)}</text></g></svg>`;}
function deckSamples(d){const i=Number(d.id.slice(1))-1;const group=Math.floor(i/5);const supports=[['flow','compare'],['compare','check'],['process','judge'],['compare','check'],['flow','action'],['process','reflect'],['flow','check'],['compare','judge'],['process','trouble'],['compare','action']][group];return [{label:'表紙',svg:coverSample(d),role:'研修テーマと到達点を提示。片側に余白を残した表紙'}, {label:'本編1 / 主役のレイアウト',svg:sample(d),role:d.layout},{label:'本編2 / '+supports[0],svg:sample({...d,kind:supports[0],name:'共有の仕組みと選び方'}),role:supports[0]+'：仕組み・選択肢を図解する'},{label:'本編3 / '+supports[1],svg:sample({...d,kind:supports[1],name:'実務で確かめるポイント'}),role:supports[1]+'：演習・確認・次の行動へつなげる'}];}
function openSampleSet(d){document.getElementById('adopt-sample').onclick=()=>{document.querySelectorAll('[name=style]').forEach(e=>e.checked=e.value===d.name);generate();document.getElementById('sample-dialog').close();};document.getElementById('sample-large').innerHTML='<p class="sample-help">見本を選ぶと、配色・配置・各ページの役割が制作指示書に入ります。④ AIへ渡すからコピーして使えます。</p>'+deckSamples(d).map((p,i)=>`<section class="deck-page"><h3>${i===0?'表紙':'本編 '+i}</h3>${p.svg}<p>${esc(p.role)}</p></section>`).join('');document.getElementById('sample-spec').textContent=designSpec(d.name);openCatalogDialog(document.getElementById('sample-dialog'));}


function paginateDesigns(){if(!document.getElementById('page-status'))return;const size=window.innerWidth<=680?6:12;const cards=[...document.querySelectorAll('.design-card')];const found=cards.filter(e=>e.dataset.matched==='yes');const pages=Math.max(1,Math.ceil(found.length/size));catalogState.page=Math.max(0,Math.min(catalogState.page,pages-1));cards.forEach(e=>e.hidden=true);found.slice(catalogState.page*size,(catalogState.page+1)*size).forEach(e=>e.hidden=false);document.querySelector('.gallery-pager').hidden=found.length===0;document.getElementById('design-count').textContent=found.length?`${found.length}件が該当・${catalogState.page*size+1}〜${Math.min((catalogState.page+1)*size,found.length)}件を表示`:'0件が該当';document.getElementById('page-status').textContent=`${catalogState.page+1} / ${pages}ページ · ${found.length}候補`;document.getElementById('page-prev').disabled=catalogState.page===0;document.getElementById('page-next').disabled=catalogState.page>=pages-1;}

function describeDesignLayout(d){
 const svg=new DOMParser().parseFromString(sample(d),'image/svg+xml');
 const placements=[...svg.querySelectorAll('rect,text')].slice(1,16).map(el=>el.tagName==='rect'?`矩形 x=${el.getAttribute('x')||0}, y=${el.getAttribute('y')||0}, 幅=${el.getAttribute('width')}, 高さ=${el.getAttribute('height')}`:`文字基準 x=${el.getAttribute('x')}, y=${el.getAttribute('y')}, サイズ=${el.getAttribute('font-size')}`);
 return '配置の具体仕様（基準キャンバス640×360、数値は相対拡大して使用）：\n'+placements.join('\n');
}
