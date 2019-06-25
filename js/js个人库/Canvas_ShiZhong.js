function CanvasAHS() {


    var ShiJian_YuanQius = [];
    const Qiu_YanSe = ["green","yellow","black","seagreen","#29bde0","#3C78B5","#3A7EC2","#BBB5B5","#d5effc","#f0ad4e"];
    // var Qiu_ShuLiang = null;

    var Canvas_A = document.getElementById("ShiJian_Canvas");

    var HuiHua_width = Canvas_A.offsetWidth;//先给html元素设置值 这里再获取
    var HuiHua_height = Canvas_A.offsetHeight*2;//先给html元素设置值 这里再获取
    var margin_left = Math.floor(Canvas_A.offsetWidth/20);//距屏幕左侧十分之一
    var BanJing = Math.round(Canvas_A.offsetWidth*9/10/130);
    var margin_top = HuiHua_width/10;//距屏幕顶部

    Canvas_A.width = HuiHua_width;
    Canvas_A.height = HuiHua_height;
    if(Canvas_A.getContext("2d")){
        var CanvasA_2d = Canvas_A.getContext("2d");
    }else{alert("当前浏览器不支持此内容正常显示。建议更换浏览器后再试")}

    var ShiJian1 = new Date();
    var ShiJian1_Shi = ShiJian1.getHours();
    var ShiJian1_Fen = ShiJian1.getMinutes();
    var ShiJian1_Miao = ShiJian1.getSeconds();

    setInterval(
        function(){
            HuiZhiHanShu( CanvasA_2d );
            DongHuaHanShu();
        },50
    );

    function HuiZhiHanShu(CanShu1) {
        CanvasA_2d.clearRect(0,0,CanvasA_2d.canvas.width,CanvasA_2d.canvas.height);//刷新canvas画布  节省资源可以用顶部声明的屏幕宽高
        //此处三句话不加会不动 为什么呢？我对全局变量有什么错误的理解？
        //明明全局变量已经获取了 这里没必要再加一次了才对啊
        ShiJian1_Shi = ShiJian1.getHours();
        ShiJian1_Fen = ShiJian1.getMinutes();
        ShiJian1_Miao = ShiJian1.getSeconds();

        //时的十位与个位
        var ShiJian_Shi_ShiWei = Math.floor(ShiJian1_Shi / 10);//十位
        var ShiJian_Shi_GeWei = Math.floor(ShiJian1_Shi % 10);//个位
        //分钟的十位与个位
        var ShiJian_Fen_ShiWei = Math.floor(ShiJian1_Fen / 10);
        var ShiJian_Fen_GeWei = Math.floor(ShiJian1_Fen % 10);
        //秒的十位与个位
        var ShiJian_Miao_ShiWei = Math.floor(ShiJian1_Miao / 10);
        var ShiJian_Miao_GeWei = Math.floor(ShiJian1_Miao % 10);


        DanGeShu(ShiJian_Shi_ShiWei,margin_left,margin_top);
        DanGeShu(ShiJian_Shi_GeWei,  margin_left+Math.ceil(BanJing*20),margin_top);
        DanGeShu(10,                 margin_left+Math.ceil(BanJing*40),margin_top);//冒号位置手动设置下 不然不美观
        DanGeShu(ShiJian_Fen_ShiWei, margin_left+Math.ceil(BanJing*50),margin_top);//与冒号保持距离
        DanGeShu(ShiJian_Fen_GeWei,  margin_left+Math.ceil(BanJing*70),margin_top);
        DanGeShu(10,                 margin_left+Math.ceil(BanJing*90),margin_top);//冒号位置手动设置下 不然不美观
        DanGeShu(ShiJian_Miao_ShiWei,margin_left+Math.ceil(BanJing*100),margin_top);//与冒号保持距离
        DanGeShu(ShiJian_Miao_GeWei, margin_left+Math.ceil(BanJing*120),margin_top);
        ShiJian_YuanQiu_HuiZhi(CanvasA_2d);
    }
    function DanGeShu(ShuZi,CanShu_X,CanShu_Y) {//单个电子数字的绘制，传入代表数字的参数
        for(var i = 0;i<ShiZhong_ShuZu[ShuZi].length;i++){//ShiZhong_ShuZu[][] 三维数组 ShiZhong_ShUZu.js里存放点阵形式的数组 有7*10的和4*10的两种
            for(var n = 0;n<ShiZhong_ShuZu[ShuZi][i].length;n++){
                if(ShiZhong_ShuZu[ShuZi][i][n] === 1){
                    //HuiZhiYuanHS(XZhou,YZhou,BanJing)
                    CanvasA_2d.fillStyle = "blue";
                    CanvasA_2d.beginPath();////开始一段新的路径 不一定要和后面的colsePath()成对使用
                    CanvasA_2d.arc(CanShu_X+n*(BanJing*2+1),CanShu_Y+i*(BanJing*2+1),BanJing,0,2*Math.PI,false);//绘制方式
                    CanvasA_2d.stroke();////加不加有点区别 原因还得仔细想想
                    //CanvasA_2d.closePath();//结束当前路径 并自动为未封闭的加上个线封上
                    CanvasA_2d.fill();//填充首位相连内的颜色，加不加closePath()不影响填充
                }
            }
        }
    }

    function DongHuaHanShu() {
        var ShiJian2 = new Date();
        var ShiJian2_Shi = ShiJian2.getHours();
        var ShiJian2_Fen = ShiJian2.getMinutes();
        var ShiJian2_Miao = ShiJian2.getSeconds();

        //获取新时间的六位数字
        var ShiJian_Shi_ShiWei = parseInt(ShiJian2_Shi / 10);//十位
        var ShiJian_Shi_GeWei = parseInt(ShiJian2_Shi % 10);//个位
        var ShiJian_Fen_ShiWei = parseInt(ShiJian2_Fen / 10);
        var ShiJian_Fen_GeWei = parseInt(ShiJian2_Fen % 10);
        var ShiJian_Miao_ShiWei = parseInt(ShiJian2_Miao / 10);
        var ShiJian_Miao_GeWei = Math.floor(ShiJian2_Miao % 10);

        //获取旧时间的六位数字
        var ShiJian_Shi_ShiWei_Jiu = parseInt(ShiJian1_Shi / 10);
        var ShiJian_Shi_GeWei_Jiu = parseInt(ShiJian1_Shi % 10);
        var ShiJian_Fen_ShiWei_Jiu = parseInt(ShiJian1_Fen / 10);
        var ShiJian_Fen_GeWei_Jiu = parseInt(ShiJian1_Fen % 10);
        var ShiJian_Miao_ShiWei_Jiu = parseInt(ShiJian1_Miao / 10);
        var ShiJian_Miao_GeWei_Jiu = parseInt(ShiJian1_Miao % 10);


        //做个对比  旧时间是否等于新时间
        if(ShiJian1 !==ShiJian2){
            if(ShiJian_Shi_ShiWei_Jiu !== ShiJian_Shi_ShiWei){
                ShiJian_YuanQiu_ShuJu(ShiJian_Shi_ShiWei,margin_left,margin_top);//然后圆球动画执行
            }
            if(ShiJian_Shi_GeWei_Jiu !== ShiJian_Shi_GeWei){
                ShiJian_YuanQiu_ShuJu(ShiJian_Shi_GeWei,margin_left+BanJing*20,margin_top);
            }
            if(ShiJian_Fen_ShiWei_Jiu !== ShiJian_Fen_ShiWei){
                ShiJian_YuanQiu_ShuJu(ShiJian_Fen_ShiWei,margin_left+BanJing*50,margin_top);
            }
            if(ShiJian_Fen_GeWei_Jiu !== ShiJian_Fen_GeWei){
                ShiJian_YuanQiu_ShuJu(ShiJian_Fen_GeWei,margin_left+BanJing*70,margin_top);
            }
            if(ShiJian_Miao_ShiWei_Jiu !== ShiJian_Miao_ShiWei){
                ShiJian_YuanQiu_ShuJu(ShiJian_Miao_ShiWei,margin_left+BanJing*100,margin_top);
            }
            if(ShiJian_Miao_GeWei_Jiu !== ShiJian_Miao_GeWei){
                ShiJian_YuanQiu_ShuJu(ShiJian_Miao_GeWei,margin_left+BanJing*120,margin_top);
            }
            ShiJian1 = ShiJian2;//旧时间的值等于新时间的 绘制函数里就是新的了
        }
        ShiJian_YuanQiu_DongHua();
        console.log(ShiJian_YuanQius.length);
    }

    //时间_圆球_数据部分——生成圆球所需要的数据
    function ShiJian_YuanQiu_ShuJu(CanShu1,X,Y) {
        for(var i = 0;i<ShiZhong_ShuZu[CanShu1].length;i++){//ShiZhong_ShuZu[][] 三维数组 ShiZhong_ShUZu.js里存放点阵形式的数组 有7*10的和4*10的两种
            for(var n = 0;n<ShiZhong_ShuZu[CanShu1][i].length;n++){
                if(ShiZhong_ShuZu[CanShu1][i][n] === 1){
                    var AAA = {
                        x:X+n*(BanJing*2),
                        y:Y+i*(BanJing*2),
                        ZhongLi:2,
                        xYunDong:Math.ceil(7.5 - Math.random()*15),//正负5以内的随机整数 *10为0—1的整数 再被5减 就是-5到+5的整数
                        yYunDong:-5,
                        YanSe:Qiu_YanSe[Math.floor( Math.random()*Qiu_YanSe.length)]
                    };
                    ShiJian_YuanQius.push(AAA);//将括号里的对象添加到ShiJian_YuanQius数组里
                }
            }
        }
    }

    function ShiJian_YuanQiu_DongHua() {
        for(var i = 0;i<ShiJian_YuanQius.length;i++){
            ShiJian_YuanQius[i].x += ShiJian_YuanQius[i].xYunDong;
            ShiJian_YuanQius[i].y += ShiJian_YuanQius[i].yYunDong;
            ShiJian_YuanQius[i].yYunDong += ShiJian_YuanQius[i].ZhongLi;

            //墙壁检测
            //墙壁右侧
            if(ShiJian_YuanQius[i].x >=CanvasA_2d.canvas.width - BanJing){
                ShiJian_YuanQius[i].xYunDong = -ShiJian_YuanQius[i].xYunDong;
            }
            //墙壁下侧
            if(ShiJian_YuanQius[i].y >= CanvasA_2d.canvas.height - BanJing){
                ShiJian_YuanQius[i].y -= ShiJian_YuanQius[i].yYunDong;
                ShiJian_YuanQius[i].yYunDong = Math.ceil(-ShiJian_YuanQius[i].yYunDong*0.7);
                ShiJian_YuanQius[i].xYunDong -= 1;
            }
        }

        //数量统计以及删除屏幕外的球
        var Qiu_ShuLiang = 0;
        //console.log(Qiu_ShuLiang);
        for(var n =0;n<ShiJian_YuanQius.length;n++){
            //如果小球圆心X位置 + 半径 > 0 且 小球圆心X位置 + 半径 < 绘画部分的宽度  后半段判断有墙壁检测 其实没必要加
            if(ShiJian_YuanQius[n].x + BanJing > 0 && ShiJian_YuanQius[n].x - BanJing < HuiHua_width){
                ShiJian_YuanQius[Qiu_ShuLiang++] = ShiJian_YuanQius[n];
                //Qiu_ShuLiang++;
            }
        }

        while(ShiJian_YuanQius.length > Math.min(1000,Qiu_ShuLiang)){
            ShiJian_YuanQius.pop();
        }

    }
    function ShiJian_YuanQiu_HuiZhi(CanShu1) {
        //  CanvasA_2d.clearRect(0,0,CanvasA_2d.canvas.width,CanvasA_2d.canvas.height);
        for( var i=0;i<ShiJian_YuanQius.length;i++){
            CanShu1.fillStyle=ShiJian_YuanQius[i].YanSe;
            CanShu1.beginPath();//开始一段新的路径 不一定要和后面的colsePath()成对使用
            CanShu1.arc( ShiJian_YuanQius[i].x , ShiJian_YuanQius[i].y ,BanJing,0, 2*Math.PI,true);//绘制圆
            CanShu1.closePath();//结束当前路径 并自动为未封闭的加上个线封上
            CanShu1.stroke();//加不加有点区别 原因还得仔细想想  //有了边框
            CanShu1.fill();//填充首位相连内的颜色，加不加closePath()不影响填充
        }
    }

}