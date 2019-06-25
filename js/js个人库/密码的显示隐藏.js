




//密码input的显示和隐藏
//参数说明：按键的字符串ID  需要隐藏密码的input的字符串ID

function miMaYinCang(anJianID,inputID){
  let anJian = document.getElementById(anJianID),
    input = document.getElementById(inputID);
  anJian.addEventListener("touchstart",function () {
    input.type = "text";}
    );
  anJian.addEventListener("touchend",function () {
    input.type = "password";}
    );
}