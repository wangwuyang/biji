//获取用户所在地点部分
function DiDian() {
  var ShengFenText = document.getElementById("ShengFenText");
  var ChengShiText = document.getElementById("ChengShiText");
  var XianShiShengFen = document.getElementById("XianShiShengFen");
  var XianShiChengShi = document.getElementById("XianShiChengShi");
  if(lo && lc){
    //lo和lc为IP库的默认变量，lo代表省份或者直辖市;lc代表城市
    XianShiShengFen.innerHTML = (lo);
    XianShiChengShi.innerHTML = (lc);
  }
  else if(lo==="北京市"||lo==="天津市"||lo==="重庆市"||lo==="上海市"){
    //如果是直辖市
    ShengFenText.innerHTML = ("所在城市");
    ChengShiText.innerHTML = ("所在区");
  }
  else{
    console.log("显示用户所在地部分有问题");
  }
}