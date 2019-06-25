


//生成html标签
// 参数：父元素，总个数，父元素下需要生成的元素1，元素1里需要生成的元素2
function DongTaiShengCheng(fuYuanSu,number,DOM1,DOM2) {
  for (let i = 0;i<number;i++){
    let a = document.createElement(DOM1);
    let b = document.createElement(DOM2);
    a.appendChild(b);
    fuYuanSu.appendChild(a);
  }
}