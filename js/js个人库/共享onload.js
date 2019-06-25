


//addLoadEvent(gongxiangonload)函数——共享onload
function gongXiangOnload(func){
  let laoHanShu=window.onload;
  if(typeof window.onload !='function'){
    window.onload = func;
  }
  else{
    window.onload = function(){
      laoHanShu();
      func();
    }
  }
}