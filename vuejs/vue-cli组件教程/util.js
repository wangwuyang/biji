export const pushHistory = () => {
    let state = {
      title: '',
      url: ''
    }
    window.history.pushState(state, state.title, state.url)
  }

//去除所有空字符串
export const removeAllSpace = (str) => {

  return str.replace(/\s+/g, "");
}
  //验证.账号
  export const isLoginName = (data) => {
    var reg = /^([a-z]|[A-Z])\w{2,19}$/; //大小写字母开头,后面跟\w 共计3-20位的长度
    return reg.test(data);
  };
  //验证.密码
 export const isPassWord = (data) => {
  var reg = /^([0-9]|[a-z]|[A-Z]){6,25}$/; //6-25位的数字||大小写||字母组成
  return reg.test(data);
};
/** 

//验证.手机号
FF.YZ.isPhone = function (data) {
  var reg = /^1[3|4|5|7|8][0-9]\d{8}$/; //头三位特殊检验，后面跟八位任意数字（并非最严谨的那种）
  return reg.test(data);
};

//验证.密码(必须有一位字母+数字版)
FF.YZ.isPassWordB = function (data) {
  //var reg = /^([0-9]|[a-z]|[A-Z]){6,25}$/; //6-25位的数字||大小写||字母组成
  var reg = /^.*(?=.{6,25})(?=.*\d)(?=.*[a-z]).*$/; //6-25 必须由至少一位的数字、大小写字母组成
  return reg.test(data);
};

*/


//验证.常规数据
export const isGeneral = (data) => {let reg = /^\w{1,30}$/;return reg.test(data);};
//验证.数字数据
export const isNumber = (data) => {let reg = /^\d{1,30}$/;return reg.test(data);};
//验证.汉字数据
//export const isHanZi = (data) => {let reg = /^[\u4E00-\u9FA5]{1,30}$/;return reg.test(data);};

//验证.是否为空
export const isEmpty = (data) => {
  if (data === null || typeof data === "undefined" || data === "") {return false;}
  else {return true;}
};
