
<!--vant二次封装v0.1(简洁性)-->
<!---->

<template>
    <div class="template_Fu">
        <van-cell-group><van-field
                v-model="inputData.vModel"
                :label="inputData.label"
                :placeholder="inputData.placeholder"
                :maxlength = "inputData.maxlength"
                :error-message="hint"
                :clearable = inputData.clearable
                :disabled = "inputData.disabled"
                @input = "a()"
        /></van-cell-group>
    </div>
</template>

<script>
  import {isGeneral} from '../util/util.js';
  import {isNumber} from '../util/util.js';
  import {isEmpty} from '../util/util.js';

  /*父组件应用示例
      <w-field
            :vModel="inputData.machineNumber"
            label = "机台号"
            placeholder = "请输入机台号"
            maxlength="30"
            errorMessage="机台号由1-30位的数字、大小写字母组成"
            disabled = "false"
            clearable
            v-on:w-field_c1="input_machineNumber($event)">
    </w-field>

   */

  export default {
    name:"van_field_c1",
    /*YZ_rule:采用哪种验证规则(可选)
     errorMessage:不符合规则时的错误提示(可选)
     disabled:vant框架默认需要手动加上，此处跟vant保持一致(可选)
     clearable:vant框架默认需要手动加上，我设置成了默认带着，不要的话需要在父组件里写上clearable="false"来取消(可选)
     maxlength:最大长度(可选)
     vmodel:input值(可选)
     label:标签(可选)
     值改变时的事件
     */

    props: ['vModel','label','placeholder','maxlength',"YZ_rule",'errorMessage',"clearable","disabled",],
    data () {
      return {
        inputData:{
          vModel:"",
          label:"",
          placeholder:"",
          maxlength:"",
          disabled:false,
          clearable:false,
        },
        status:{YZ_rule:true},
        YZ:false,
        hint:"",
      };
    },
    computed:{},
    created(){
//验证有无参数
      if(this.vModel){this.inputData.vModel = this.vModel} else{this.inputData.vModel = ""}

      if(this.label){this.inputData.label = this.label} else{this.inputData.label = null  }

      if(this.placeholder){this.inputData.placeholder = this.placeholder} else{this.inputData.placeholder = null}

      if(this.maxlength){this.inputData.maxlength = this.maxlength} else{this.inputData.maxlength = ""}

      //存在则为禁止状态  不允许修改内容
      if( this.disabled === "" || this.disabled){this.inputData.disabled = true} else{this.inputData.disabled = false}
      //存在则为false 不要清除功能
      if((this.clearable === "false" ||this.clearable)){this.inputData.clearable = false} else{this.inputData.clearable = true}

    },
    beforeCreate(){},
    beforeMount(){},
    methods: {
      a(){
        //空值检测
        if(this.YZ_rule === 'isEmpty')  {this.YZ = isEmpty(this.inputData.vModel);}
        //常规数据检测
        else if(this.YZ_rule === 'isGeneral'){this.YZ = isGeneral(this.inputData.vModel);}
        //数字检测
        else if(this.YZ_rule === 'isNumber') {this.YZ = isNumber(this.inputData.vModel);}
        else {
          this.status.YZ_rule = false;//不存在方法
//          try{throw new Error("验证方法不存在");}
//          catch(err){console.log(err);}
//          finally{}
        }
        //存在验证方法的话——如果验证通过则提示值为空，否则  如果存在传进来的提示参数 显示提示参数 否则显示空
        if(this.status.YZ_rule){
          if(this.YZ){ this.hint = "" }
          else{
            if(this.errorMessage){this.hint = this.errorMessage;}
            else{this.hint = ""}
          }
        }


        //数据传回父组件
        const send = {
          value:this.inputData.vModel,
          YZ:this.YZ,
        };
        this.$emit('w-field_c1',send)
      }
    },
    mounted() {

    },
    components: {

    }

  }

</script>
<style  scoped>


</style>
