







//原生JS版生成验证码
function randomCode(el) {
  //offsetWidth在弹出层失效(vant.js、vue.js、元素自身，谁的原因？)
  var Canvas1 = new GouZaoHanShu(el);
  //构造函数：参数分别为canvas 元素， 绘制区域宽高， 验证字符个数 ,干扰线数量，干扰点数量
  function GouZaoHanShu(el, len, width, height, lines, dots) {
    var a = document.querySelector("#canvas");
    //  console.log(a);
    this.Id = document.querySelector(el);
    this.width = width || this.Id.width;
    this.height = height || this.Id.height;
    this.len = len || Math.floor(this.Id.width / 30);
    this.lines = lines || 6;
    this.dots = dots || 60;
    this.code = '';
  }
  Canvas1.draw = function () {
    var width = Canvas1.width;
    var height = Canvas1.height;
    //开始绘制
    var ctx = Canvas1.Id.getContext('2d');
    //填充背景色
    ctx.fillStyle = Canvas1.makeColor(150, 240);
    ctx.fillRect(0, 0, width, height);

    //填充字符
    var chars = Canvas1.makeCode();
    for (var i = 0; i < Canvas1.len; i++) {
      ctx.save();
      ctx.font = chars[i].fontSize + 'px Simhei';
      ctx.fillStyle = Canvas1.makeColor(80, 120);
      ctx.translate(25 * i + 25, 25);
      ctx.rotate(chars[i].deg * Math.PI / 180);
      ctx.fillText(chars[i].str, -10, 8);
      ctx.restore();
    }
    //生成干扰线
    Canvas1.makeLine(ctx, Canvas1.lines);
    //生成干扰点
    Canvas1.makeDot(ctx, Canvas1.dots);
  };
  Canvas1.makeCode = function () {
    //生成验证码
    var strs = [];
    Canvas1.code = '';
    var pool = "ABCDEFGHIJKLIMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwxyz1234567890";
    for (var i = 0; i < Canvas1.len; i++) {
      var str = pool[Canvas1.makeNum(0, pool.length - 1)];
      Canvas1.code += str;
      var fontSize = Canvas1.makeNum(20, 40);
      var deg = Canvas1.makeNum(-35, 35);
      strs.push({
        str: str,
        fontSize: fontSize,
        deg: deg
      });
    }
    return strs
  };
  Canvas1.makeLine = function (ctx, lines) {
    var makeNum = Canvas1.makeNum;
    var width = Canvas1.width;
    var height = Canvas1.height;
    //添加干扰线
    for (var i = 0; i < lines; i++) {
      ctx.beginPath();
      ctx.moveTo(makeNum(0, width), makeNum(0, height));
      ctx.lineTo(makeNum(0, width), makeNum(0, height));
      ctx.strokeStyle = Canvas1.makeColor(140, 230);
      ctx.closePath();
      ctx.stroke();
    }
  };
  Canvas1.makeDot = function (ctx, dots) {
    var makeNum = Canvas1.makeNum;
    var width = Canvas1.width;
    var height = Canvas1.height;
    //添加干扰点
    for (var i = 0; i < dots; i++) {
      ctx.beginPath();
      ctx.arc(makeNum(0, width), makeNum(0, height), makeNum(1, 2), 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = Canvas1.makeColor(150, 200);
      ctx.fill();
    }
  };
  Canvas1.makeNum = function (min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min - 1)
  };
  Canvas1.makeColor = function (min, max) {
    var makeNum = this.makeNum;
    return 'rgb(' + makeNum(min, max) + ', ' + makeNum(min, max) + ', ' + makeNum(min, max) + ')';
  };
  Canvas1.draw();
  return (Canvas1.code.toLowerCase());
}