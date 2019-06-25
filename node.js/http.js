var fs = require("fs");
var data = fs.readFileSync('index2.html');
console.log(data.toString());
console.log("程序执行结束!");