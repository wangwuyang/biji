//钟表走动
function ZhongBiaoZouDong() {
  var ShiZhen = document.getElementById("ShiZhen"),
      FenZhen = document.getElementById("FenZhen"),
      MiaoZhen = document.getElementById("MiaoZhen");
  var ShiJian = new Date();
  console.log("时间："+ShiJian);
  ShiJian.Shi = ShiJian.getHours();
  ShiJian.Fen = ShiJian.getMinutes();
  ShiJian.Miao = ShiJian.getSeconds();

  //    console.log(window.getComputedStyle(ShiZhen));//查看所有属性
  //  console.log(HuoQuCSSShuXing(ShiZhen,"transform"));//查看单一属性
  //  console.log(ShiZhen.style.webkitTransform);
  //   console.log(ShiZhen.style.webkitTransform);
  //   console.log(ShiZhen.style.MozTransform);
  //   console.log(ShiZhen.style.msTransform);
  //   console.log(ShiZhen.style.OTransform);
  //  console.log(ShiZhen.style.transform);

// 270deg等同于630deg的位置  630deg是转了一圈后的位置


  function YunDong() {
    //设置时钟的初始位置
    var ChuShi = 270;
    var MeiDu = 6;//  360/60 = 6
    //var FenMeiDu = 0.1;   //6/60 =
    var YunDong = {};
    YunDong.Miao = ShiJian.Miao * 6 + ChuShi;//秒的deg度数
    YunDong.Fen =  (ShiJian.Fen *6 + ChuShi)  + (YunDong.Miao - ChuShi)/360 * 6;//目前分钟的 deg度数 + 秒已经走过的一分钟的百分比
    YunDong.Shi =  (ShiJian.Shi * 30 + ChuShi)  + (YunDong.Fen - ChuShi)/360 * 30;//24小时 会转两圈 也就是 到达630+360 = 990deg

    //每秒移动多少deg
    YunDong.Miao_S = 6;
    YunDong.Fen_S  = 6/60;
    YunDong.Shi_S = 6/3600;

    MiaoZhen.style.transform = "rotate("+YunDong.Miao+"deg)";
    FenZhen.style.transform = "rotate("+YunDong.Fen+"deg)";
    ShiZhen.style.transform = "rotate("+YunDong.Shi+"deg)";

    setInterval(function () {
      //秒的运动轨迹
      if(YunDong.Miao === 630){YunDong.Miao = 270;}
      YunDong.Miao += 6;
      MiaoZhen.style.transform = "rotate("+YunDong.Miao+"deg)";

      //分的运动轨迹
      if(YunDong.Fen === 630){YunDong.Fen = 270;}//防止数无限往上加 那样 不雅观
      //  if(YunDong.Fen > 630){YunDong.Fen = 270;}//防误差 怎么搞下误差呢
      YunDong.Fen += 0.1;
      FenZhen.style.transform = "rotate("+YunDong.Fen+"deg)";

      //时的运动轨迹
      if(YunDong.Shi > 990){YunDong.Shi = 270;}//防止数无限往上加 那样 不雅观
      //     if(YunDong.Shi > 990){YunDong.Shi = 270;}//防误差 怎么搞下误差呢
      YunDong.Shi += (30/3600);
      ShiZhen.style.transform = "rotate("+YunDong.Shi+"deg)";
    },1000);
  }
  YunDong();

}