<template>
  <div class="manageAccountBox">
    <h4 class="sectionTitle">概览</h4>
    <el-row class="chart-wrapper">
      <el-col :span="8" class="balance-box">
        <el-row class="balanceRow">
          <el-col :span="18"><p class="modelTitle">可用余额</p></el-col>
          <el-col :span="6"><el-button class="balanceBtn modelTitle" type="text" @click="rechargeList">充值纪录</el-button></el-col>
        </el-row>
        <el-row class="balanceRow">
            <p class="modelBiggerText">¥ {{money}}</p>
        </el-row>
        <el-row class="balanceRow modelTitle">
          <el-col :span="18">账户余额: ¥{{money2}}</el-col>
          <el-col :span="6"><el-button class="balanceBtn modelNormalBtn" type="primary" plain @click="recharge">充值</el-button></el-col>
        </el-row>
      </el-col>
      <el-col :span="16" class="Total-cost"></el-col>
    </el-row>
    <el-row class="chart-wrapper">
      <el-col class="zbUseBox" :span="24">
         <p class="chartTitle modelTitle">众包用量</p>
         <el-row class="chartBox">
           <el-col class="modelTitle">总花费: <span class="modelBigText">2000</span>元</el-col>
           <el-col class="tr">
             <el-radio v-model="radio" label="1">近一年</el-radio>
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
         <div id="main" style="width:100%;height:300px;"></div>
      </el-col>
    </el-row>
    <el-row class="chart-wrapper">
      <el-col :span="24">
        <p class="chartTitle modelTitle">消费账单</p>
        <el-row class="box projectTableWrap">
          <el-table :header-row-class-name="tableHeaderRowClass" 
            :data="consumeTableData"
            stripe
            style="width: 100%;">
            <el-table-column align="center" v-for="(tab,i) in consumeTableTitle"  :key="i" :prop="tab.value" :label="tab.label">
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button icon="el-icon-download" style="border:none;font-size:20px;background:transparent;"></el-button>        
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <!-- <div class="pagination consume-page">
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div> -->
      </el-col>      
    </el-row>
    <el-dialog title="充值记录" :visible.sync="rechargeVisible" class="recharge" >
        <el-table :data="rechargeTableData" style="width: 100%">
            <el-table-column v-for="(tab,i) in rechargeTableTitle"  :key="i" :prop="tab.value" :label="tab.label">
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
        money2: '00.00',
        money: '00.00',
        chart: null,
        rechargeVisible: false,
        radio: '1',
        value6: '',
        consumeTableTitle: [
          {label: "项目名称", value: "name"},
          {label: "项目ID", value: "id"},
          {label: "累计金额", value: "amount"}
        ],
        rechargeTableTitle: [
          {label: "日期", value: "date"},
          {label: "金额", value: "money"},
          {label: "方式", value: "mode"},
          {label: "状态", value: "status"}
        ],
        consumeTableData: [
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"},
          {name: "我的项目1", id: "xxxxxxxx", amount:"xxxx.xx"}],
       rechargeTableData: [
          {date: "xxxx年xx月xx日", money: "xxxxxx.xx", mode:"线下转账", status:"待确认"},
          {date: "xxxx年xx月xx日", money: "xxxxxx.xx", mode:"线下转账", status:"已到账"},
          {date: "xxxx年xx月xx日", money: "xxxxxx.xx", mode:"线下转账", status:"待确认"},
        ]

      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      tableHeaderRowClass({row, rowIndex}){
        return 'header-row';
      },
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
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#68c800'
                }
              }
          },
          {
              name:'OCR API',
              data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#ffba00'
                }
              }
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
.tr{
  text-align: right;
}
.modelTitle{
  font-size: 24px;
}
.modelSubTitle{
  font-size: 28px;
}
.modelNormalText{
  font-size: 18px;
}
.modelBiggerText{
  font-size: 48px;
}
.modelBigText{
  font-size: 36px;
}
.modelNormalBtn{
  font-size: 20px;
}
 .sectionTitle{
   padding: 25px;
   padding-left: 40px;
   font-size: 20px;
   background: #ffffff;
 }
.manageAccountBox{
  padding-bottom: 40px;
  background-color: #f0f0f0;
  color:#333;
}
.manageAccountBox .chart-wrapper{
  background-color: #fff;
  margin: 40px 40px 0;
}
.balance-box{
  box-sizing: border-box;
  height:342px;
  padding: 40px;
  border-right: 40px solid #f0f0f0; 
}
.balanceBtn{
  width: 120px;
  text-align: center;
}
.balanceRow{
  display: flex;
  align-items: center;
  line-height: 1;
}
.balanceRow:not(:last-child){
  padding-bottom: 45px;
}
.chartTitle{
  padding: 40px;
  border-bottom: 1px solid #f0f0f0;
}
.chartBox{
  display: flex;
  justify-content: space-between;
  padding: 40px;
}
.zbUseBox{
  padding-bottom: 40px;
}
.title{
  display: flex;
  justify-content: space-between;
  padding: 40px;
  border-bottom: 1px solid #f0f0f0;
}


</style>
<style>
.el-table .header-row {
    border-collapse: collapse!important;
}
</style>

