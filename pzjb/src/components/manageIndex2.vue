<template>
  <div class="manageIssueBox">
     <h4 class="sectionTitle">概览</h4>
     <div class="elWrap">
       <el-row :gutter="50" class="box one-box">
        <el-col :span="10">
          <el-container class="moneyBox">
            <el-aside class="moneySide">
              <img class="moneyIcon" :src="moneySrc" alt="moneySrc">
            </el-aside>
            <el-main class="moneyMain">
              <p>可用余额: <span class="money bgSize">¥{{money}}</span></p>
              <p class="money2Box">账户余额: <span class="money2">¥{{money2}}</span></p>
              <p class="rechargeBox"><el-button class="rechargeBtn" @click="rechargePage">充值</el-button></p>
            </el-main>
          </el-container>
          <el-container class="orderBox">
            <el-aside class="orderSide">
              <img class="orderIcon" :src="orderSrc" alt="orderSrc">
            </el-aside>
            <el-main>
              <p>订单总数:<span class="valueBox orderNum">{{totalOrder}}</span></p>
              <div class="orderWrap">
                <p>审核中:<span class="valueBox">{{order['审核中']}}</span></p>
                <p>待补充:<span class="valueBox">{{order['待补充']}}</span></p>
                <p>待付款:<span class="valueBox">{{order['待付款']}}</span></p>
                <p>到账中:<span class="valueBox">{{order['到账中']}}</span></p>
                <p>生效中:<span class="valueBox">{{order['生效中']}}</span></p>
                <p>已失效:<span class="valueBox">{{order['已失效']}}</span></p>
              </div>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="14" class="ocrBox">
          <h4 class="title">
            <div class="leftTxt">OCR接口用量</div>
            <div class="rightBox">
              <p>今日用量: <span>0</span></p>
              <p>累计用量: <span>0</span></p>
            </div>
          </h4>
          <div>
            <el-row>
              <el-col :span="24">
                <line-chart :chartData="lineData" :height="lineChartHeight"></line-chart>
              </el-col>
            </el-row>
            <p class="tc">接口用量数据于整点更新</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="50" class="barChartBox">
          <el-col :span="24">
            <h4 class="title">
              <div class="leftTxt">众包用量</div>
              <div class="rightBox">
                <p>今日调用: <span>0</span></p>
                <p>今日回收: <span>0</span></p>
                <p>累计调用: <span>0</span></p>
                <p>累计回收: <span>0</span></p>
              </div>
            </h4>
            <div v-if="barChartFlag">      
              <el-row>
                <el-col :span="24">
                  <bar-chart :chartData="barData" :height="barChartHeight"></bar-chart>
                </el-col>
              </el-row>
              <p class="tc">各项目回收率(数据于整点更新)</p>
            </div>
          </el-col>
      </el-row>
      <el-row class="box projectTableWrap">
          <el-row>
            <el-col :span="12">
              <h4 class="title">订单</h4>
            </el-col>
            <el-col :span="12" class="newBtnWrap">
              <el-button size="small" @click="newProject">新建</el-button>
            </el-col>
          </el-row>
          <el-table  @cell-click="runto" 
            :data="projectTableData"
            stripe
            style="width: 100%;text-align: center;">
            <el-table-column align="center"
              prop="name"
              label="模板名称">
            </el-table-column>
            <el-table-column align="center"
              prop="id"
              label="项目ID">
            </el-table-column>
            <el-table-column align="center"
              prop="created"
              label="创建时间">
            </el-table-column>
            <el-table-column align="center"
              prop="type"
              label="服务类别">
            </el-table-column>
            <el-table-column align="center"
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column align="center"
              prop="called_num"
              label="今日调用次数">
            </el-table-column>
          </el-table>
      </el-row>
      <el-dialog title="新建项目" :visible.sync="newProjectVisible" class="" >
        <el-row>
          <el-col :span="8"><p>需求类型</p></el-col>
          <el-col :span="16">
            <el-radio v-model="demandRadio" label="1">众包</el-radio>
            <el-radio v-model="demandRadio" label="2">自定义OCR模板</el-radio>
            <el-row style="padding-top:40px;">
              <el-button>确定</el-button>
            </el-row>     
          </el-col>
        </el-row>
      </el-dialog>
     </div>
  </div>
</template>

<script>

import lineChart from './sub/lineChart.vue'
import barChart from './sub/barChart.vue'

export default {
  name: '',
  data () {
    return {
      barChartFlag: false,
      money: 0,
      money2: 0,
      moneySrc: require('../assets/images/manage/余额.png'),
      orderSrc: require('../assets/images/manage/订单.png'),
      order: {
        "生效中": 0,
        "到账中": 0,
        "待付款": 0,
        "待补充": 0,
        "已失效": 0,
        "审核中": 0
      },
      totalOrder: 0,
      newProjectVisible: false,
      demandRadio: '1',
      lineData: {
        seriesData: [
          {
            name:'用量',
            data: [0, 0, 0, 0, 0, 0, 0], 
            type: 'line',
            itemStyle: {
              normal: {
                color: '#0090ff'
              }
            } 
          }
        ], 
        legendData:['用量'],
        xData:['4月26日', '4月27日', '4月28日', '4月29日', '4月30日', '5月1日', '5月2日'],
        title: ''
      },
      lineChartHeight: '220px',
      barData: {
        seriesData: [
          { 
            name:'回收率',
            type:'bar',
            barWidth: '30%',
            data:[90, 70, 80, 97], 
            itemStyle: {
              normal: {
                color: '#0090ff',
                label: {
                  show: true,
                  position: 'inside',
                  formatter:'{c}%'
                }
              }
            }
          }
        ],
        legendData:['回收率'],
        xData:['众包1', '众包2', '众包3', '众包4'],
        title: ''
      },
      barChartHeight: '220px',
      projectTableTitle: [
        {
          label: "模板名称", 
          value: "name"
        },
        {
          label: "项目ID", 
          value: "id"
        },
        {
          label: "创建时间", 
          value: "date"
        },
        {
          label: "状态", 
          value: "state"
        },
        {
          label: "今日调用次数", 
          value: "today"
        }
      ],
      projectTableData: [
          // {name: "行驶证", id: "13256763", date:"2018/03/06", type: "调用", state:"生效中",today:"200"},
          // {name: "我的自定义模板", id: "23457321", date:"2018/03/06", type: "调用", state:"生效中",today:"200"},
          // {name: "众包1", id: "12345612", date:"2018/03/02", type: "调用", state:"生效中",today:"500"},
          // {name: "众包2", id: "12345613", date:"2018/03/01", type: "调用", state:"生效中",today:"500"},
          // {name: "众包3", id: "12345614", date:"2018/03/02", type: "调用", state:"生效中",today:"500"},
          // {name: "众包4", id: "12345615", created:"2018/03/01", type: "调用", status:"生效中",called_num:"500"}
      ]
    }
  },
  methods: {
    get: function (url,params,headers) {
      axios.get(url,{
        params: params,
        headers: headers
      }).then(res=>{
        this.msg = res.data;
      }).catch(function(error){
        console.log("error init."+error);
      })
    },
    post: function (url,params,headers) {
      axios.post(url,params,{
        headers: headers
      }).then(res=>{
        this.msg = res.data;
      }).catch(function(error){
        console.log("error init."+error);
      })
    },
    newProject() {
      this.newProjectVisible = true
    },
    rechargePage(){
      this.$router.push('/rechargePage')
    },
    runto(row, column, cell, event){
      var text = event.target.innerText;
      if(text=='身份证'){
        console.log('身份证');
        this.$router.push('/manageDrivingCardFinish');
      }else if(/自定义/.test(text)){
        console.log('我的自定义模板');
        this.$router.push('/manageCustomDevFinish');
      }else if(/众包/.test(text)){
        console.log('我的众包模板'+text.split('众包')[1]);
        var index = parseInt(text.split('众包')[1])+1;
        this.$router.push({path: '/manageZBmodelFinish', query: {obj: this.projectTableData[index]}});
      }
    }
  },
  created () {
    // localStorage.removeItem('projectList');
    /*
    var projectList = JSON.parse(localStorage.getItem('projectList'));
    if(projectList){
      console.log('index projectList');
      console.log(projectList instanceof Array);
      console.log(projectList);
      this.projectTableData.concat(projectList);
      console.log(this.projectTableData)
    }
    */
    console.log(this.GLOBAL.BASE_URL);
    setTimeout(() => {
      var res = {
          "body": {
              "order": {
                  "生效中": 2,
                  "到账中": 0,
                  "待付款": 0,
                  "待补充": 0,
                  "已失效": 0,
                  "审核中": 1
              },
              "projects": [
                  {
                      "status": "生效中",
                      "name": "身份证",
                      "created": "2018-04-26 19:07:49.901204",
                      "type": "调用",
                      "called_num": 0,
                      "id": 16
                  },
                  {
                      "status": "审核中",
                      "name": "用户1的自定义模版1",
                      "created": "2018-04-26 19:09:02.639236",
                      "type": "开发",
                      "called_num": 0,
                      "id": null
                  },
                  {
                      "status": "生效中",
                      "name": "用户1的自定义模版2",
                      "created": "2018-04-26 19:09:44.773617",
                      "type": "调用",
                      "called_num": 0,
                      "id": 17
                  }
              ]
          },
          "message": "operate successfully",
          "code": 200
      };
      this.projectTableData = this.projectTableData.concat(res['body']['projects']);
      this.order = res['body']['order'];
    }, 1000);
  },
  mounted () {
    
  },
  components: { lineChart, barChart }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tc{
  text-align: center;
}
 .manageIssueBox{
    font-size:24px;
    color: #323232;
    background: #f0f0f0;
 }
 .sectionTitle{
   padding: 25px;
   padding-left: 40px;
   font-size: 20px;
   background: #ffffff;
 }
 .elWrap{
   padding: 40px;
 }
.orderBox, .moneyBox{
  height: 270px;
  background: #ffffff;
}
.moneyBox{
  margin-bottom: 40px;
}
.moneySide, .orderSide{
  width: 20% !important;
  height: 100%;
  padding-top: 105px;
}
.moneySide{
  text-align: center;
  background: #ffba00;
}
.orderSide{
  text-align: center;
  background: #68c800;
}
.moneyMain{
  padding: 40px;
}
.money, .money2{
  padding-left: 10px;
}
.moneyIcon, .orderIcon{
  width: 60px;
}
.bgSize{
  font-size: 36px;
}
.money2Box{
  padding: 20px 0;
}
.rechargeBtn{
  padding: 10px 20px;
  color: #0090ff;
  border-color: #0090ff;
}
.orderWrap p{
  float: left;
  width: 200px;
  padding-top: 15px;
}
.valueBox{
  padding-left: 10px;
}
.orderNum{
  font-size: 36px;
  color: #323232;
}
.ocrBox{
  height: 580px;
  background: #ffffff;
}
.one-box{
  margin-right: 0!important;
}
.title{
  display: flex;
  justify-content: space-between;
  padding: 40px;
  border-bottom: 1px solid #f0f0f0;
}
.leftTxt{
  position: relative;
  top: 15px;
}
.rightBox{
  display: flex;
}
.rightBox p:not(:last-child){
  margin-right: 80px;
}
.rightBox span{
  padding-left: 10px;
  font-size: 36px;
}
.barChartBox{
  padding-bottom: 40px;
  margin: 40px 0 0!important;
  background: #ffffff;
}
.projectTableWrap{
  margin-top: 40px;
  background: #ffffff;
}
.newBtnWrap{
  padding: .4rem;
  text-align: right;
  border-bottom: 1px solid #f0f0f0;
}
</style>
