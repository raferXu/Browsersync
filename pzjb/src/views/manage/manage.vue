<template>
  <div class="manage">
    <h2 class="sectionTitle" style="background:#fff;">概览</h2>
    <div class="box firstRow">
        <div class="feeBox">
          <h3 class="pageTitle">费用</h3>
          <div class="mainBox">
            <div class="amountBox">
              <p class="availableAmountLabel">可用余额</p>
              <p class="availableAmount">{{available_amount}}</p>
              <p class="totalAmountBox">账户余额: {{total_amount}}</p>
            </div>
            <div class="rechargeBox tc">
              <img :src="rechargeIcon" class="rechargeIcon" alt="rechargeIcon"><br>
              <span class="mainColorBtn rechargeBtn" @click="toRecharge">充值</span>
            </div>
          </div>
        </div>
        <div class="orderBox">
          <h3 class="pageTitle">订单进度</h3>
          <ul class="orderList">
            <li class="orderItem tc" :class="{'firstItem':i==0}" v-for="(v,i) in orderList" :key="i">
              <p class="orderItemIconBox"><img class="orderItemIcon" :src="v.url" alt="icon"></p>
              <p class="orderItemLabel">{{v.label}}</p>
              <p class="orderItemVal">{{v.value}}</p>
            </li>
          </ul>
        </div>
    </div>
    <div class="box qualityBox">
       <h3 class="pageTitle bgf echartTitle">
         <span class="pb20">用量</span>
         <span class="echartBtnG">
           <i class="echartBtn pb16" :class="{'active':echartIndex==0}" @click="showOcrEchart">OCR</i>
           <i class="echartBtn pb16" :class="{'active':echartIndex==1}" @click="showZbEchart">众包</i>
         </span>
       </h3>
       <div class="echartWrap bgf">
         <component :is="componentId"></component>
       </div>
    </div>
    <div class="box projectBox">
      <h3 class="pageTitle bgf">项目</h3>
      <div class="projectList bgf">
        <my-table :tableData="tableData" :tableTitle="tableTitle"></my-table>
      </div>
    </div>
  </div>
</template>

<script>
import ocrEchart from '@/components/ocrEchart'
import zbEchart from '@/components/zbEchart'
import myTable from '@/components/myTable'
import {common} from './../../assets/js/common'
export default {
  name: '',
  data () {
    return {
        available_amount: 0,
        total_amount: 0,
        componentId: 'ocrEchart',
        echartIndex: 0,
        rechargeIcon: require('../../assets/images/余额.png'),
        orderList: [
          {
            url: require('../../assets/images/订单总数.png'),
            label: '订单总数',
            value: '20000'
          },
          {
            url: require('../../assets/images/审核中.png'),
            label: '审核中',
            value: '5000'
          },
          {
            url: require('../../assets/images/待补充.png'),
            label: '待补充',
            value: '2000'
          },
          {
            url: require('../../assets/images/待付款.png'),
            label: '待付款',
            value: '2000'
          },
          {
            url: require('../../assets/images/生效中.png'),
            label: '生效中',
            value: '8000'
          },
          {
            url: require('../../assets/images/已失效.png'),
            label: '已失效',
            value: '5000'
          }
        ],
        tableData: [],
        tableTitle: {
          "name":"模板名称",
          "project_id":"项目ID",
          "created":"创建时间",
          "type":"服务类别",
          "status":"状态" ,
          "called_num":"今日调用次数"
        }
    }
  },
  methods: {
    showOcrEchart(){
      this.echartIndex = 0;
      this.componentId = 'ocrEchart';
    },
    showZbEchart(){
      this.echartIndex = 1;
      this.componentId = 'zbEchart';
    },
    toRecharge(){
      this.$router.push('/rechargePage');
    },
    publicList_allSuc(_this,data1){
        var orderData = data1.body.order;
        for(var i=0;i<this.orderList.length;i++){
          _this.orderList[i].value = data1.body.order[_this.orderList[i]["label"]]
        }
        _this.tableData = data1.body["projects"];
    },
    paymentBalanceSuc(_this,data2){
        _this.available_amount = data2.body["available_amount"];
        _this.total_amount = data2.body["total_amount"];
        localStorage.setItem('total_amount',_this.total_amount);
        localStorage.setItem('available_amount',_this.available_amount);
    }
  },
  created () {
    var _this = this;
    common.ajax.ajaxReq(this,{
      url: common.ajax['publicList_all'],
      suc: _this.publicList_allSuc
    });

    // var _this = this;
    // this.axios.post("/token/public/list_all",{},{}).then(res=>{
    //   res = res.data;
    //   var code = res.code;
    //   console.log(res);
    //   if(code=='200'){
    //     var data1 = res;
    //     var orderData = data1.body.order;
    //     for(var i=0;i<this.orderList.length;i++){
    //       _this.orderList[i].value = data1.body.order[_this.orderList[i]["label"]]
    //     }
    //     _this.tableData = data1.body["projects"];
    //   }else{
    //     console.log('code: '+code);
    //   }
    // }).catch(function(error){
    //   console.log("/token/public/list_all error init."+error);
    // });
    
    // this.axios.post("/token/payment/balance",{},{}).then(res=>{
      
    //   var status = res.status;
    //   if(status=='200'){
    //     var data2 = res.data;
    //     if(data2.code==200){
    //       console.log('payment/balance success');
    //       _this.available_amount = data2.body["available_amount"];
    //       _this.total_amount = data2.body["total_amount"];
    //       localStorage.setItem('total_amount',_this.total_amount);
    //       localStorage.setItem('available_amount',_this.available_amount);
    //     }else{
    //       console.log('payment/balance code: '+code);
    //     }
        
    //   }else{
    //     console.log('payment/balance status: '+status);
    //   }
      
    // }).catch(function(error){
    //   console.log("/token/payment/balance error init."+error);
    // });

    common.ajax.ajaxReq(this,{
      url: common.ajax.paymentBalance,
      suc: _this.paymentBalanceSuc
    });
    
  },
  components: {
    ocrEchart,zbEchart,myTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pb16{
  padding-bottom: 16px;
}
.pb20{
  padding-bottom: 20px;
}
.manage{
  font-size: 18px;
  line-height: 1;
  color: #323232;
}
.box{
  background: #f0f0f0;
  padding: 20px 20px 0;
}
.box:last-child{
  padding-bottom: 20px;
}
.pageTitle{
  padding: 20px;
  font-size: 18px;
  color: #323232;
  border: none;
  border-bottom: 1px solid #f0f0f0;
}
.firstRow{
  display: flex;
}
.feeBox{
  width: 318px;
  margin-right: 20px;
  background: #ffffff;
}
.mainBox{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 140px;
  padding: 30px 20px;
  padding-bottom: 0;
}
.availableAmountLabel{
  color: #828282;
  font-size: 14px;
}
.availableAmount{
  padding: 20px 0;
  font-weight: bold;
  font-size: 24px;
}
.totalAmountBox{
  color: #323232;
  font-size: 14px;
}
.rechargeIcon{
  width: 40px;
  margin-bottom: 20px;
}
.orderBox{
  flex: 1;
  background: #ffffff;
}
.rechargeBtn{
  width: 80px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.orderList{
  display: flex;
  padding-top: 30px;
}
.orderItem:not(:first-child){
  flex: 1;
}
.orderItem:not(:last-child){
  border-right: 1px solid #f0f0f0;
}
.orderItemIconBox{
  width: 32px;
  height: 32px;
  margin: 0 auto;
}
.orderItemIcon{
  width: 100%;
}
.orderItemLabel{
  padding: 12px 0;
  font-size: 14px;
  color: #828282;
}
.orderItemVal{
  font-size: 20px;
  font-weight: bold;
  color: #323232;
}
.firstItem{
  width: 125px;
  padding-top: 2px;
}
.firstItem .orderItemVal{
  font-size: 24px;
}
.echartTitle{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  height: 60px;
  padding-right: 20px;
  padding-bottom: 0;
}
.echartBtn{
  box-sizing: border-box;
  border-bottom: 4px solid transparent;
}
.echartBtn:hover{
  cursor: pointer;
}
.echartBtn.active{
  border-color: #0090ff;
}
.echartBtn:not(:last-child){
  margin-right: 30px;
}
.projectList{
  max-height: 690px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
}
</style>
