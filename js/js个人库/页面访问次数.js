


//页面访问次数部分
function FangWenCiShu() {
  var FaSongNeiRong = "http://wangwuyang.cn/wenjian/ChuLi.php" + "?CanShu1=" + "1";//只能通过wangwuyang.cn增加访问
  // var FaSongNeiRong2 = "http://wangwuyang2016.com/wenjian/ChuLi_ShiYan.php" + "?CanShu1=" + "1";//本地访问量

  Ajax("GET",FaSongNeiRong);//GET方式发送 字符串1;
  //  Ajax("GET",FaSongNeiRong2);//GET方式发送 字符串1;
}

//ajax函数
function Ajax(FangShi,PHPLuJing) {
  var BL1 = null;
  if(window.XMLHttpRequest){BL1 = new XMLHttpRequest;}//兼容
  else {BL1 = new ActiveXObject("Microsoft.XMLHTTP");}

  BL1.onreadystatechange = function () {
    if (BL1.readyState == 4 && BL1.status == 200) {
      //  alert("连接成功"+"\n"+"PHP取得值为"+ BL1.responseText);
      document.getElementById("FangWenCiShu").innerHTML = BL1.responseText;
    }
  };//异步可以放前面 同步要放后面

  BL1.open(FangShi,PHPLuJing,true);
  //BL1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  BL1.send();
}