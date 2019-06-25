




//ShengChengBiaoQian 动态生成标签  父元素、标签名、文本内容、添加class还是ID、class名或者id名



//QingChuBF 内容的清除与按钮的显示
//验证数据相关
//手机号验证
//验证码验证
//密码验证
//密码对比验证
//错误提示函数 参数：提示的ID（可优化为动态生成DOM）  提示的内容值
//创建一个可以在某元素后面添加元素的函数insertAfter
//addLoadEvent(gongxiangonload)函数——共享onload
//共享onscroll函数
//原生ajax //Ajax未封装函数
//获取元素相对于浏览器的的纵横坐标
//获取元素的纵坐标
//获取元素的横坐标
//目标移动函数
//返回功能 参数说明:要跳转到的目标






//内容的清除与按钮的显示
function QingChuBF(Values,QingChus){
    for(var i = 0;i<Values.length;i++){
        //另辟蹊径 方便在匿名函数里使用i
        Values[i].ShuXingA = i;QingChus[i].ShuXingA = i;
        Values[i].addEventListener("touchstart",function () {
            if(this.value!== ""){
                QingChus[this.ShuXingA].style.display = "inline-block";
            }
            else{
                QingChus[this.ShuXingA].style.display = "none";
            }
        });
        QingChus[i].addEventListener("touchstart",function () {
            Values[this.ShuXingA].value = "";
        });
    }
}



//动态生成错误提示（待检验）
function CuoWuTiShi(FuYuanSu,ID,Class,TiShi_txt) {
    if(document.getElementById(ID)){
        console.log(document.getElementById(ID));
        return;
    }
    var a1 = document.createElement("p");
    //生成ID
    var a22 = document.createAttribute("id");
    a22.nodeValue = ID;//添加一个ID名称
    a1.setAttributeNode(a22);//添加到想要加到的节点上
    //生成class
    var a21 = document.createAttribute("class");
    a21.nodeValue = Class;//添加一个class名称
    a1.setAttributeNode(a21);//添加到想要加到的节点上

    var b1 = document.createTextNode(TiShi_txt);
    a1.appendChild(b1);
    FuYuanSu.appendChild(a1);
}


//原生ajax
function FaSongShuJu(){
    var LuJing = "php.php";//路径
    var FaSongShuJu = ZhangHao.value;
    console.log("打算发送的数据:" + ZhangHao.value);
    //var ShuJu = JSON.stringify(CheZhu);//json将数组变为字符串
    //       console.log("js对象" + CheZhu);
    //      console.log("json字符串：" + ShuJu);
    Ajax("post",LuJing,FaSongShuJu);
}
//Ajax未封装函数
function Ajax(FangShi,PHPLuJing,NeiRong) {
    var Ajax_A = null;
    if(window.XMLHttpRequest){Ajax_A = new XMLHttpRequest;}//兼容
    else {Ajax_A = new ActiveXObject("Microsoft.XMLHTTP");}
    Ajax_A.onreadystatechange = function () {
        if (Ajax_A.readyState === 4 && Ajax_A.status === 200) {
            var BL2 = Ajax_A.responseText;
            if(BL2){
                console.log("返回的未处理内容："+BL2);
                var Ajax_Fanhui = eval("("+BL2+")");
                console.log("eval处理过的内容："+Ajax_Fanhui);
            }
        }
    };//异步可以放前面 同步要放后面
    Ajax_A.open(FangShi,PHPLuJing,true);
    if(FangShi = "get"){
        Ajax_A.send(NeiRong);
    }
    else if(FangShi = "post"){
        Ajax_A.setRequestHeader("Content-type","application/json");
        Ajax_A.send(NeiRong);
    }
}





//共享onscroll函数
/* function gongxiangonscroll(func){
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
 } */

//获取元素相对于浏览器的的纵横坐标
 //获取元素的纵坐标
 function huoQuHeight(e){
 var offset=e.offsetTop;
 if(e.offsetParent!=null){
 offset+=getTop(e.offsetParent);
 }
 return offset;
 }
 //获取元素的横坐标
 function huoQuLeft(e){
 var offset=e.offsetLeft;
 if(e.offsetParent!=null) {
 offset+=getLeft(e.offsetParent);
 }
 return offset;
 }
//目标移动函数
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


/*DongTaiShengCheng();动态生成两层元素的函数
huoQuHeight();获取元素的纵坐标——等待完善
huoQuLeft();获取元素的横坐标——等待完善
获取数组里的元素的下标
*/



//构造对象函数
/*
function DuiXiangGouJian(MingZi,NianLing){
    this.XingMing=MingZi;
    this.NianLing=NianLing;
    this.XiuGaiXingMing= XiuGaiXingMing_HS;
    this.XiuGaiNianLing= XiuGaiNianLing_HS;

    function XiuGaiXingMing_HS(Zhi){this.XingMing = Zhi;}
    function XiuGaiNianLing_HS(Zhi){this.NianLing = Zhi;}
}
DuiXiang1 =new DuiXiangGouJian("Steve",24);
DuiXiang1.XiuGaiXingMing("dsadsa");
console.log(DuiXiang1.XingMing);
*/


//动态生成元素——父元素是div的话  那就是 <div><元素1><元素2></元素2></元素1></div>
//参数：父元素，总个数，父元素下需要生成的元素1，元素1里需要生成的元素2
function DongTaiShengCheng(FuYuanSu,ZongGeShu,ShengChengYuanSu1,ShengChengYuanSu2) {
    for (var i = 0;i<ZongGeShu;i++){
        var ShengCheng_YuanSu1 = document.createElement(ShengChengYuanSu1);
        var ShengCheng_YuanSu2 = document.createElement(ShengChengYuanSu2);
        ShengCheng_YuanSu1.appendChild(ShengCheng_YuanSu2);
        FuYuanSu.appendChild(ShengCheng_YuanSu1);
    }
}

//动态生成元素2  比上一个多了个元素2里的内容
// //——父元素是div的话  那就是 <div><元素1><元素2>内容</元素2></元素1></div>
//参数：父元素，总个数，父元素下需要生成的元素1，元素1里需要生成的元素2
function ShengCheng(FuYuanSu,ZongGeShu,ShengChengYuanSu1,ShengChengYuanSu2,ShengChengYuanSu2txt) {
    for (var i = 0;i<ZongGeShu;i++){
        var YuanSu1 = document.createElement(ShengChengYuanSu1);
        var YuanSu2 = document.createElement(ShengChengYuanSu2);
        var YuanSu2_txt = document.createTextNode(ShengChengYuanSu2txt);
        YuanSu2.appendChild(YuanSu2_txt);
        YuanSu1.appendChild(YuanSu2);
        FuYuanSu.appendChild(YuanSu1);
    }
}

//动态生成标签  父元素、标签名、文本内容、添加class还是ID、class名或者id名
function ShengChengBiaoQian(FuYuanSu,BiaoQian,NeiRong,Class_or_ID,Class_or_ID_Ming) {
    var YuanSu1 = document.createElement(BiaoQian);
    var YuanSu1_text = document.createTextNode(NeiRong);//<p class = "XianLus_NR"><span><strong>JS数据</strong></span></p>
    YuanSu1.appendChild(YuanSu1_text);
    FuYuanSu.appendChild(YuanSu1);
    if(Class_or_ID && Class_or_ID_Ming){
        if(Class_or_ID === "class"){
            var YuanSu1_Class_or_ID = document.createAttribute("class");//添加一个class
            YuanSu1_Class_or_ID.nodeValue = Class_or_ID_Ming;//添加一个class名称
        }
        else if(Class_or_ID === "id"){
            var YuanSu1_Class_or_ID = document.createAttribute("id");//添加一个id
            YuanSu1_Class_or_ID.nodeValue = Class_or_ID_Ming;//添加一个id名称
        }
        YuanSu1.setAttributeNode(YuanSu1_Class_or_ID);//添加到想要加到的节点上
    }
}

