



//获取ID或者class
function huoQu(name) {
  const a = name.charAt(0);//获取字符串的第一个内容
  const b = name.slice(1); //获取字符串的第一个内容 之外的内容;
  if(a === "#"){return document.getElementById(b);}
  if(a ==="."){return document.getElementsByClassName(b);}
  else{console.log("获取"+name+"的"+"ID或class失败，请检查是否存在")}
}