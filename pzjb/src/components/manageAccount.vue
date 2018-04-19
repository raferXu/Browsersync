<template>
  <div class="manageAccountBox">
    <el-row class="chart-wrapper">
      <el-col :span="12" class="balance-box">
        <el-row>
          <el-col :span="18"><p style="font-size:16px;line-height:40px;">账户余额：</p></el-col>
          <el-col :span="6"><el-button @click="recharge">充值</el-button></el-col>
        </el-row>
        <el-row>
            <p><span style="font-size:30px;">xxxxxxx</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>元</span></p>
        </el-row>
        <el-row>
          <el-col :span="18"><p style="color:rgba(255,255,255,0)">元</p></el-col>
          <el-col :span="6"><el-button  style="border:none;" @click="rechargeList">充值记录</el-button></el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="Total-cost"></el-col>
    </el-row>
    <el-row class="chart-wrapper">
      <el-col :span="24">
         <p class="title">总费用</p>
         <el-row  style="padding-left:10%">
           <el-col :span="9" ><span style="font-size:14px;line-height:40px;">总花费： xxxx元</span></el-col>
           <el-col :span="15">
             <el-radio v-model="radio" label="1">今日</el-radio>
             <el-radio v-model="radio" label="2">本月</el-radio>
             <el-radio v-model="radio" label="3">自定义</el-radio>
              <el-date-picker
                v-model="value6"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="margin-left:20px;"
                >
              </el-date-picker>
           </el-col>
         </el-row>
         <div id="main" style="width: 100%;height:300px;"> </div>
      </el-col>
    </el-row>
    <el-row class="chart-wrapper">
      <el-col :span="24">
        <p class="title">消费账单</p>
        <el-row class="consume-table">
          <el-table :data="consumeTableData" style="width: 100%">
            <el-table-column prop="date" label="日期" v-for="(tab,i) in consumeTableTitle"  :key="i" :prop="tab.value" :label="tab.label">
            </el-table-column>
            <el-table-column fixed="right" label="操作"  width="210">
              <template slot-scope="scope">
                <el-button icon="el-icon-download" style="border:none;font-size:20px;"></el-button>        
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination consume-page">
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>      
    </el-row>
    <el-dialog title="充值记录" :visible.sync="rechargeVisible" class="recharge" >
        <el-table :data="rechargeTableData" style="width: 100%">
            <el-table-column prop="date" label="日期" v-for="(tab,i) in rechargeTableTitle"  :key="i" :prop="tab.value" :label="tab.label">
            </el-table-column>
          </el-table>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data() {
      return {
        chart: null,
        rechargeVisible: false,
        radio: '1',
        value6: '',
        consumeTableTitle: [{label: "项目名称", value: "name"},
          {label: "项目ID", value: "id"},
          {label: "累计金额", value: "amount"}],
        rechargeTableTitle: [{label: "日期", value: "date"},
          {label: "金额", value: "money"},
          {label: "方式", value: "mode"}],
        consumeTableData: [{name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"}],
       rechargeTableData: [{date: "xxxx年xx月xx日", money: "xxxxxx.xx", mode:"线下转账"},
          {date: "xxxx年xx月xx日", money: "xxxxxx.xx", mode:"线下转账"},
          {date: "xxxx年xx月xx日", money: "xxxxxx.xx", mode:"线下转账"},
        ]

      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      setOptions() {
        var self = this
        this.chart.setOption({
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['OCR API','众包'],
              bottom: '0'
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              name:'众包',
              data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
              type: 'line'
          },
          {
              name:'OCR API',
              data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
              type: 'line'
          }]
        }, false)
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('main'))
        this.setOptions()
      },
      rechargeList() {
        this.rechargeVisible = true
      },
      recharge(){
        this.$router.push('/rechargePage')
      }
    }

}
</script>
<style scoped>
.manageAccountBox{
  padding: 0px 20px;
  background-color: rgb(240, 242, 245);
  color:#333;
}
.manageAccountBox .chart-wrapper{
  background-color: #fff;
  margin-bottom:10px;
}
.balance-box{
  /* height:180px; */
  border-right:1px solid #999; 
}
.balance-box>.el-row:first-child{
  padding:25px 10px 20px 25px;  
}
.balance-box>.el-row:nth-child(2){
  padding-left:20%; 
  margin-bottom:10px; 
}
.title{
  border-bottom:1px solid #c9c9c9;
  font-size:14px;
  color:#333;
  line-height:40px;
  padding-left:10px;
}
.consume-table{
  width:96%;
  margin:8px auto;
  border:1px solid #555;
}
.consume-page{
  float:right;
}
.el-radio__label{
  font-size: 12px !important;
}
</style>
