/* Shared authoring state. Old saved keys are retained for backwards compatibility. */
const catalogState = {
  preview: {topic:'',bg:'#f5f9fc',ink:'#1e536e',tint:'#d9eaf3',custom:false},
  comparison: new Set(),
  page: 0
};
try {
  const saved=JSON.parse(localStorage.getItem('slide-preview-v1')||'{}');
  if(typeof saved.topic==='string') catalogState.preview.topic=saved.topic;
  for(const k of ['bg','ink','tint']) if(/^#[0-9a-f]{6}$/i.test(saved[k]||'')) catalogState.preview[k]=saved[k];
  catalogState.preview.custom=saved.custom===true;
} catch { /* Corrupt or unavailable browser storage falls back to defaults. */ }
function previewDesign(d){const p=catalogState.preview;return p.custom?{...d,bg:p.bg,ink:p.ink,tint:p.tint}:d;}
function previewTitle(fallback){const t=catalogState.preview.topic.trim();return t?(t.length>22?t.slice(0,22)+'…':t):fallback;}
function savePreview(){try{localStorage.setItem('slide-preview-v1',JSON.stringify(catalogState.preview));return true}catch{return false}}

// Browser storage can be unavailable (private browsing/policy); editing must still work.
function readLocal(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function writeLocal(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}

const registeredDialogs=new WeakSet();
const routeClosedDialogs=new WeakSet();
function openCatalogDialog(dialog){
 history.pushState({catalogDialog:dialog.id},'',location.href);
 if(!registeredDialogs.has(dialog)){
  dialog.addEventListener('close',()=>{if(routeClosedDialogs.has(dialog)){routeClosedDialogs.delete(dialog);return;}if(history.state?.catalogDialog===dialog.id){catalogState.modalReturn=true;history.back();}});
  registeredDialogs.add(dialog);
 }
 dialog.showModal();
}
