

let wz = {};




//样式重置函数
wz.yangShiChongZhi = function (YuanSu){
  for(let i =0;i<YuanSu.length;i++){
    YuanSu[i].className = "";
  }
};

//获取元素的纵坐标
wz.huoQuHeight = function(e){
  let offset=e.offsetTop;
  if(e.offsetParent!==null){offset+=getTop(e.offsetParent);}
  return offset;
};

//获取元素的横坐标
wz.huoQuLeft = function(e){
  let offset=e.offsetLeft;
  if(e.offsetParent!==null) {offset+=getLeft(e.offsetParent);}
  return offset;
};

//创建一个可以在某元素后面添加元素的函数//两个参数 前面的是新元素，后面的是插到哪个元素后面
wz.addDOM_Hou = function(xinDOM,muBiaoDOM){
  let a = muBiaoDOM.parentNode;                    //创建a存储目标元素的父元素
  if(a.lastChild === muBiaoDOM){
    a.appendChild(xinDOM);
  }
  else{
    a.insertBefore(xinDOM,muBiaoDOM.nextSibling);
  }
};