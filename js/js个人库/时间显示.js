//时间显示
function ShiJianXS() {
  var ShiJianXS_A = document.getElementById("ShiJianXS_A");
  var ShiJianXS_B = document.getElementById("ShiJianXS_B");
  var ShiJianXS_C = document.getElementById("ShiJianXS_C");

  function MiaoBiao() {
    var ShijianBL_A = new Date();
    ShijianBL_A.NianFen = ShijianBL_A.getFullYear();
    ShijianBL_A.Yue =ShijianBL_A.getMonth() + 1;
    ShijianBL_A.Ri =ShijianBL_A.getDate();
    ShijianBL_A.XingQi_ShuZhi =ShijianBL_A.getDay();
    ShijianBL_A.XingQi = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    ShijianBL_A.XiaoShi = ShijianBL_A.getHours();
    ShijianBL_A.FenZhong = ShijianBL_A.getMinutes();
    ShijianBL_A.Miao = ShijianBL_A.getSeconds();

    //美观化
    ShijianBL_A.FenZhong = MeiGuan(ShijianBL_A.FenZhong);
    ShijianBL_A.Miao = MeiGuan(ShijianBL_A.Miao);
    ShiJianXS_A.innerHTML = ShijianBL_A.NianFen+"年"+ ShijianBL_A.Yue+"月"+ShijianBL_A.Ri+"日";
    ShiJianXS_B.innerHTML = ShijianBL_A.XingQi[ShijianBL_A.XingQi_ShuZhi];
    // ShiJianXS_C.innerHTML = ShijianBL_A.XiaoShi +":" + ShijianBL_A.FenZhong +":"+ ShijianBL_A.Miao;

    function MeiGuan(CanShu1) {
      if (CanShu1<10){
        CanShu1 = "0"+CanShu1;
      }
      return CanShu1;
    }
    setTimeout(function () {
      MiaoBiao();
    }, 1000);
  }
  MiaoBiao();
}