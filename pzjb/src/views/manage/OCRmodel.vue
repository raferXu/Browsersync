<template>
  <div class="manageIssueBox" >
    <h3 class="modelTitle pageTitle modelTitle1">{{title}}</h3>
    <Row style="background:#fff;">
      <Col span="15" class="manageIssueBoxleft modelBox" >
        <Row>
          <Col class="title1 modelTitle">1.选择模版类型</Col>
        </Row>
        <Row class="module_type">
          <Row class="radio_module">
            <Radio class="radio_list" v-model="radio" label="0">身份证</Radio>
          </Row>
        </Row>
        <Row></Row>
        <Row>
          <Col class="title1 modelTitle">2.API调用信息</Col>
        </Row>
        <Row class="api_mas">
          <Form :label-width="140" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
            <span class="starRed starPos">＊ </span>
            <FormItem class="modelInputLabel" label="月调用次数">
              <Select style="width:200px;" @change="selectChange" v-model="ruleForm.region" placeholder="请选择">
                <Option label="1-10000" value="10000"></Option>
                <Option label="10001-50000" value="50000"></Option>
                <Option label="50001-100000" value="100000"></Option>
                <Option label=">100000" value="150000"></Option>
              </Select>
              <Input style="width:200px;" v-if="customFlag" @change="selectChange" v-model="custonInput" placeholder="请输入内容"></Input>
            </FormItem><br>
            <span class="starRed starPos">＊ </span>
            <FormItem class="modelInputLabel" label="预计调用时长" prop="name">
              <Input style="width:200px;" @change="selectChange" v-model="ruleForm.time"><template slot="append">月</template></Input>
            </FormItem><br>
            <span class="starRed starPos">＊ </span>
            <FormItem class="modelInputLabel" label="字段位置信息">
              <RadioGroup v-model="ruleForm.resource">
                <Radio value="true" label="需要"></Radio>
                <Radio value="false" label="不需要"></Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Row>
      </Col>
      <Col span="9" class="manageIssueBoxright" >
        <Col class="title2 modelTitle">预扣费</Col>
        <Col class="title3 modelParam">月调用费用:</Col>
        <Col class="modelTips"><span class="modelTipsLabel pr5">API 费用: </span>{{price}}元／次</Col>
        <Col class="modelTips"><span class="modelTipsLabel pr5">预计月调用量: </span>{{times}}次</Col>
        <Col class="modelTips"><span class="modelTipsLabel pr5">预计使用时长: </span>{{ruleForm.time}}月</Col>
        <Col class="modelTitle pt80"><span class="modelTipsLabel pr5">总计: </span>{{total_cost}}元</Col>
        <Col class="modelTips mt0"><span class="starRed">* </span>此价格为预扣费的金额，最终花费以实际用量为准。</Col>
      </Col>
    </Row>
    <div class="btnGBox"  style="background:#fff;">
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
      title: '开通OCR服务',
      radio: "0",
      ruleForm: {
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
        this.total_cost = this.times * this.price * this.ruleForm.time;
      }else if(this.times == 50000){
        this.customFlag = false;
        this.price = "0.17－0.2";
        this.total_cost =  this.times * 0.2 * this.ruleForm.time;
      }else if(this.times == 100000){
        this.customFlag = false;
        this.price = "0.14－0.2";
        this.total_cost = this.times * 0.2 * this.ruleForm.time;
      }else if(this.times == 150000){
        this.customFlag = true;
        this.price = "0.08－0.2";
        this.total_cost = this.custonInput*0.2 * this.ruleForm.time;
        this.times = this.custonInput;
      }
      this.total_cost = parseInt(this.total_cost);
    },
    submitOrder(){
      if(this.ruleForm.region==''){
        alert('请选择月调用次数！');
        return false;
      }
      if(this.ruleForm.time=='0'){
        alert('请填写预计调用时长！');
        return false;
      }
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
        num:this.times,
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
    .module_type{
      width: 100%;
      margin-bottom: 80px;
    }
    .radio_module{
      box-sizing: border-box;
      width: 80%;
    }
    .btnGBox{
      display: flex;
      justify-content: flex-end;
      padding: 160px 80px;
    }
    .starPos{
      position: relative;
      top: 36px;
    }
    .modelTitle1{
      height: 90px;
      line-height: 90px;
      font-size:20px;
      padding:0 40px;
      background: #fff;
    }
    .pageTitle{
      background: #fff !important;
    }
</style>
