<template>
  <div class="orderPayBox">
    <div class="modelTitle pageTitle">{{title}}</div>
    <div class="conWrap">
      <div class="payCon">
        <div class="subTitle">{{title}}</div>
        <div class="balanceBox">
          <h4 class="mb20">账户余额</h4>
          <p class="balanceVal">¥ {{balance}}</p>
        </div>
        <div class="rechargeBox">
          <div class="rechargeStepOneBox">
            <h4 class="mb20">充值方法</h4>
            <p class="mb40 lh20">1.汇款: 请汇款至以下账户信息，平安接包平台将会于3个工作日内确认汇款信息，并将充值金额同步至您的账户。在转账成功后，本订单将自动进行预扣费，同时服务生效。</p>
            <div class="accountExample">
              <p>
                <span class="color82">银行户名: </span>
                <span>平安科技</span>
              </p>
              <p>
                <span class="color82">银行账号: </span>
                <span>20981000299904</span>
              </p>
              <p class="pd80">
                <span class="color82">开户银行: </span>
                <span>平安银行</span>
              </p>
              <p class="pd80">
                <span class="color82">转账附言: </span>
                <span>请填写您的用户名</span>
              </p>
            </div>
          </div>
          <div class="rechargeStepTwoBox">
            <h5 class="stepTitle">2.填写您的汇款信息</h5>
            <div>
              <Form ref="form" :model="recharge" :label-width="96" label-position="left">
                <FormItem label="汇款银行">
                  <Input v-model="recharge.remittance_bank"></Input>
                </FormItem>
                <FormItem label="汇款帐号">
                  <Input v-model="recharge.remittance_account"></Input>
                </FormItem>
                <FormItem label="汇款金额">
                  <Input v-model="recharge.remittance_amount"></Input>
                </FormItem>
                <FormItem label="汇款日期">
                  <DatePicker
                    v-model="recharge.remittance_date"
                    type="date"
                    placeholder="选择日期" style="width: 100%;">
                  </DatePicker>
                </FormItem>
                <FormItem label="汇款人">
                  <Input v-model="recharge.remitter"></Input>
                </FormItem>
                <FormItem label="汇款人手机">
                  <Input v-model="recharge.remitter_phone_number"></Input>
                </FormItem>
                <FormItem label="汇款凭证" class="proofItem">
                  <div class="proofBox">
                    <div class="proofImgBox">
                      <img v-if="recharge.remittance_pic" :src="recharge.remittance_pic" alt="proofImg" class="proofImg">
                    </div>
                    <div class="proofInputBox">
                      <div class="fileNameBox">{{recharge.remittance_pic}}</div>
                      <div class="fileInputBox">
                        <input class="urlBtn" type="button" value="本地上传">
                        <input accept="image/jpg,image/jpeg,image/png,application/pdf" ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
                      </div>
                    </div>
                    <div class="proofInfoBox">
                      提示: 请上传大小不超过3MB的JPG/PNG/PDF格式的单据
                    </div>
                  </div>
                </FormItem>
              </Form>
              <div class="btnG rlt">
                <button class="submitBtn" @click="onSubmit">确认充值</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {common} from './../../assets/js/common'
export default {
  name: '',
  data() {
    return {
      proofFileName: '',
      proofImg: '',
      title: '账户充值',
      balance: '00.00',
      form: {
        bank: '',
        account: 0,
        money: '',
        date: '',
        remitter: '',
        tel: '',
        proof: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      recharge: {
        payment_method: 1,
        remittance_bank: '',
        remittance_account: 0,
        remittance_amount: 0,
        remittance_date: '',
        remitter: '',
        remitter_phone_number: '',
        remittance_pic: ''
      }
    }
  },
  created(){
    
    common.ajax.ajaxReq(this,{
      url: common.ajax.paymentBalance,
      suc: function(that,res){
        that.balance = res.body["total_amount"];
        localStorage.setItem('total_amount',that.balance);
      }
    });
    // var _this = this;
    // this.axios.post("/token/payment/balance",{},{}).then(res=>{
    //   var data2 = res.data;
    //   _this.balance = data2.body["total_amount"];
    //   localStorage.setItem('total_amount',_this.balance);
    // }).catch(function(error){
    //   console.log("/token/payment/balance error init."+error);
    // });
  },
  methods: {
    finishFlag(){
      for(var key in this.recharge){
        if(key!='payment_method'){
          if(!this.recharge[key]){
            return false;
          }
        }
      }
      return true;
    },
    returnPage(){
      this.$router.go(-1);
    },
    onSubmit() {
      console.log('submit!');
      console.log(this.finishFlag());
      this.recharge.remittance_amount = parseFloat(this.recharge.remittance_amount);
      if(!this.finishFlag()){
        alert('请填写所有信息');
        return;
      }
      this.axios.post("/token/payment/recharge",this.recharge,{}).then(res=>{
        console.log(res)
        res = res.data;
        var code = res.code;
        if(code=='200'){
          this.$router.push('/manageIndex');
        }
      }).catch(function(error){
        console.log("/token/payment/recharge error init."+error);
      })
    },
    fileUpload(e){
      this.imgIndex = -1;
      var _this = this;
      console.log(this.$refs.fileInput.files[0])
      var obj = this.$refs.fileInput.files[0];
      _this.proofFileName = obj.name;
      var reader = new FileReader();
      var imgFile;
      reader.onload=function(e) {
          imgFile = e.target.result;
          _this.recharge.remittance_pic = window.URL.createObjectURL(obj);
      };
      //正式读取文件
      reader.readAsArrayBuffer(this.$refs.fileInput.files[0]);
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color82{
  color: #828282;
}
.mb80{
  margin-bottom: 80px;
}
.mb40{
  margin-bottom: 40px;
}
.mb20{
  margin-bottom: 20px;
}
.lh20{
  line-height: 20px;
}
.fs24{
  font-size: 24px;
}
.rlt{
  position: relative;
}
.title{
  padding: 40px;
  border-bottom: 1px solid #f0f0f0;
}
.orderPayBox{
  background: #ffffff;
  line-height: 1;
}
.rechargeBox{
  padding-left: 20px;
}
.rechargeStepOneBox, .stepTitle{
  font-size: 14px;
  color: #323232;
}
.rechargeStepOneBox{
  padding-right: 60px;
}
.stepTitle{
  font-weight: normal;
  margin-bottom: 20px;
}
.accountExample{
  overflow: hidden;
}
.accountExample p{
  float: left;
  width: 50%;
  padding-bottom: 40px;
}
.conWrap{
  padding: 20px;
  background: #f0f0f0;
}
.payCon{
  min-width: 930px;
  font-size: 14px;
  color: #323232;
  background: #fff;
}
.subTitle{
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  border: 1px solid #f0f0f0;
  font-size: 20px;
  color: #323232;
}
.balanceBox{
  padding: 20px;
  padding-bottom: 40px;
  color: #828282;
}
.balanceVal{
  font-size: 24px;
  color: #323232;
  font-weight: bold;
}
.proofImgBox{
  width: 100%;
  min-height: 132px;
  background: #f0f0f0;
  margin-bottom: 20px;
}
.proofImg{
  width: 100%;
}
.proofInputBox{
  display: flex;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #aadaff;
}
.fileNameBox{
  box-sizing: border-box;
  flex: 1;
  height: 36px;
  line-height: 36px;
  padding-left: 10px;
  border-right: none;
}
.fileInputBox{
  position: relative;
  width: 80px;
  height: 36px;
  overflow: hidden;
  background: #0090ff;
}
.urlBtn{
  position: absolute;
  width: 80px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  background: #0090ff;
}
.fileUploadBtn{
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 36px;
  opacity: 0;
}
.proofInfoBox{
  line-height: 1;
  padding-top: 20px;
  font-size: 14px;
  color: #828282;
}
.btnG{
  min-width: 930px;
  height: 100px;
  border-top: 1px solid #f0f0f0;
}
.submitBtn{
  position: absolute;
  top: 30px;
  right: 60px;
  width: 130px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  background: #0090ff;
}

</style>
<style>
.orderPayBox .proofItem .ivu-form-item-content{
  height: auto;
}
.orderPayBox .ivu-form-item{
  margin-bottom: 30px;
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
</style>
