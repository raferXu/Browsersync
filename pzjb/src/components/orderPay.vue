<template>
  <div class="orderPayBox">
    <div class="title">{{title}}</div>
    <div class="payWrap">
      <div class="payCon">
        <div class="balanceBox mb80">
          <h4 class="mb40">账户余额</h4>
          <p class="balanceVal">¥{{balance}}</p>
        </div>
        <div class="rechargeBox">
          <div class="rechargeStepOneBox mb80">
            <h4 class="mb40">充值方法</h4>
            <h5 class="mb40">1.汇款</h5>
            <p class="mb40">请汇款至遗下账户信息，平安接包将会于3个工作日内确认汇款信息，并将充值金额同步至您的接包账户，在转账成功后，本订单将会自动进行预扣费，同时服务生效。</p>
            <div>
              <p>
                <span class="color82">银行户名: </span>
                <span>平安科技</span>
              </p>
              <p>
                <span class="color82">银行账号: </span>
                <span>xxxxxxxxxxxxxxxx</span>
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
            <h5 class="mb40">2.填写您的汇款信息</h5>
            <div>
              <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="汇款银行">
                  <el-input v-model="form.bank"></el-input>
                </el-form-item>
                <el-form-item label="汇款帐号">
                  <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="汇款金额">
                  <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="汇款日期">
                  <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="选择日期" style="width: 100%;">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="汇款人">
                  <el-input v-model="form.remitter"></el-input>
                </el-form-item>
                <el-form-item label="汇款人手机">
                  <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="汇款凭证">
                  <div class="proofBox">
                    <div class="proofImgBox">
                      <img v-if="proofImg" :src="proofImg" alt="proofImg" class="proofImg">
                    </div>
                    <div class="proofInputBox">
                      <div class="fileNameBox">{{proofFileName}}</div>
                      <div class="fileInputBox">
                        <input class="urlBtn" type="button" value="本地上传">
                        <input ref="fileInput" class="fileUploadBtn" type="file" @change="fileUpload">
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">确认</el-button>
                  <el-button>稍后支付</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <div class="payView">
        <h4 class="mb40">预扣费</h4>
        <div class="APIfeeBox mb40">
          <h5 class="mb20">API费用</h5>
          <p>月调用费: <span>{{this.account.price}}元/次</span></p>
          <p>预计调用量: <span>{{this.account.num}}次</span></p>
          <p>预计使用时长: <span>{{this.account.month}}月</span></p>
        </div>
        <div class="sumBox mb80">
          <h4>总计: {{this.account.sum}}元 <span>(月调用费 x 预计调用量 x 预计使用时长 x 120%)</span></h4>
          <p><i>*</i> 此价格为预扣费的金额，最终花费以实际用量为准。</p>
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
      account: {

      },
      proofFileName: '',
      proofImg: '',
      title: '订单支付',
      balance: '00.00',
      form: {
        bank: '',
        account: '',
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
      }
    }
  },
  created () {
    this.account = Object.assign({},this.account,this.$route.params)
  },
  methods: {
    onSubmit() {
      var projectList = localStorage.getItem('projectList');
      console.log('projectList');
      console.log(projectList);
      console.log(projectList instanceof Array);
      var newItem = this.account.list;
      if(projectList instanceof Array){
        projectList = JSON.parse(projectList);
        var newProjectList = JSON.stringify(projectList.push(newItem))
        localStorage.setItem('projectList',newProjectList);
      }else{
        var newItemArr = JSON.stringify([].push(newItem));
        console.log('newItemArr');
        console.log(newItemArr);
        localStorage.setItem('projectList',newItemArr);
      }
      console.log('roderPay setItem projectList');
      console.log(JSON.parse(localStorage.getItem('projectList')) instanceof Array);
      var to = {name:'manageIdCardFinish',params:this.account};
      this.$router.push(to);
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
          _this.proofImg = window.URL.createObjectURL(obj);
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

.title{
  height: 90px;
  line-height: 90px;
  padding-left: 40px;
  font-size: 32px;
  color: #323232;
  border-bottom: 1px solid #f0f0f0;
}
.payWrap{
  display: flex;
}
.payCon{
  box-sizing: border-box;
  width: 1200px;
  padding: 80px 80px 160px;
  font-size: 24px;
  color: #323232;
  border-right: 1px solid #f0f0f0;
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
}
.fileNameBox{
  box-sizing: border-box;
  flex: 1;
  height: 54px;
  line-height: 54px;
  padding-left: 10px;
  border: 1px solid #aadaff;
  border-right: none;
}
.fileInputBox{
  position: relative;
  width: 130px;
  height: 54px;
  overflow: hidden;
}
.urlBtn{
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

.payView{
  padding: 80px;
}
.payView h4{
  font-size: 24px;
  color: #333333;
}
.payView h5{
  font-size: 18px;
  color: #333333;
}
.payView p{
  font-size: 14px;
  color: #828282;
  line-height: 2;
}
.payView span{
  font-size: 14px;
  color: #333333;
}
.payView i{
  color: #ff3b30;
}
</style>
