//运算先快后慢的动画
var SuanFa1_DongHua1 = null;
function SuanFa1(QiShiCS,MuBiaoCS,YiDongID) {
  var a = parseInt(QiShiCS);
  var b = parseInt(MuBiaoCS);
  var c = null;
  SuanFa1_DongHua1 = setInterval(function () {
    if(a ===b ){        //如果到达目标 则停止动画
      clearInterval(SuanFa1_DongHua1);
    }
    if(a<b){//如果a的值小于b的值 //          例：-120<0
      c = Math.ceil((b-a)/15);//把数进行上舍入  例：（0--120）/10 = 12
      a = a+c;//增加a的值                     例：-120 +12 = -108
    }
    if(a>b){//如果a的值大于b的值 //          如：0>-120
      c = Math.floor((b-a)/15);//把数进行上舍入  如：(-120 -0 =-120)/10 = -12
      a = a+c;//减小a的值                   如：0-12 = -12
    }
    YiDongID.style.left = a+"px";
  },10);
}