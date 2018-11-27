const fuckZoneJsKey = 'FUCK_ZONE_JS_GLOBAL';
const fuckZoneJsMap = Object.create(null);

window[fuckZoneJsKey] = function(id, e){
  fuckZoneJsMap[id](e);
}
window[fuckZoneJsKey]._check = function(){
  return Object.keys(fuckZoneJsMap).length
} 
let fuckZoneJsIndex = 0;

function fuckZoneJsBind(dom, eventName, callback: Function){
  fuckZoneJsIndex = fuckZoneJsIndex + 1;
  let _index = fuckZoneJsIndex;
  fuckZoneJsMap[_index] = callback;
  const onKey = `on${eventName}`;
  if(dom.hasAttribute(onKey)) {
    throw new Error('fuckZoneBind: Already Have Attribute ' + onKey);
  }
  dom.setAttribute(onKey, `${fuckZoneJsKey}(${_index}, event)`);
  
  return function fuckZoneJsUnBind(){
    dom.removeAttribute(onKey);
    fuckZoneJsMap[_index] = null;
    delete(fuckZoneJsMap[_index]);
    //console.error('fuckZoneJsMap', fuckZoneJsMap)
  };
}

function mixin(key, th, key2){
  let bak;
  if(th[key]){
    bak = th[key];
  }
  th[key] = function(){
    if(bak){
      bak.apply(th, arguments);
    }
    th[key2].apply(th, arguments);
  }
}

function _unBind(id, localMap){
  localMap[id]();
  delete(localMap[id]);
}

export class FuckZoneClass {
  constructor(){
    mixin('ngOnDestroy', this, 'fuckZoneUnBindAll');
  }
  fuckZoneMap = Object.create(null);
  fuckZoneBind(...args){
    let unBind = fuckZoneJsBind.apply(null, args);
    this.fuckZoneMap[fuckZoneJsIndex] = unBind;
    return fuckZoneJsIndex;
  }
  fuckZoneUnBind(id){
    _unBind(id, this.fuckZoneMap);
  }
  fuckZoneUnBindAll(){
    for(var i in this.fuckZoneMap){
      this.fuckZoneUnBind(i);
    }
  }
  ngOnDestroy(){ // Fuck , 不能动态设置

  }
}

//window.__zone_symbol__BLACK_LISTED_EVENTS 线上环境无效。
