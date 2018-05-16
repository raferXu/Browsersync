<template>
  <div class="manageIssueBox">
    <h3 class="modelTitle pageTitle modelTitle1">{{title}}</h3>
    <el-row>
      <el-col :span="15" class="manageIssueBoxleft modelBox" >
        <el-row>
          <el-col class="title1 modelTitle">1.选择模版类型</el-col>
        </el-row>
        <el-row class="module_type">
          <el-row class="radio_module">
            <el-radio class="radio_list" v-model="radio" label="0">身份证</el-radio>
            <el-radio class="radio_list" v-model="radio" label="1">驾驶证</el-radio>
            <el-radio class="radio_list" v-model="radio" label="2">医疗票据（上海）</el-radio>
            <br><br>
            <el-radio class="radio_list" v-model="radio" label="3">银行卡</el-radio>
            <el-radio class="radio_list" v-model="radio" label="4">行驶证</el-radio>
            <el-radio class="radio_list" v-model="radio" label="5">自定义模版1</el-radio>
          </el-row>
        </el-row>
        <el-row></el-row>
        <el-row>
          <el-col class="title1 modelTitle">2.API调用信息</el-col>
        </el-row>
        <el-row class="api_mas">
          <el-form label-width="140px" label-position="left" :inline="true" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <span class="starRed starPos">＊ </span>
            <el-form-item class="modelInputLabel" label="月调用次数">
              <el-select style="width:200px;" @change="selectChange" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="1-10000" value="10000"></el-option>
                <el-option label="10001-50000" value="50000"></el-option>
                <el-option label="50001-100000" value="100000"></el-option>
                <el-option label=">100000" value="150000"></el-option>
              </el-select>
              <el-input style="width:200px;" v-if="customFlag" @change="selectChange" v-model="custonInput" placeholder="请输入内容"></el-input>
            </el-form-item><br>
            <span class="starRed starPos">＊ </span>
            <el-form-item class="modelInputLabel" label="预计调用时长" prop="name">
              <el-input style="width:200px;" @change="selectChange" v-model="ruleForm.time"><template slot="append">月</template></el-input>
            </el-form-item><br>
            <span class="starRed starPos">＊ </span>
            <el-form-item class="modelInputLabel" label="叠加位置信息">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio value="true" label="需要"></el-radio>
                <el-radio value="false" label="不需要"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
      <el-col :span="9" class="manageIssueBoxright" >
        <el-col class="title2 modelTitle">预扣费</el-col>
        <el-col class="title3 modelParam">月调用费用:</el-col>
        <el-col class="modelTips"><span class="modelTipsLabel pr5">API 费用: </span>{{price}}元／次</el-col>
        <el-col class="modelTips"><span class="modelTipsLabel pr5">预计月调用量: </span>{{times}}次</el-col>
        <el-col class="modelTips"><span class="modelTipsLabel pr5">预计使用时长: </span>{{ruleForm.time}}月</el-col>
        <el-col class="modelTips"><span class="modelTipsLabel pr5">保障金: </span>120%</el-col>
        <el-col class="modelTitle pt80"><span class="modelTipsLabel pr5">总计: </span>{{total_cost}}元</el-col>
        <el-col class="modelTips mt0"><span class="starRed">* </span>此价格为预扣费的金额，最终花费以实际用量为准。</el-col>
      </el-col>
    </el-row>
    <div class="btnGBox">
      <div class="modelPrimaryBtn" @click="submitOrder">确认订单</div>
    </div>
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
      customFlag: false,
      custonInput: '',
      title: '开通ORC服务',
      radio: "0",
      ruleForm: {
        // name: '',
        // desc: '简单描述您使用业务的应用场景，如支持一款理财APP的用户身份验证。',
        time:'0',
        resource:'需要',
        region:''
      },
      price:'0',
      times:'0',
      total_cost:'0'
    }
  },
  methods:{
    selectChange(){
      this.times = this.ruleForm.region;
      if(this.times == 10000){
        this.customFlag = false;
        this.price = 0.2; 
        this.total_cost = this.times * this.price * this.ruleForm.time*1.2;
      }else if(this.times == 50000){
        this.customFlag = false;
        this.price = "0.17－0.2";
        // this.total_cost = ((this.times-10000) * 0.17 + 0.2*10000) * this.ruleForm.time*1.2;
        this.total_cost =  this.times * 0.2 * this.ruleForm.time*1.2;
      }else if(this.times == 100000){
        this.customFlag = false;
        this.price = "0.14－0.2";
        this.total_cost = this.times * 0.2 * this.ruleForm.time*1.2;
      }else if(this.times == 150000){
        this.customFlag = true;
        this.price = "0.08－0.2";
        this.total_cost = this.custonInput*0.2 * this.ruleForm.time*1.2;

      }
      this.total_cost = parseInt(this.total_cost);
    },
    submitOrder(){
      // console.log(this.radio);
      // template_id  expected_frequency expected_duration location_included
      var radio_module = {
        '0':'身份证',
        '1':'驾驶证',
        '2':'医疗票据（上海）',
        '3':'银行卡',
        '4':'行驶证',
        '5':'自定义模版1'
      }
      var obj = {
        add: this.ruleForm.resource,
        month: this.ruleForm.time,
        num: this.ruleForm.region,
        price: this.price,
        sum: this.total_cost,
        list: {
          projectName: radio_module[this.radio], 
          id: "12345612", 
          created:"2018/04/16", 
          status:"审核中",
          time:"0"
        },
        json: {
          template_id: parseInt(this.radio)+1,
          expected_frequency: this.ruleForm.region,
          expected_duration: this.ruleForm.time,
          location_included: this.ruleForm.resource=="需要"?true:false
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
      line-height: 1;
      border-right: 1px solid #f0f0f0;
    }
    .manageIssueBoxright{
      float: right;
      padding-left: 80px;
      padding-top: 80px;
    }
    .title{
      padding: 40px;
      border-bottom: 1px solid #f0f0f0;
    }
    /* .title1{
      font-size: 24px;
      height: 80px;
      line-height: 80px;
      padding-left: 5px;
    } */
    .module_type{
      width: 100%;
      margin-bottom: 80px;
    }
    .radio_module{
      box-sizing: border-box;
      width: 80%;
    }
    /* .api_mas{
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
    } */
    .btnGBox{
      padding: 160px 80px;
    }
    .starPos{
      position: relative;
      top: 20px;
    }
    .modelTitle1{
      height: 90px;
      line-height: 90px;
      font-size:20px;
      padding:0 40px;
    }
</style>
