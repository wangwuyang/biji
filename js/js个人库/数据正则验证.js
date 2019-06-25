

//验证 是否为空
export const isEmpty = (data) => {if(data===null||data ===""||typeof data==="undefined") {return false;} else {return true;}};

//验证.常规数据
export const isGeneral = (data) => {let reg = /^\w{1,30}$/;return reg.test(data);};

//验证.常规数据 不要任何符号
export const isGeneral_B = (data) => {let reg = /^([0-9]|[a-z]|[A-Z]){6,25}$/;return reg.test(data);};

//验证.数字数据
export const isNumber = (data) => {let reg = /^\d{1,30}$/;return reg.test(data);};

//验证.汉字数据
export const isHanZi = (data) => {let reg = /^[\u4E00-\u9FA5]{1,30}$/;return reg.test(data);};

//手机号验证
export const isPhone = (data) => {let reg = /^1[3|4|5|7|8]\d{9}$/; return reg.test(data);};

//验证码验证
export const isYanZhengMa = (data) => {let reg = /^\d{4,6}$/; return reg.test(data);};

//密码验证
export const isPassWord = (data) => {let reg = /^[\w]{6,20}$/; return reg.test(data);};

//验证 密码对比
export const isPassWordAffirm = (pswd1,pswd2) => {return (pswd1 === pswd2)};

//验证.数字+小数三位检测
export const isNum3 = (data) => {let reg = /^\d+(\.\d+)?$/; return reg.test(data);};


// //车牌验证
// function ChePaiYanZheng(Zhi_DOM,TiShi) {
//   var Zhi = Zhi_DOM.value;
//   var ZhengZe = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
//   if(ZhengZe.test(Zhi)){
//     TiShi.style.display = "none";
//     ChePai_status = true;
//   }
//   else{
//     TiShi.innerHTML = "*请输入正确的格式";
//     TiShi.style.display = "block";
//     ChePai_status = false;
//   }
//   //  return ZhuangTai;
// }
// //载重验证
// function ZaiZhongYanZheng(Zhi_DOM,TiShi) {
//   var Zhi = Zhi_DOM.value;
//   var ZhengZe = /^\d{1,3}\.{0,1}\d{0,2}$/;
//   if(ZhengZe.test(Zhi)){
//     TiShi.style.display = "none";
//     ZaiZhong_status = true;
//   }
//   else{
//     TiShi.innerHTML = "*只可输入数字";
//     TiShi.style.display = "block";
//     ZaiZhong_status = false;
//   }
//   //  return ZhuangTai;
// }
//


//验证.必须有一位字母+数字
// FF.YZ.isVerify_C = function (data) {
//   let reg = /^.*(?=.{6,25})(?=.*\d)(?=.*[a-z]).*$/; //6-25 必须由至少一位的数字、大小写字母组成
//   return reg.test(data);
// };
// //删除首尾空格
// FF.YZ.isTrim = function () {
//   var ID_value = value;
//   var reg = /(^\s*)|(\s*$)/g;
//   if(reg.test(ID_value)){
//     return (ID_value.replace(reg,""));
//   }
//
// };
// //删除空白字符 ////正则匹配——删除任何空白字符，包括空格、制表符、换页符等等
// FF.YZ.isKongBai = function (value) {
//   var ID_value = value;
//   var reg = /\s/g;
//   if(reg.test(ID_value)){
//     return (ID_value.replace(reg,""));
//   }
//   return ID_value
// };
// //删除特殊字符
// FF.YZ.isTeShu1 = function (value) {
//   var ID_value = value;
//   var reg = /[%*^&￥$]/g;
//   if(reg.test(ID_value)){
//     return (ID_value.replace(reg,""));
//   }
//   return ID_value
// };