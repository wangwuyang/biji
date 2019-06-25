
function loadXMLDoc(LuJing) {
    var xmlhttp = null;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var a  = xmlhttp.responseText;
            var b = a.split("--");
            document.getElementById("NR_ZongJie").innerHTML=b[0];
            document.getElementById("NR_ZhengWen").innerHTML=b[1];
        }
    };
    xmlhttp.open("GET",LuJing,true);
    xmlhttp.send();
}
//获取导航栏的每个li
var DaoHang_ul = document.getElementsByClassName("DaoHang")[0];
var DaoHang_lis = DaoHang_ul.getElementsByTagName("li");

//ajax操作
var HTML_DH = document.getElementById("HTML_DH");
var HTML_LuJing = "../html相关.html";
//
HTML_DH.onclick = function () {
    loadXMLDoc(HTML_LuJing);
    DH_YangShi(HTML_DH);
};
var CSS_DH = document.getElementById("CSS_DH");
var CSS_LuJing = "../css相关.html";
CSS_DH.onclick = function () {
    loadXMLDoc(CSS_LuJing);
    DH_YangShi(CSS_DH);
};
var JS_DH = document.getElementById("JS_DH");
var JS_LuJing = "../JS相关.html";
JS_DH.onclick = function () {
    loadXMLDoc(JS_LuJing);
    DH_YangShi(JS_DH);
};
var VUEJS_DH = document.getElementById("VUEJS_DH");
var VUEJS_LuJing = "../wenjian/vuejs1.html";
VUEJS_DH.onclick = function () {
    loadXMLDoc(VUEJS_LuJing);
    DH_YangShi(VUEJS_DH);
};

function DH_YangShi(CanShu1) {
    var i = 0;
    for(i;i<DaoHang_lis.length;i++){
        DaoHang_lis[i].className = "";
        CanShu1.className = "XuanZhong";
    }
}
HTML_DH.className = "XuanZhong";