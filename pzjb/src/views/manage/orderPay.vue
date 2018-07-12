<template>
  <div class="orderPayBox" style="background:#fff;">
    <div class="modelTitle pageTitle">{{title}}</div>
    <div class="conWrap">
      <div class="payCon">
        <div class="subTitle bd1">{{title}}</div>
        <div class="payTypeBox">
          <h4 class="mb20">请选择您的支付方式: </h4>
          <div class="accountBox">
            <p class="moneyWrap">
              <Radio v-model="radio">使用账户余额</Radio>
              <span class="moneyBox">¥ {{money}}</span>
            </p>
            <p class="noEnoughBox noEnoughTips" v-if="!enough">你的余额不足，请充值！</p>
          </div>
        </div>
        <div class="payTypeBox">
          <h4 class="mb40">预扣费</h4>
          <div class="APIfeeBox">
            <h5 class="mb20">API费用</h5>
            <div class="APIConBox mb40">
              <p>月调用费: <span>{{this.account.price}}元/次</span></p>
              <p>预计调用量: <span>{{this.account.num}}次</span></p>
              <p>预计使用时长: <span>{{this.account.month}}月</span></p>
            </div>
          </div>
          <div class="sumBox">
            <h4 class="mb20">总计: {{this.account.sum}}元 <span>（月调用费 X 预计调用量 X 预计使用时长 X 120%）</span></h4>
            <p><i>*</i> 此价格为预扣费的金额，最终花费以实际用量为准。</p>
          </div>
        </div>
        <div class="payTypeBox btnGBox">
          <button class="submitBtn btn1" v-if="enough" @click="payNow">确认</button>
          <button class="submitBtn" v-else @click="toRecharge">充值</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  computed: {
  },
  data() {
    return {
      enough: true,
      radio: true,
      money: 0,
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
    console.log(localStorage.getItem('available_amount'))
    this.money = localStorage.getItem('available_amount');
    this.account = Object.assign({},this.account,this.$route.params)
    console.log('this.account');
    console.log(this.account);

    this.axios.post("/token/project/check_balance",this.account.json,{
        // headers: {
        //   token: "rafer"
        // }
      }).then(res=>{
        console.log(res)
        res = res.data;
        if(res.code=='301'){
          this.enough = false;
        }
        
      }).catch(function(error){
        console.log("/token/project/check_balance error init."+error);
      })
    
  },
  methods: {
    toRecharge(){
      this.$router.push('/rechargePage');
    },
    toPay(){

    },
    payNow(){
      console.log('点击确认付款');
      console.log(this.account.json);
      //发送请求
      /*
      setTimeout(() => {
        this.$router.push({name:'manageIdCardFinish',params:this.account});
      }, 1000);
      */
     this.axios.post("/token/project/start",this.account.json,{
        // headers: {
        //   token: "rafer"
        // }
      }).then(res=>{
        console.log(res)
        res = res.data;
        var code = res.code;
        if(code=='200'){
          var type = res.body.type;
          var template = {templateId: res.body.template_id};
          console.log('type');
          console.log(type);
          if(type==1){
            this.$router.push({path: '/manageIdCardFinish',query: template})
          }else{
            
          }
        }
        
      }).catch(function(error){
        console.log("/token/project/start error init."+error);
      })
      
    },
    onSubmit() {
      var projectList = localStorage.getItem('projectList');
      var newItem = this.account.list;
      if(projectList instanceof Array){
        projectList = JSON.parse(projectList);
        var newProjectList = JSON.stringify(projectList.push(newItem))
        localStorage.setItem('projectList',newProjectList);
      }else{
        var newItemArr = JSON.stringify([].push(newItem));
        localStorage.setItem('projectList',newItemArr);
      }
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
.btn1{
  width: 130px;
  height: 54px;
  font-size:20px;
  line-height: 54px;
  padding: 0;
  text-align: center;
  margin: 0;
}
.color82{
  color: #828282;
}

.title{
  height: 90px;
  line-height: 90px;
  padding-left: 40px;
  font-size: 32px;
  color: #323232;
  border-bottom: 1px solid #f0f0f0;
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
  font-size: 20px;
  color: #323232;
}
.payTypeBox{
  padding: 30px 60px 30px 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.payTypeBox h4{
  font-size: 14px;
  color: #828282;
}
.bd1{
  border-bottom: 1px solid #f0f0f0;
}
.balanceVal{
  font-size: 24px;
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
.noEnoughBox{
  width: 165px;
  height: 36px;
}
.noEnoughTips{
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  color: #ff3b30;
  border: 1px solid #ff3b30;
  background: #ffebea;
}
.moneyWrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.moneyBox{
  font-size: 24px;
  color: #323232;
}
.pageTitle{
  font-size: 20px;
  height: 90px;
  padding:0 0 0 40px;
  line-height: 90px;
}
.btnGBox{
  display: flex;
  justify-content: flex-end;
}
.APIConBox{
  display: flex;
  justify-content: space-between;
  color: #828282;
}
.APIConBox span{
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
.submitBtn{
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
.orderPayBox .ivu-radio-wrapper{
  font-size: 14px;
}
</style>
