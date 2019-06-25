<!--<html>
<head>
    <meta charset="UTF-8">
</head>
<body>

<p>dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
</body>
</html>-->



<?php

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Cache-Control: no-cache");
header("Pragma: no-cache");
//用户可能会设置一些选项来更改浏览器的默认缓存设置。通过发送上面的报头，您可以覆盖任何这些设置，强制浏览器不进行缓存！

header("Access-Control-Allow-Origin:http://wangwuyang.cn");
//星号表示所有的域都可以接受
//header("Access-Control-Allow-Methods:GET,POST");
 //允许跨域

$SCNR = $_GET["CanShu1"];//获取需要更改的内容
//处理送过来的数据

//setcookie('cookie','啊啊啊');

$a = (integer)$SCNR;//数字化传来的数据
$b = (integer)file_get_contents("CiShu.txt");//数字化文件内容
$JieGuo = $a + $b;

$WenJian1 = fopen("CiShu.txt","w");//or die("打开失败");//修改文件内容 末尾追加模式 
fwrite($WenJian1,$JieGuo);
fclose($WenJian1);//关闭文件

echo $JieGuo;//输出显示内容
?>