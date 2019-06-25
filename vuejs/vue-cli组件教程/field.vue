
<!--vant二次封装(简洁性)-->
<!---->

<template>
    <div class="Fu">
        <van-cell-group><van-field
                v-model="inputData.A1"
                :label="inputData.A2"
                :placeholder="inputData.A3"
                :error-message="hint.input1"
                @input = "aa()"
        /></van-cell-group>
    </div>
</template>

<script>
  import {isGeneral} from '../../../../util/util.js';
  import {isNumber} from '../../../../util/util.js';
  import {isEmpty} from '../../../../util/util.js';


  export default {
    data () {
      return {
        inputData:{
          A1:"我是input内容",
          A2:"题目",
          A3:"请输入内容"
        },
        YZ:{
          input1:false
        },
        hint:{
          input1:""
        }
      };
    },
    computed:{},
    created(){},
    beforeCreate(){},
    beforeMount(){},
    methods: {
      aa(){
//        console.log(this.inputData.A1);
        (this.YZ.input1 = isEmpty(this.inputData.A1) ) ? this.hint.input1 = "" : (this.hint.input1 = "错误提示");
        const a = {
          a1:this.inputData.A1,
          a2:this.YZ.input1
        };
        this.$emit('AA',a)
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
