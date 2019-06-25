
//目录：

//ajax预加载
//获取ID或者class
//获取css的属性值
//返回功能 参数说明:要跳转到的目标
//动态生成标签
//根据值获取下标
//弹出版提示
//套壳优化
//运算先快后慢的动画
//目标移动函数
//共享onload
//共享onscroll函数
//创建一个可以在某元素后面添加元素的函数insertAfter
//获取元素的纵坐标
//获取元素的横坐标
//车牌验证
//载重验证
//样式重置函数
////获取验证码本地存储倒计时效果



//ajax预加载
window.onload = function() {
  setTimeout(function() {
    // XHR to request a JS and a CSS
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://domain.tld/preload.js');
    xhr.send('');
    xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://domain.tld/preload.css');
    xhr.send('');
    // preload image
    new Image().src = "http://domain.tld/preload.png";
  }, 1000);
};

//获取ID或者class 参数接受一个字符串值，首字母第一个如果是“.”则代表获取class 如果首字母是“#”则代表id；与jquery类似
function HuoQu(name) {
  var a = name.charAt(0);//获取字符串的第一个内容
  var b = name.slice(1); //获取字符串的第一个内容 之外的内容;
  if(a === "#"){return document.getElementById(b);}
  if(a ==="."){return document.getElementsByClassName(b);}
  else{console.log("获取ID或class失败，请检查是否存在")}
}

//获取css的属性值
function HuoQuCSSShuXing(YuanSu,ShuXing) {//参数1：需要获取的元素 参数2：需要获取的css属性
    if(window.getComputedStyle){
        return(window.getComputedStyle(YuanSu, null)[ShuXing]);
    }
    else{
        return(YuanSu.currentStyle[ShuXing]);
    }
}
//返回功能 参数说明:要跳转到的目标
function FanHuiGongNeng(YuanSu,MuBiao) {
    var FanHui = document.getElementById(YuanSu);
    FanHui.addEventListener("touchstart", function () {
        window.location.href = MuBiao;
    });
}
//动态生成标签;参数说明:FuYuanSu 生成的内容放哪个元素下边  ShuZuNR:数组的内容; LinShiID 可能删除 所以创建个小头领 让小头领待着一堆内容去投奔父元素
function DongTaiBiaoQian(FuYuanSu,ShuZuNR,LinShiID) {
    var DiDian_ul_Id_huoQu = document.getElementById(LinShiID);
    if(DiDian_ul_Id_huoQu){
        //啥都不干： !DiDian_ul_Id_huoQu 的方式 似乎听过有点兼容性问题 暂时不用
    }
    //如果不存在 则创建
    else{
        var YuanSu1 = document.createElement("ul");
        var LinShi_ID = document.createAttribute("id");//添加一个id
        LinShi_ID.nodeValue = LinShiID;//添加一个id名称
        YuanSu1.setAttributeNode(LinShi_ID);//添加到想要加到的节点上
        if(ShuZuNR && ShuZuNR.length >=0){
            for (var i = 0;i<ShuZuNR.length;i++){//循环生成li
                var YuanSu2 = document.createElement("li");
                var YuanSu2_txt = document.createTextNode(ShuZuNR[i]);
                YuanSu2.appendChild(YuanSu2_txt);
                YuanSu1.appendChild(YuanSu2);
            }
            FuYuanSu.appendChild(YuanSu1);
        }
    }
}
//根据值获取下标
function HuoQuXiaBiao(ShuZu,Zhi){
    for (var i = 0; i < ShuZu.length; i++) {
        if (ShuZu[i] === Zhi)
            return i;
    }
}
//弹出版提示
function TanChu(strong) {

}
//套壳优化
if(navigator.userAgent.indexOf("Html5Plus") > -1) {
    document.body.classList.add("html5plus");
}
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

//目标移动函数
/*
 function mubiaoyidonghanshu(ID,mubiaox,mubiaoy,jiangeshijian){           //函数通用化   输入ID 目标x 目标y 间隔时间 移动目标到目的地
 if(!document.getElementById){return false;} //平稳退化
 if(!document.getElementById(ID)){return false;}//检查存不存在这个ID 不存在则退出
 var a = document.getElementById(ID);
 var x = parseInt(a.style.left);
 var y = parseInt(a.style.top);
 var dist = 0;
 if (a.shuxing){            //如果存在a.shuxing，则清除队列中的其它命令
 clearTimeout(a.shuxing);
 }
 if (x == mubiaox && y == mubiaoy){return true;}     //如果到达目标地点则返回true  结束循环
 if(x<mubiaox){
 dist = Math.ceil((mubiaox - x)/10);                   //每次移动大减小再除以10的距离 且每次最小也会移动1
 x = x + dist;
 }
 if(x>mubiaox){
 dist = Math.ceil((x - mubiaox)/10);
 x = x - dist;
 }
 if(y <mubiaoy){
 dist = Math.ceil((mubiaoy - y)/10);
 y = y + dist;
 }
 if(y>mubiaoy){
 dist = Math.ceil((y - mubiaoy)/10);
 y = y - dist;
 }
 a.style.left = x+"px";
 a.style.top = y+"px";
 var taichang = "mubiaoyidonghanshu('"+ID+"',"+mubiaox+","+mubiaoy+","+jiangeshijian+")";        //双加号是什么意思？？
 a.shuxing = setTimeout(taichang,jiangeshijian);    //
 }
 */

//addLoadEvent(gongxiangonload)函数——共享onload
function gongxiangonload(func){
    var laohanshu=window.onload;
    if(typeof window.onload !='function'){
        window.onload = func;
    }
    else{
        window.onload = function(){
            laohanshu();
            func();
        }
    }
}
//共享onscroll函数
function gongxiangonscroll(func){
    var laohanshu=window.onscroll;
    if(typeof window.onscroll !='function'){
        window.onscroll = func;
    }
    else{
        window.onscroll = function(){
            laohanshu();
            func();
        }
    }
}
//创建一个可以在某元素后面添加元素的函数insertAfter
 function insertAfter(xinyuansu,mubiaoyuansu){      //两个参数 一个前面的是新元素，后面的是目标元素
     var a = mubiaoyuansu.parentNode;                    //创建a存储目标元素的父元素
     if(a.lastChild == mubiaoyuansu){
        a.appendChild(xinyuansu);
     }
     else{
        a.insertBefore(xinyuansu,mubiaoyuansu.nextSibling);
     }
 }



