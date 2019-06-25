


//跳转功能
// 参数说明: 字符串形式的ID  要跳转到的字符串路径
function hrefGongNeng(strongID,strongMuBiao) {
  let FanHui = document.getElementById(strongID);
  FanHui.addEventListener("touchstart", function () {
    window.location.href = strongMuBiao;
  });
}