<template>
  <div class="orderPayBox manageIssueBox" >
    <h3 class="modelTitle pageTitle modelTitle1">{{title}}</h3>
    <div class="conWrap">
      <div class="payCon">
        <div class="payTypeBox">
          <Row>
            <Col class="title mb40">1.选择模版类型</Col>
          </Row>
          <Row class="module_type">
            <RadioGroup v-model="modelType">
                <Radio class="radio_list" value="1" label="1">身份证</Radio>
              </RadioGroup>
          </Row>
        </div>
        <div class="payTypeBox">
          <Row>
            <Col class="title mb40">2.API调用信息</Col>
          </Row>
          <Row class="api_mas">
            <Form label-position="left" :label-width="116" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
              <FormItem class="modelInputLabel" label="月调用次数">
                <span class="starRed starPos">＊ </span>
                <Select style="width:400px;" @on-change="selectChange" v-model="ruleForm.region" placeholder="请选择">
                  <Option label="1-10000" value="10000"></Option>
                  <Option label="10001-50000" value="50000"></Option>
                  <Option label="50001-100000" value="100000"></Option>
                  <Option label=">100000" value="150000"></Option>
                </Select>
                <Input style="width:400px;" v-if="customFlag" @on-change="selectChange" v-model="custonInput" placeholder="请输入内容"></Input>
              </FormItem>
              <FormItem class="modelInputLabel" label="预计调用时长" prop="name">
                <span class="starRed starPos">＊ </span>
                <Input style="width:400px;" @on-change="selectChange" v-model="ruleForm.time"><template slot="append">月</template></Input>
              </FormItem>
              <FormItem class="modelInputLabel modelInputLabel3" label="字段位置信息">
                <span class="starRed starPos">＊ </span>
                <RadioGroup v-model="ruleForm.resource">
                  <Radio value="true" label="需要"></Radio>
                  <Radio value="false" label="不需要"></Radio>
                </RadioGroup>
              </FormItem>
            </Form>
          </Row>
        </div>
        <div class="payTypeBox">
          <Row>
            <Col class="title mb40">预扣费</Col>
              <Col class="mb20">月调用费用:</Col>
              <Row class="mb40">
                <i-col span="8" class="feeClass">API 费用: <span>{{price}}元／次</span></i-col>
                <i-col span="8" class="feeClass">预计月调用量: <span>{{times}}次</span></i-col>
                <i-col span="8" class="feeClass">预计使用时长: <span>{{ruleForm.time}}月</span></i-col>
              </Row>
              <Col class="sumBox mb20"><h4>总计: {{total_cost}}元</h4></Col>
              <Col class="sumBox"><p><i class="starRed">* </i>此价格为预扣费的金额，最终花费以实际用量为准。</p></Col>
          </Row>
        </div>
        <div class="payTypeBox">
          <div class="btnGBox">
            <div class="modelPrimaryBtn" @click="submitOrder">确认订单</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  created() {
    console.log(this.$route.matched);
  },
  data() {
    return {
      customFlag: false,
      custonInput: "",
      title: "开通OCR服务",
      modelType: "1",
      ruleForm: {
        time: "0",
        resource: "需要",
        region: ""
      },
      price: "0",
      times: "0",
      total_cost: "0"
    };
  },
  methods: {
    selectChange() {
      this.times = this.ruleForm.region;
      if (this.times == 10000) {
        this.customFlag = false;
        this.price = 0.2;
        this.total_cost = this.times * this.price * this.ruleForm.time;
      } else if (this.times == 50000) {
        this.customFlag = false;
        this.price = "0.17－0.2";
        this.total_cost = this.times * 0.2 * this.ruleForm.time;
      } else if (this.times == 100000) {
        this.customFlag = false;
        this.price = "0.14－0.2";
        this.total_cost = this.times * 0.2 * this.ruleForm.time;
      } else if (this.times == 150000) {
        this.customFlag = true;
        this.price = "0.08－0.2";
        this.total_cost = this.custonInput * 0.2 * this.ruleForm.time;
        this.times = this.custonInput;
      }
      this.total_cost = parseInt(this.total_cost);
    },
    submitOrder() {
      if (this.ruleForm.region == "") {
        alert("请选择月调用次数！");
        return false;
      }
      if (this.ruleForm.time == "0") {
        alert("请填写预计调用时长！");
        return false;
      }
      var radio_module = {
        "1": "身份证",
        "2": "驾驶证",
        "3": "医疗票据（上海）",
        "4": "银行卡",
        "5": "行驶证",
        "6": "自定义模版1"
      };
      var obj = {
        add: this.ruleForm.resource,
        month: this.ruleForm.time,
        num: this.times,
        price: this.price,
        sum: this.total_cost,
        list: {
          projectName: radio_module[this.modelType],
          id: "12345612",
          created: "2018/04/16",
          status: "审核中",
          time: "0"
        },
        json: {
          template_id: parseInt(this.modelType),
          expected_frequency: this.ruleForm.region,
          expected_duration: this.ruleForm.time,
          location_included: this.ruleForm.resource == "需要" ? true : false
        }
      };
      this.$router.push({ name: "orderPay", params: obj });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subTitle{
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 20px;
    color: #323232;
}
.btnGBox {
  display: flex;
  justify-content: flex-end;
}
.api_mas{
  padding-left: 20px;
}
.modelInputLabel{
  position: relative;
}
.starPos {
  position: absolute;
  top: 0;
  left: -136px;
  height: 36px;
  line-height: 36px;
}
.modelTitle1 {
  height: 90px;
  line-height: 90px;
  font-size: 20px;
  padding: 0 40px;
  border: 1px solid #f0f0f0;
  background: #fff;
}
.modelPrimaryBtn {
  width: 130px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  border-radius: 0;
  background: #0090ff;
}

.conWrap {
  padding: 20px;
  background: #f0f0f0;
}
.payCon {
  min-width: 930px;
  font-size: 14px;
  color: #323232;
  background: #fff;
}
.payTypeBox{
  padding: 30px 60px 30px 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.payTypeBox .title{
  margin-bottom: 20px;
  font-size: 14px;
  color: #828282;
}
.feeClass{
  color: #828282;
}
.feeClass span{
  color: #323232;
}
.sumBox{
  font-size: 14px;
  color: #323232;
}
.sumBox h4{
  color: #323232;
  font-size: 18px;
}
.sumBox span{
  font-size: 14px;
}
.sumBox p{
  color: #828282;
}
.sumBox i{
  color: #ff3b30;
}
</style>
<style>
.orderPayBox .ivu-radio-wrapper{
  font-size: 14px;
}
.orderPayBox .proofItem .ivu-form-item-content{
  height: auto;
}
.orderPayBox .ivu-form-item{
  margin-bottom: 20px;
}
.orderPayBox .ivu-form .ivu-form-item-label{
  font-size: 14px;
  color: #828282;
}
.orderPayBox .ivu-input-wrapper{
  width: 400px;
}
.orderPayBox .ivu-input, .ivu-form-item-content, .orderPayBox .ivu-form .ivu-form-item-label, .orderPayBox .ivu-select-single .ivu-select-selection, .orderPayBox .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .orderPayBox .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
  height: 36px;
  line-height: 36px;
}
.orderPayBox .ivu-input{
  padding: 0 0 0 10px;
  font-size: 14px;
  line-height: 36px;
}
.orderPayBox .ivu-form-item-content{
  width: 400px;
}
.orderPayBox .ivu-form-item.modelInputLabel3{
  margin-bottom: 0;
}
</style>
