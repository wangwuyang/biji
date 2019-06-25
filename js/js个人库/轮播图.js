function  LunBoTu(GeShu,SJJG){

  /*使用须知： 1、建议直接复制附带的html部分 回头可以出个跟vue似的，不考虑渐进增强和平稳退化，直接用JS生成所有的封装版*/
  /*参数说明： GeShu:轮播图需要轮播的图片个数；   SJJG 时间间隔：多少毫秒轮播一次 */
  var LunBoTu = document.getElementById("LunBoTu"),                         //..获取轮播图部分的ID
      HuaBu = document.getElementById("HuaBu"),                              //.获取轮播图画布的ID
      FX_Zuo = document.getElementById("FX_Zuo"),                            //.获取左边的按钮
      FX_You = document.getElementById("FX_You"),                            //..获取右边的按钮
      YuanDian = document.getElementById("YuanDian"),                        //..获取底部圆点部分的ID
      YuanDian_strongs = YuanDian.getElementsByClassName("YuanDian_strong"), //..获取底部圆点里的strong们
      YuanDian_spans = YuanDian.getElementsByClassName("YuanDian_span"),     //..获取底部圆点里的span们
      MuQianWeiZhi = 0,                                                        //.创建一个变量，用来表示现在图片在画布中的位置
      KuanDu = -(LunBoTu.offsetWidth),                                        //js获取轮播图可视区域的宽度 由于画布基于left为负设置 所以再给个负值
      ZDLB = 0,                                                       //..自动轮播的全局变量
      LBChangTiao_DHZT = false;                                                   //..用来表示圆点部分动画的状态码 false为没有运行

  //检查变量是否存在
  //function 检查变量(参数1，参数2){}

  LunBoTu.style.height = Math.ceil(LunBoTu.offsetWidth/16*6*0.1)+"rem";//根据屏幕大小获取宽度 然后在根据宽度给高度 强制16:9比例



  /*移动处理函数*/
  function LBT_YiDong(YDDW){
    //参数1：移动单位——每张图片的大小为一个移动单位 正负值代表方向
    var Left_QiDian = parseInt(HuaBu.style.left);//left现在所在的地方
    var ZhongDian = YDDW * KuanDu;     //left要移动到的最终目标(第 * 张乘以每张的宽度)
    var sum = 0;          //存储运算值
    HuaBu.DongHua = setInterval(function(){//存到方法里也能运行？？？
      if(Left_QiDian === ZhongDian){
        clearInterval(HuaBu.DongHua);//如果到达目的地，关闭动画
      }
      if (ZhongDian > Left_QiDian) {   //从右边往左边 比如：Left_QiDian=-3000 ZhongDian=-2000 则 终点left 大于起点left
        sum = Math.ceil((ZhongDian - Left_QiDian) /15);// -2000 - -3000 = 1000
        Left_QiDian += sum;
      }
      if (Left_QiDian > ZhongDian) {   //从左边往右边
        sum = Math.floor((ZhongDian - Left_QiDian) / 15); //-3000 - -2000 =-1000
        Left_QiDian += sum;
      }
      HuaBu.style.left = Left_QiDian + "px";
    },10);
  }


  /*点击左、右按钮后*/
  FX_You.onclick = function(){
    clearInterval(HuaBu.DongHua);
    if (MuQianWeiZhi === GeShu -1){ //如果画布目前在最后一张的位置
      MuQianWeiZhi = 0;           //将位置改为在第一张
      console.log("已回到第一张")
    }
    else{
      MuQianWeiZhi += 1;      //否则就将位置+1;
    }
    LBT_YiDong(MuQianWeiZhi);//调用轮播图_移动函数，传入刚才得到的位置
  };
  FX_Zuo.onclick = function(){
    clearInterval(HuaBu.DongHua);
    if(MuQianWeiZhi === 0){
      MuQianWeiZhi = GeShu - 1;
    }
    else {
      MuQianWeiZhi -= 1;
    }
    LBT_YiDong(MuQianWeiZhi);
  };

  //轮播图底部的长条部分(剩余时间)
  function LunBoDiBu_DongHua(CanShu1) {
    LBChangTiao_DHZT = true;
    var i , i_length = YuanDian_spans.length;//把i的长度弄到循环外部只计算一次
    for (i = 0;i<i_length;i++){
      YuanDian_spans[i].style.left = "-100%";
      /*1、一直以来，受限于懒得去考虑如何获取css外部样式表里的style样式，只能用笨方法在html内嵌（还是内联来着）css样式，刚才突然想到了暂时的替代方式，
      css里写定一下以防用户禁用JS导致样式出乱  JS再赋值一下以隐式的方法添加到html内嵌样式里，优点是html看着整洁了，缺点是，要是别人可能还得找半天到
      底是哪儿控制着left值呢 2、样式重置*/
      //    YuanDian_spans[i].LeftZhi = YuanDian_spans[i].style.left;   /*循环里把left值多次分别赋给属性显得啰嗦，在循环外部设置YuanDian_spans[0].LeftZhi = YuanDian_spans[0].style.left只需要赋值一次，就能得到通用的数值，但是这样似乎偏离了...冥冥中感觉不太好，所以还是在循环内搞吧，只重视效率的情况下再考虑这个方式*/
    }
    var aa = 0 ,bb = parseInt(YuanDian_spans[CanShu1].style.left),cc = bb*0.002;// 0.2%
    var DiBu_DongHua_A = (SJJG)/500;
    var DiBu_DongHua1 = setInterval(function () {
      //    console.log("a");
      if(bb >= aa){//大于等于终点
        clearInterval(DiBu_DongHua1);
        LBChangTiao_DHZT = false;
        console.log(LBChangTiao_DHZT+"3");
        if(LBChangTiao_DHZT === false){
          console.log(LBChangTiao_DHZT+"2");
          FX_You.onclick();
        }
        //YuanDian_spans[CanShu1].style.left = "\"" + a + "\"";
      }
      else{
        bb -= cc;
        YuanDian_spans[CanShu1].style.left = bb +"%";
      }
    },DiBu_DongHua_A);// 10ms 0.2% -- 100ms 2% -- 5000ms 100%
  }

  //(圆点的方案现在已经弃用了 改用了用长条来提示剩余时间的方法 可变量名称还有些是YuanDian)

  /*自动轮播以及停止轮播部分*/
  function ZiDongLunBoBF() {
    //定义自动轮播函数
    function ZiDongLunBoHS(){
      ZDLB = setInterval(function(){
        LunBoDiBu_DongHua(MuQianWeiZhi);
      },SJJG+500);//底部长条计时以SJJG时间为总时间，所以这里延迟一下，避免那边动画还没完，这边又开始了的情况
    }
    //定义停止轮播函数
    function TingZhiLunBoHS(){
      clearInterval(ZDLB);
    }
    LunBoTu.onmouseover = TingZhiLunBoHS;//鼠标移入LunBoTu范围
    LunBoTu.onmouseout = ZiDongLunBoHS;  //鼠标移出LunBoTu范围

    ZiDongLunBoHS();        //开始自动播放
  }
  ZiDongLunBoBF();
}
window.onload = function () {
  LunBoTu(5,3000);//调用函数，同时传入参数:（一共几张图片）（时隔多少毫秒运动一次）
};