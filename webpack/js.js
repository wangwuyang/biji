var vue1 = new Vue({
  el:"#Fu",
  data:{
    LieBiao:{
      A:[
        {
          Zhu:{
            BiaoTi:"1、安装node.js和npm",
            NR:["官网上下载node.js安装包：http://nodejs.cn/，下载完后傻瓜式安装即可，(买一送一（褒义的），npm也会捆绑安装上)"]
          },
          Cong:[
            {
              BiaoTi:"检查方式",
              NR:"win+R 调出运行窗口，输入cmd,打开cmd小黑窗，然后输入node -v以及npm -v来分别检查安装情况与版本信息"
            },
            {
              BiaoTi:"错误反馈链接:",
              NR:"如果这一步就出错，那我太好奇为毛了 可以把问题填写到这个页面里提交发给我--（回头写个提交页面把链接放到这）"
            }
          ]
        }
      ],
      B:{

      }
    }
  }
});

//获取ID或者class 第一个参数接受两个值“.”代表class “#”代表id；第二个参数为名称
function HuoQu(ID_or_CLASS,name) {
  if(ID_or_CLASS ==="#"){
    return document.getElementById(name);
  }
  if(ID_or_CLASS ==="."){
    return document.getElementsByClassName(name);
  }
}

function DongTaiShengCheng(DuiXiang){
  // let YiJi_length = Object.getOwnPropertyNames(DuiXiang.YiJi).length;
  //创建一级内容区——div div里包含标题与内容
  let YiJi = document.createElement("div");
  //一级的标题部分
  let YiJi_BiaoTi = document.createElement("h2");
  let YiJi_BiaoTi_txt = document.createTextNode(DuiXiang.BiaoTi);
  YiJi_BiaoTi.appendChild(YiJi_BiaoTi_txt);
  YiJi.appendChild(YiJi_BiaoTi);
  //二级内容区
  let ErJi = document.createElement("ul");
  YiJi.appendChild(ErJi);
  //三级内容区(li)
  //将三级内容下的属性们在循环外单独列一个数组
  /*let SanJi_ShuXings = [];
  for (let i in DuiXiang.NR) {
      if (DuiXiang.NR.hasOwnProperty(i)) {
      SanJi_ShuXings.push(i);
      }
  }*/
  //三级里的内容们分别赋值
  for(let i = 0;i<DuiXiang.NR.length;i++){
    let SanJi = document.createElement("li");
    ErJi.appendChild(SanJi);
    let SanJi_A = document.createElement("strong");
    let SanJi_A_text =  document.createTextNode(DuiXiang.NR[i][0]);
    SanJi_A.appendChild(SanJi_A_text);
    SanJi.appendChild(SanJi_A);

    for(let i2 =1;i2<DuiXiang.NR[i].length;i2++){
      let SanJi_B = document.createElement("span");
      let SanJi_B_text =  document.createTextNode(DuiXiang.NR[i][i2]);
      SanJi_B.appendChild(SanJi_B_text);
      SanJi.appendChild(SanJi_B);
    }
  }
  let FuYuanSu = HuoQu("#","ZhuTi_1");
  FuYuanSu.appendChild(YiJi);
}