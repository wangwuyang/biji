






//根据值获取数组下标
// huoQuXiaBiao:(data,datas) => {}
function huoQuXiaBiao(data,datas){
  for (let i = 0; i < datas.length; i++) {
    if ( data === datas[i]) return i;
  }
}


