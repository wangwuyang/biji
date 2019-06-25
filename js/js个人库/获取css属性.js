



//获取css属性
//参数1：需要获取的元素 参数2：需要获取的css属性
function HuoQuCSSShuXing(DOM,ShuXing) {
  if(window.getComputedStyle){
    return(window.getComputedStyle(DOM, null)[ShuXing]);
  }
  else{return(DOM.currentStyle[ShuXing]);}
}