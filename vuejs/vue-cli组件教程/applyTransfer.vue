
<template>
  <div class="Fu">

    <basic-header :leftArrow=true  title="填写转库信息" rightText='提交' @clickEvent="goPageTo()" ></basic-header>

      <div>
          <van-button type="info" size="small" @click="goPageTo(0)">入库</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
          <van-button type="warning" size="small" @click="goPageTo(1)">转序</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
      </div>
    <article class="inputs">
      <!--<van-cell-group><van-field v-model="inputData.encoding" label="编码" placeholder="请输入编码" error-message="" /></van-cell-group>-->
        <van-cell-group>
            <router-link :to="{path:'/workordernum',query:{num:'/applyTransfer'}}">
                <van-field center v-model="inputData.workcode" label="工单编号" placeholder="请输入工单编号" right-icon="arrow" :error-message="hint.workcode" disabled @click = "workcodeFn()" />
            </router-link>
        </van-cell-group>
        <van-row><van-field-select-picker label="产品名称" placeholder="请选择产品名称" v-model="inputData.productName" :error-message="hint.productName" :columns= columns_productName @input= "clickinput_productName"/></van-row>
        <van-row><van-field-select-picker label="原工序" placeholder="请选择原工序" v-model="inputData.sprocessName" :error-message="hint.sprocessName" :columns= columnsData2 @input= "clickinput2"/></van-row>
        <van-cell-group><van-field v-model="inputData.machineNumber" label="机台号" placeholder="请输入机台号" :error-message="hint.machineNumber" /></van-cell-group>
      <!--<van-row><van-field-select-picker label="目标工序" placeholder="请选择目标工序" v-model="inputData.tprocessName" :columns= columnsData3 @input= "clickinput3"/></van-row>-->
      <!--<van-cell-group><van-field v-model="inputData.reelNumber" label="卷号" placeholder="请输入卷号" error-message="" /></van-cell-group>-->

      <div class="addNR" v-for="(v,index) in inputData.turnOrderbs">
          <h4>第 {{index + 1}} 个子信息</h4>
          <van-cell-group @click = "turnOrderbs_NameFn(1,index)"><van-field v-model="v.produceName" label="投入物料名称" placeholder="请输入投入物料名称" :error-message="hint.turnOrderbs[index].produceName" disabled /></van-cell-group>
          <van-cell-group><van-field v-model="v.iNum" label="投入物料数量" placeholder="请输入投入物料数量" :error-message="hint.turnOrderbs[index].iNum" /></van-cell-group>
          <van-cell-group @click="unitsPickerFn('putInto',index)"><van-field v-model="v.iUnitName" label="投入物料单位" disabled  right-icon="arrow-down" :error-message="hint.turnOrderbs[index].iUnitName" /></van-cell-group>
          <van-cell-group @click = "turnOrderbs_NameFn(2,index)"><van-field v-model="v.investmentName" label="产出物料名称" placeholder="请输入产出物料名称"  :error-message="hint.turnOrderbs[index].investmentName"  disabled  /></van-cell-group>
          <van-cell-group><van-field v-model="v.pNum" label="产出物料数量" placeholder="请输入产出物料数量" :error-message="hint.turnOrderbs[index].pNum" /></van-cell-group>
          <van-cell-group @click="unitsPickerFn('putOut',index)"><van-field v-model="v.iPnitName" label="产出物料单位" disabled right-icon="arrow-down" :error-message="hint.turnOrderbs[index].iPnitName" /></van-cell-group>
          <van-cell-group><van-field v-model="v.noGoods" label="残次品" placeholder="请输入残次品数量" :error-message="hint.turnOrderbs[index].noGoods" /></van-cell-group>
      </div>
    </article>
      <van-popup v-model="unitsPicker.show" position="bottom">
          <van-picker show-toolbar :columns="columns.unitsValues" get-container="getContainer()" @cancel="onCancel" @confirm="onConfirm"/>
      </van-popup>
      <div class="buttons">
          <van-button type="info" size="small" @click="addNR()">新增</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
          <van-button type="warning" size="small" @click="deleteNR()">删除</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
      </div>

      <van-popup v-model="show.outputNameList" position="right" class="m-outputNameList">
          <article>
              <h3>选择</h3>
              <header class="m-outputNameList_tou">
                  <span>1</span>  <span>2</span>  <span>3</span>  <span>4</span>  <span>5</span>
              </header>
              <div  class="m-outputNameList_zhuTi" v-for="(v, index) in columns.outputList">
                  <span>{{v.materielName}}</span>
                  <span>{{v.plannedVolume}}</span>
                  <span>{{v.unitName}}</span>
                  <span>{{v.waste}}</span>
                  <span>{{v.workingHours}}</span>
              </div>
          </article>
      </van-popup>
      <field  v-on:AA="AAA($event)"></field>
      <field  v-on:AA="AAA($event)"></field>
  </div>


</template>
<script>
  import basicHeader from '@/components/header/basicHeader.vue';
  import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";
  import { forEach } from 'async';
  import api from "../../../../api/api.js";
  import {isGeneral} from '../../../../util/util.js';
  import {isNumber} from '../../../../util/util.js';
  import {isEmpty} from '../../../../util/util.js';
  import field from "./field.vue";
  //常量s
  const CONST = {
    productName:"请先选择工单编号",
    sprocessName:"请先选择产品名称"
  };

  export default {
    data () {
      return {
        unitsPicker:{
          show:false,
          pickerTarget:"",//单位部分的选择器的触发单位 —— 当前是哪一部分触发了选择器
          units_status:"",//putInto代表是投入部分触发了，putOut代表是产出部分触发了
        },
        columns:{
          productName:[{id: "0", name: CONST.productName}],
          sprocessName:[{id: "0", name: CONST.sprocessName}],
          outputList: [
            {
              idUnit: "",
              materiel: "",
              materielName: "等待获取",
              plannedVolume: "等待获取",
              specification:"等待获取",
              unitName: "等待获取",
              waste: "等待获取",
              workingHours: "等待获取",
            }
          ]
        },
        inputData:[],
        //架构没弄好，加个pageData做补丁
//        pageData:{
//          machineNumber:""
//
//        },
        status:{
          index:this.$store.state.changeSequence.index,
        },
        YZ:{
          workcode:false,
          productName:false,
          sprocessName:false,
          machineNumber:false,
          turnOrderbs_all:false,
          turnOrderbs:[
//            {
//              produceName:null,//投入物料名称
//              iNum:null,//投入物料数量
            //投入单位
//              investmentName:null,//产出物料名称
//              pNum:null,//产出物料数量
            //单位
//            }
          ]
        },
        //差不多和YZ一样
        hint:{
          workcode:"",
          productName:"",
          sprocessName:"",
          machineNumber:"",
          turnOrderbs:[]
        },
        show:{
          outputNameList:false
        }
      };
    },
    created(){
      //根据点击进来时的状态处理显示的内容
      const temporary_A = "" + this.$store.state.changeSequence.index;
      if(temporary_A){
        const index = this.$store.state.changeSequence.index;
        const store_Data = this.$store.state.changeSequence.inputData;
        if(typeof index === "number"){
          console.log("this.$store.state.changeSequence.inputData↓");
          console.log(store_Data);
          this.inputData = store_Data;//保存的脏值赋给input Data
          if(store_Data.turnOrderbs.length > 0){
            for(let i = 0;i<store_Data.turnOrderbs.length;i++){
              this.hint.turnOrderbs.push(
                {produceName:"", iNum:"", iUnitName:"", investmentName:"", pNum:"", iPnitName:"",noGoods:""}
              );
              this.YZ.turnOrderbs.push(
                {
                  produceName:false, iNum:false, iUnit:false,
                  investmentName:false, pNum:false, pUnit:false,noGoods:false
                }
              );
            }
          }else{console.log("------没有子信息-------")}
        }
        else{
          this.inputData = {
            workcode:"",
            machineNumber:"",//请输入机台号
            productName:"",//请选择产品名称
            productid:"",
            sprocessName:"",//请选择原工序
            sprocessid:"",
            turnOrderbs:[]
          };
        }
        console.log(this.inputData);
      }



      //根据URL获取工单编号和对应ID
      if(this.$route.query.workcode) {
        console.log(this.$route.query.workcode);
        this.inputData.workcode = this.$route.query.workcode;
        this.inputData.workcodeId = this.$route.query.workcodeId;
      }

      //根据空值获取单位
      api.selectUnit({}).then(res => {
        if (res.data) {
          this.columns.units = res.data;
          this.getUnitsValuesFn();
        } else {console.log("子信息单位获取失败");}
      });

//      //根据空值获取工序选项
//      api.getListProcess({}).then(res => {
//        console.log(res);
//        if (res.data) {
//          let temporary_A = [];
//          for(let i = 0;i<res.data.length;i++){
//            temporary_A.push({
//              id:res.data[i].id,
//              name:res.data[i].processName
//            });
//          }
//          this.columns.sprocessName = temporary_A;
//        } else {console.log("工序选项获取失败");}
//        });

      //根据工单编号ID获取产品信息
      if(this.inputData.workcodeId){
        let data = this.inputData.workcodeId;
        api.getManufactureOrdersListById(data).then(res => {
          console.log(res);
          if (res.data) {
            let temporary_A = [];
            for(let i = 0;i<res.data.length;i++){
              temporary_A.push({
                id:res.data[i].productid,
                name:res.data[i].productname
              });
            }
            this.columns.productName = temporary_A;
          } else {console.log("产品选项值获取失败");}
        });
      }



//      if(this.$store.state.changeSequence.saveCode){
//        this.inputData = this.$store.state.changeSequence.inputData;
//      }


//        //ajax获取工单编号
//        const selectOrderDropDownPageList_data = {CurrentPage:1, PageSize:2000};
//        api.selectOrderDropDownPageList(selectOrderDropDownPageList_data).then(res => {
//            if (res.data) {
//                console.log("工单编号↓");
//                console.log(res);
//            } else {console.log("获取失败");}
//        });


      console.log(this.hint.turnOrderbs);
    },
    beforeMount(){
    },
    computed: {
      columns_productName() {let select = [];this.columns.productName.forEach(element => {select.push(element.name);});return select},
      columnsData2() {var select = [];this.columns.sprocessName.forEach(element => {select.push(element.name)});return select},
    },

    methods: {
      AAA(data){
        console.log(data);
      },

      turnOrderbs_NameFn(data1, data2){
        this.show.outputNameList = true;
      },


      //工单选择相关
      workcodeFn(){
        let data = this.sendDataFn();
        this.$store.commit('CHANGE_SAVECODE',true);
        this.$store.commit('CHANGE_DATA',data);//嗯? 有点意思 竟然是这种逻辑

        // this.$store.commit('CHANGE_INDEX',this.status.index);
      },

        //获取子信息的单位需要的汉字集合值
      getUnitsValuesFn(){
        let units_A = [];
        for(let i = 0;i<this.columns.units.length;i++){
          units_A[i] = this.columns.units[i].name;
        }
        this.columns.unitsValues = units_A;
      },


      //选择器部分半封装式触发函数
      unitsPickerFn:function (status,index) {
        this.unitsPicker.pickerTarget = index;//选择器目标改变  单位模块的第几部分的选择器
        this.unitsPicker.units_status = status;//选择器目标改变  单位模块的第几部分的具体哪个选择器
        this.unitsPicker.show = true;
       },
      onCancel(){this.unitsPicker.show = false},
      onConfirm(value, index){
        const picker_index = this.unitsPicker.pickerTarget;//决定了是第几条子信息
        console.log(`当前值：${value}, 当前索引：${index}`);
        const temporary_A = this.unitsPicker.units_status;
          if(temporary_A === "putInto"){
            this.inputData.turnOrderbs[picker_index].iUnitName = value;//赋值value
            this.inputData.turnOrderbs[picker_index].iUnit = this.columns.units[index].id;//inputData的对应id值 = 源数据的id值
          }
          else if(temporary_A === "putOut"){
            this.inputData.turnOrderbs[picker_index].iPnitName = value;//赋值value
            this.inputData.turnOrderbs[picker_index].pUnit = this.columns.units[index].id;//inputData的对应id值 = 源数据的id值
          }
        this.unitsPicker.show = false;
      },

      //控制选择器显示位置
      getContainer() {return document.getElementsByClassName("Fu")[0]},


      //其他选择器部分半组件式函数

      //产品名称部分的选择事件
      clickinput_productName(newVal, index)  {
        this.inputData.productid = this.columns.productName[index].id;
        //根据产品名称获取原工序选项
        if(this.inputData.productid){
          const data = {
            productid:this.inputData.productid
          };
          api.productProcess(data).then(res => {
            console.log(res);
            if (res.data) {
              let temporary_A = [];
              for(let i = 0;i<res.data.length;i++){
                temporary_A.push({
                  id:res.data[i].processId,
                  name:res.data[i].processName
                });
              }
              this.columns.sprocessName = temporary_A;
            } else {console.log("工序可选项获取失败");}
          });
        }
      },


      clickinput2(newVal, index) {
        this.inputData.sprocessid = this.columns.sprocessName[index].id;



        //请求产出的选项部分   服务器压力↑用户体验↑
        const url ="/turnorder/getByProductProcess" + "?productid=" + this.inputData.productid + "&sprocessid=" + this.inputData.sprocessid;
        api.getByProductProcess( url,{}).then(res => {
          console.log(res);
          if (res.data) {
            let temporary_A = [];
            for(let i = 0;i<res.data.length;i++){
              temporary_A.push({
                idUnit:res.data[i].idUnit,//单位的ID
                materiel:res.data[i].materiel,//此条信息的ID
                materielName:res.data[i].materielName,//此条信息的名称
                specification:res.data[i].specification,//规格
                plannedVolume:res.data[i].plannedVolume,//计划量
                unitName:res.data[i].unitName,//单位名称
                waste:res.data[i].waste,//报废量
                workingHours:res.data[i].workingHours//工时
              });
            }
            this.columns.outputList = temporary_A;
          } else {console.log("工序可选项获取失败");}
        });
      },


      //添加按钮
      addNR(){
        console.log(this.inputData);

        this.inputData.turnOrderbs.push(
          {
            produceName:"", iNum:"", iUnitName:"请选择单位", iUnit:"",
            investmentName:"", pNum:"", iPnitName:"请选择单位", pUnit:"",noGoods:""
          }
        );
        this.YZ.turnOrderbs.push(
          {
            produceName:false, iNum:false, iUnit:false,
            investmentName:false, pNum:false, pUnit:false,noGoods:false
          }
        );
        this.hint.turnOrderbs.push(
          {produceName:"", iNum:"", iUnitName:"", investmentName:"", pNum:"", iPnitName:"",noGoods:""}
        );
      },
      //删除按钮
      deleteNR(){
        this.inputData.turnOrderbs.pop();
        this.YZ.turnOrderbs.pop();
        this.hint.turnOrderbs.pop();
      },
//      getId(){
//          return (Math.floor(Math.random()*1000));
//      },
        //将数据处理为后端需要的真实数据
      materielFn(data){
          let temporary_A = [];
          for(let i = 0;i<data.length;i++){
              let a = {};
              a.produceName = data[i].produceName;
              a.iNum = data[i].iNum;
              a.iUnit = data[i].iUnit;
              a.investmentName = data[i].investmentName;
              a.pNum = data[i].pNum;
              a.pUnit = data[i].pUnit;
//              a.noGoods = data[i].noGoods;
              temporary_A.push(a);
          }
         return temporary_A;
     },
      //导航栏事件触发
      sendDataFn(flag){
        const NR = this.inputData;
        //turnOrderbs 后端要的子信息参数
        let data = {
          //工单编号
          workcode:NR.workcode,
          // workcodeId:NR.workcodeId,
          /*产品名称*/
          //  productName:NR.productName,
          productid:NR.productid,
          /*原工序*/
          //   sprocessName:NR.sprocessName,
          sprocessid:NR.sprocessid,
          //机台号
          machineNumber:NR.machineNumber
        };
        data.turnOrderbs = this.materielFn(NR.turnOrderbs);//处理后的子信息数据
        //如果是编辑状态则增加ID
        if(typeof this.status.index === "number" || this.status.index === 0){data.id = this.inputData.id;}
        console.log("提交时的数据↓");console.log(data);
        data.flag = flag;//入库0还是转序1
        return data;
      },
      goPageTo(flag) {
        /*验证*///健壮性
        console.log(this.YZ.workcode);
        this.YZ.workcode = isEmpty(this.inputData.workcode);
        this.YZ.productName = isEmpty(this.inputData.productid);
        this.YZ.sprocessName = isEmpty(this.inputData.sprocessid);
        this.YZ.machineNumber = isEmpty(this.inputData.machineNumber);

        const temporary_B = this.YZ;
        if (!temporary_B.workcode)     {this.hint.workcode = "投入名称输入有误"}      else {this.hint.workcode = ""}
        if (!temporary_B.productName)  {this.hint.productName = "投入数量输入有误"}  else {this.hint.productName = ""}
        if (!temporary_B.sprocessName) {this.hint.sprocessName = "投入单位输入有误"} else {this.hint.sprocessName = ""}
        if (!temporary_B.machineNumber){this.hint.machineNumber = "产出名称输入有误"}else {this.hint.machineNumber = ""}

        console.log("_______________________");

        for(let i = 0;i<this.YZ.turnOrderbs.length;i++) {
          this.YZ.turnOrderbs[i].produceName = isEmpty(this.inputData.turnOrderbs[i].produceName);
          this.YZ.turnOrderbs[i].iNum = isGeneral(this.inputData.turnOrderbs[i].iNum);
          this.YZ.turnOrderbs[i].iUnit = isEmpty(this.inputData.turnOrderbs[i].iUnit);
          this.YZ.turnOrderbs[i].investmentName = isEmpty(this.inputData.turnOrderbs[i].investmentName);
          this.YZ.turnOrderbs[i].pNum = isGeneral(this.inputData.turnOrderbs[i].pNum);
          this.YZ.turnOrderbs[i].pUnit = isEmpty(this.inputData.turnOrderbs[i].pUnit);
          this.YZ.turnOrderbs[i].noGoods = isNumber(this.inputData.turnOrderbs[i].noGoods);
          //错误提示——提示所有错误版
          const temporary_A = this.YZ.turnOrderbs[i];
          if (!temporary_A.produceName)     {this.hint.turnOrderbs[i].produceName = "投入名称输入有误"}         else {this.hint.turnOrderbs[i].produceName = ""}
          if (!temporary_A.iNum)            {this.hint.turnOrderbs[i].iNum = "投入数量输入有误"}                 else {this.hint.turnOrderbs[i].iNum = ""}
          if (!temporary_A.iUnit)           {this.hint.turnOrderbs[i].iUnitName = "投入单位输入有误"}            else {this.hint.turnOrderbs[i].iUnitName = ""}
          if (!temporary_A.investmentName) {this.hint.turnOrderbs[i].investmentName = "产出名称输入有误"}       else {this.hint.turnOrderbs[i].investmentName = ""}
          if (!temporary_A.pNum)            {this.hint.turnOrderbs[i].pNum = "产出数量输入有误"}                  else {this.hint.turnOrderbs[i].pNum = ""}
          if (!temporary_A.pUnit)           {this.hint.turnOrderbs[i].iPnitName = "产出单位输入有误"}            else {this.hint.turnOrderbs[i].iPnitName = ""}
          if (!temporary_A.noGoods)           {this.hint.turnOrderbs[i].noGoods = "残次品数量输入有误"}          else {this.hint.turnOrderbs[i].noGoods = ""}
          if(temporary_A.produceName && temporary_A.iNum && temporary_A.iUnit && temporary_A.investmentName && temporary_A.pNum && temporary_A.pUnit && temporary_A.noGoods){
            this.YZ.turnOrderbs_all = true;
            console.log("第" + (i + 1) + "条数据通过验证");
          }
          else{this.YZ.turnOrderbs_all = false;}
        }
        console.log("this.YZ");
        console.log(this.YZ);

        const this_YZ = this.YZ;
        //验证状态放在了status
        if(this_YZ.turnOrderbs_all && this_YZ.workcode && this_YZ.productName && this_YZ.sprocessName && this_YZ.machineNumber ){
          const data = this.sendDataFn(flag);
          api.turnordersaveOrUpdate(data).then(
            res => {
              console.log(res);
              this.$router.push('/changeSection')
            },
            err => {
              console.log(err);
            }
          );
          if(this.status.index === "tianjia"){
//          api.turnordersaveOrUpdate(data).then(
//            res => {
//              console.log(res);
//              this.$router.push('/changeSection')
//            },
//            err => {
//              console.log(err);
//            }
//          );
          }
          else if(typeof this.status.index === "number" || this.status.index === 0){
//          api.turnordersaveOrUpdate(data).then(
//            res => {
//              console.log(res);
//              this.$router.push('/changeSection')
//            },
//            err => {
//              console.log(err);
//            }
//          );
          }
          else{console.log("出大大问题了！无法获取状态值(并不大，vuex存储下就行 回头弄上)");}
//        api.turnordersaveOrUpdate(data).then(
//          res => {
//            console.log(res);
//            this.$router.push('/changeSection')
//          },
//          err => {
//            console.log(err);
//          }
//        );

//      this.$store.commit('CHANGE_DATA',data);//嗯? 有意思 竟然是这么运行的
          // this.$store.commit('CHANGE_INDEX',this.status.index);
          //   console.log(this.$store.state.changeSequence);

        }
      },
    },
    mounted() {},
    components: {
      basicHeader,
      VanFieldSelectPicker,
      field
    }
  }
</script>
<style  scoped>

    .m-outputNameList{height: 100%;width: 96%;}
    .m-outputNameList_tou{}
    .m-outputNameList_zhuTi{}


    .tagFu{display: flex;justify-content:flex-start;align-items: center; flex-wrap:wrap;}
    .tagFu span{display: inline-flex; background-color: #F4F4F4;color: #333333;font-size: 14px;padding:4px 10px;margin: 4px 10px;border-radius: 6px;}
    .tag_childsFu span{ background-color: transparent;color: #333333;border: solid 1px #d6d6d6;}
    .tagFu .class_red{background-color: rgba(153, 204, 255, 1); color: white;}

    .buttons{display: flex;justify-content: flex-end;padding:6px;margin-bottom: 50px;}
    .buttons button{margin: 0 10px;}
    .addNR{padding: 20px 0;}
    .addNR h4{padding: 10px 0;text-align: center;}
    .van-cell--large .van-cell__title{font-size: 14px;max-width: 90px;}
    .van-cell__value{text-align: left;font-size: 14px;}

</style>
