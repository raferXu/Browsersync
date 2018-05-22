<template>
  <div class="orderPayBox">
    <div class="modelTitle pageTitle">{{title}}</div>
    <div class="payCon">
      <div class="balanceBox mb80">
        <h4 class="mb40">账户余额</h4>
        <p class="balanceVal">¥ {{balance}}</p>
      </div>
      <div class="rechargeBox">
        <div class="rechargeStepOneBox mb80">
          <h4 class="mb40">充值方法</h4>
          <h5 class="mb40 fs24">1.汇款</h5>
          <p class="mb40">请汇款至以下账户信息，平安接包平台将会于3个工作日内确认汇款信息，并将充值金额同步至您的账户。</p>
          <div>
            <p>
              <span class="color82">银行户名: </span>
              <span>平安科技</span>
            </p>
            <p>
              <span class="color82">银行账号: </span>
              <span>20981000299904</span>
            </p>
            <p>
              <span class="color82">开户银行: </span>
              <span>平安银行</span>
            </p>
            <p>
              <span class="color82">转账附言: </span>
              <span>请填写您的用户名</span>
            </p>
          </div>
        </div>
        <div class="rechargeStepTwoBox">
          <h5 class="mb40 fs24">2.填写您的汇款信息</h5>
          <div>
            <el-form ref="form" :model="recharge" label-width="120px">
              <el-form-item label="汇款银行">
                <el-input v-model="recharge.remittance_bank"></el-input>
              </el-form-item>
              <el-form-item label="汇款帐号">
                <el-input v-model="recharge.remittance_account"></el-input>
              </el-form-item>
              <el-form-item label="汇款金额">
                <el-input v-model="recharge.remittance_amount"></el-input>
              </el-form-item>
              <el-form-item label="汇款日期">
                <!-- <el-input v-model="form.date"></el-input> -->
                <el-date-picker
                  v-model="recharge.remittance_date"
                  type="date"
                  placeholder="选择日期" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="汇款人">
                <el-input v-model="recharge.remitter"></el-input>
              </el-form-item>
              <el-form-item label="汇款人手机">
                <el-input v-model="recharge.remitter_phone_number"></el-input>
              </el-form-item>
              <el-form-item label="汇款凭证">
                <div class="proofBox">
                  <div class="proofImgBox">
                    <img v-if="recharge.remittance_pic" :src="recharge.remittance_pic" alt="proofImg" class="proofImg">
                  </div>
                  <div class="proofInputBox">
                    <div class="fileNameBox">{{recharge.remittance_pic}}</div>
                    <div class="fileInputBox">
                      <input class="urlBtn" type="button" value="本地上传">
                      <input ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
                    </div>
                  </div>
                  <div class="proofInfoBox">
                    提示: 请上传大小不超过3MB的JPG/PNG/PDF格式的单据
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确认充值</el-button>
                <!-- <el-button @click="returnPage">返回</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
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
  computed: {
    
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
      this.axios.post("/token/payment/recharge",this.recharge,{
        // headers: {
        //   token: "rafer"
        // }
      }).then(res=>{
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
.fs24{
  font-size: 24px;
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
  line-height: 1.6;
}
.payCon{
  width: 1200px;
  padding: 80px 80px 160px;
  font-size: 24px;
  color: #323232;
}
.balanceVal{
  font-size: 48px;
  color: #323232;
  font-weight: bold;
}
.proofImgBox{
  width: 100%;
  min-height: 400px;
  background: #f0f0f0;
  margin-bottom: 40px;
}
.proofImg{
  width: 100%;
}
.proofInputBox{
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #aadaff;
}
.fileNameBox{
  box-sizing: border-box;
  flex: 1;
  height: 54px;
  line-height: 54px;
  padding-left: 10px;
  /* border: 1px solid #aadaff; */
  border-right: none;
}
.fileInputBox{
  position: relative;
  width: 130px;
  height: 54px;
  overflow: hidden;
  background: #0090ff;
}
.urlBtn{
  position: relative;
  top: -2px;
  width: 130px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  background: #0090ff;
}
.fileUploadBtn{
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 54px;
  opacity: 0;
}
.proofInfoBox{
  padding-top: 20px;
  font-size: 14px;
  color: #828282;
}
</style>
