<template>
  <div class="manageIssueBox">
    <h3 class="title">{{title}}</h3>
    <el-row>
    <el-col :span="15" class="manageIssueBoxleft" >
      <el-row>
        <el-col class="title1">1.选择模版类型</el-col>
      </el-row>
      <el-row class="module_type">
        <el-row class="radio_module">
          <el-radio class="radio_list" v-model="radio" label="1">身份证</el-radio>
          <el-radio class="radio_list" v-model="radio" label="2">驾驶证</el-radio>
          <el-radio class="radio_list" v-model="radio" label="3">医疗票据（上海）</el-radio>
          <br><br>
          <el-radio class="radio_list" v-model="radio" label="4">银行卡</el-radio>
          <el-radio class="radio_list" v-model="radio" label="5">行驶证</el-radio>
          <el-radio class="radio_list" v-model="radio" label="6">自定义模版1</el-radio>
        </el-row>
      </el-row>
      <el-row></el-row>
      <el-row>
        <el-col class="title1">2.API调用信息</el-col>
      </el-row>
      <el-row class="api_mas">
        <el-form label-width="140px" label-position="left" :inline="true" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="＊ 月调用次数">
            <el-select style="width:200px;" @change="selectChange" v-model="ruleForm.region" placeholder="请选择">
              <el-option label="1-10000" value="10000"></el-option>
              <el-option label="10001-50000" value="50000"></el-option>
              <el-option label="50001-100000" value="100000"></el-option>
              <el-option label=">100000" value="150000"></el-option>
            </el-select>
          </el-form-item><br>
          <el-form-item label="＊ 预计调用时长" prop="name">
            <el-input style="width:200px;" @change="selectChange" v-model="ruleForm.time"><template slot="append">月</template></el-input>
          </el-form-item><br>
          <el-form-item label="＊ 叠加位置信息">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="需要"></el-radio>
              <el-radio label="不需要"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
    <el-col :span="9" class="manageIssueBoxright" >
      <el-col class="title2" >预扣费</el-col>
      <el-col class="title3" >月调用费用:</el-col>
      <el-col class="cost_mas" :span="6">API 费用:</el-col><el-col class="cost_mas" :span="6">{{price}}</el-col><el-col class="cost_mas" :span="12">元／次</el-col>
      <el-col class="cost_mas" :span="6">预计调用量:</el-col><el-col class="cost_mas" :span="6">{{times}}</el-col><el-col class="cost_mas" :span="12">次</el-col>
      <el-col class="cost_mas" :span="6">预计使用时长:</el-col><el-col class="cost_mas" :span="6">{{ruleForm.time}}</el-col><el-col class="cost_mas" :span="12">月</el-col>
      <el-col class="total_cost" :span="3" >总计：</el-col><el-col :span="5" class="total_cost">{{total_cost}}</el-col><el-col :span="1" class="total_cost">元</el-col><el-col :span="15" class="total_cost_mas">（月调用费*预计调用量*预计使用时长*120%）</el-col>
      <el-col></el-col>
      <el-col :span="1" class="cost_red">*</el-col><el-col :span="22" class="total_cost_mas" >此价格为预扣费的金额，最终花费以实际用量为准。</el-col>
    </el-col>
    </el-row>
    <el-button class="submit_order" @click="submitOrder" >确认订单</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  created () {
    console.log(this.$route.matched)
  },
  data () {
    return {
      title: '开通ORC服务',
      radio:"",
      ruleForm: {
        // name: '',
        // desc: '简单描述您使用业务的应用场景，如支持一款理财APP的用户身份验证。',
        time:'0',
        resource:'',
        region:''
      },
      price:'0',
      times:'0',
      total_cost:'0'
    }
  },
  methods:{
    selectChange(){
      // console.log(this.ruleForm.region)
      this.times = this.ruleForm.region;
      if(this.ruleForm.region == 10000){
        this.price = 0.2; 
      }else if(this.ruleForm.region == 50000){
        this.price = 0.17;
      }else if(this.ruleForm.region == 100000){
        this.price = 0.14;
      }else if(this.ruleForm.region == 150000){
        this.price = 0.08;
      }
      this.total_cost = this.times * this.price * this.ruleForm.time*1.2;
      this.total_cost = parseInt(this.total_cost);
    },
    submitOrder(){
      // console.log(this.radio);
      var radio_module = {
        '1':'身份证',
        '2':'驾驶证',
        '3':'医疗票据（上海）',
        '4':'银行卡',
        '5':'行驶证',
        '6':'自定义模版1'
      }
      var obj = {
        add: this.ruleForm.resource,
        month: this.ruleForm.time,
        num: this.ruleForm.region,
        price: this.price,
        sum: this.total_cost,
        list: {
          projectName: radio_module[this.radio], 
          id: "xxxxxxxx", 
          created:"2018/04/16", 
          status:"审核中",
          time:"0"
        }
      };
      // {projectName: "银行卡", id: "xxxxxxxx", created:"2018/03/06", status:"生效中",time:"1000"}
      this.$router.push({name:'orderPay',params:obj});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
    .manageIssueBoxleft{
      float: left;
      padding: 0 40px;
      border-right: 1px solid #f0f0f0;
    }
    .manageIssueBoxright{
      float: right;
      padding-left: 80px;
    }
    .title{
      height: 90px;
      line-height: 90px;
      padding-left: 40px;
      font-size: 32px;
      color: #323232;
      border-bottom: 1px solid #f0f0f0;
    }
    .title1{
      font-size: 24px;
      height: 80px;
      line-height: 80px;
      padding-left: 5px;
    }
    .module_type{
      width: 100%;
      margin-bottom: 80px;
    }
    .radio_module{
      box-sizing: border-box;
      width: 80%;
      padding-left: 20px;
      padding-top: 20px;
    }
    .radio_list{
      margin-right: 30px;
    }
    .api_mas{
      border-top:none;
    }
    .title2{
      font-size: 24px;
      color:#333;
      padding-top: 80px;
      margin-bottom: 40px;
    }
    .title3{
      font-size: 18px;
      color:#333;
      margin-bottom: 10px;
    }
    .cost_mas{
      font-size: 14px;
      color:#828282;
      margin-bottom: 10px;
    }
    .total_cost{
      font-size: 24px;
      color:#333;
      margin-bottom: 10px;
    }
    .total_cost_mas{
      font-size: 14px;
      color:#333;
      margin-top: 5px;
    }
    .cost_red{
      font-size: 14px;
      color:#ff3b30;
      margin-top: 6px;
    }
    .submit_order{
      float: right;
      margin:50px;
    }
</style>
