<template>
  <div class="manageIssueBox">
     <el-row :gutter="50" class="box one-box">
        <el-col :span="8">
          <h4 class="title">订单</h4>
          <el-container>
            <el-aside width="30%" style="border-right:1px solid #797979;">
              <p>订单总数</p>
              <p style="font-size:22px;padding-top:30px;text-align:center;">200</p>
            </el-aside>
            <el-main>
              <p>审核中&nbsp;&nbsp;<span>50</span></p>
              <p>待补充&nbsp;&nbsp;<span>20</span></p>
              <p>待付款&nbsp;&nbsp;<span>20</span></p>
              <p>生效中&nbsp;&nbsp;<span>80</span></p>
              <p>已失效&nbsp;&nbsp;<span>50</span></p>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="16">
          <h4 class="title">ocr接口用量</h4>
          <div style="border:1px solid #797979;">
            <el-row style="border-bottom:1px solid #797979;padding-left:5px;">
              <el-col :span="12">今日用量 200</el-col>
              <el-col :span="12">累计用量 200</el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><line-chart :chartData="lineData" :height="lineChartHeight"></line-chart></el-col>
            </el-row>
            <p>*接口用量数据于整点更新</p>
          </div>
        </el-col>
     </el-row>
     <el-row :gutter="50" class="box">
        <el-col :span="8">
          <h4 class="title">费用</h4>
          <el-container style="border:1px solid #797979;">
            <el-aside width="0%">
            </el-aside>
            <el-main style="padding:10px 0 0 15px;">
              <p>账户余额</p>
              <p style="font-size:26px;margin-top:40px;margin-left:5%;">￥3000</p>
              <p style="text-align:right;margin:40px 20px 43px 0;"><el-button @click="rechargePage">充值</el-button></p>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="16">
          <h4 class="title">众包用户量</h4>
          <div style="border:1px solid #797979;">
            <div style="border-bottom:1px solid #797979;">
              <el-row class="sub-title">
                <el-col :span="12" >今日调用 2000</el-col>
                <el-col :span="12">今日回收 200</el-col>
              </el-row>
              <el-row class="sub-title">
                <el-col :span="12">累计调用 2000</el-col>
                <el-col :span="12">累计回收 200</el-col>
              </el-row>
            </div>        
            <el-row>
              <el-col :span="24"><bar-chart :chartData="barData" :height="barChartHeight"></bar-chart></el-col>
            </el-row>
            <p>*接口用量数据于整点更新</p>
          </div>
        </el-col>
     </el-row>
     <el-row class="box">
        <el-row>
          <el-col :span="12"><h4 class="title">项目</h4></el-col>
          <el-col :span="12" style="text-align:right;"><el-button size="small" @click="newProject">新建</el-button></el-col>
        </el-row>
        <el-table :data="projectTableData" style="width: 100%;border:1px solid #797979" class="project-table">
            <el-table-column prop="date" label="日期" v-for="(tab,i) in projectTableTitle"  :key="i" :prop="tab.value" :label="tab.label">
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
</template>

<script>

import lineChart from './sub/lineChart.vue'
import barChart from './sub/barChart.vue'

export default {
  name: '',
  data () {
    return {
      newProjectVisible: false,
      demandRadio: '1',
      lineData: {seriesData: [{name:'用量',data: [200, 230, 189, 276, 124, 264, 268], type: 'line' }], 
        legendData:['用量'],
        xData:['4月10日', '4月11日', '4月12日', '4月13日', '4月14日', '4月15日', '4月16日'],
        title: '近七日用量'},
      lineChartHeight: '170px',
      barData: {seriesData: [{ name:'直接访问',type:'bar',barWidth: '30%',data:[90, 70, 80, 97, 99], itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'inside',
            formatter:'{c}%'
          }
        }
      },}],
        legendData:['回收率'],
        xData:['3小时', '当天', '24小时', 'T+1', '1周'],
        title: '各时效回收率'},
      barChartHeight: '170px',
      projectTableTitle: [{label: "模板名称", value: "projectName"},
          {label: "项目ID", value: "id"},
          {label: "创建时间", value: "created"},
          {label: "状态", value: "status"},
          {label: "今日调用次数", value: "time"}],
      projectTableData: [
          // {projectName: "身份证", id: "xxxxxxxx", created:"2018/03/06", status:"生效中",time:"10000"},
          {projectName: "银行卡", id: "xxxxxxxx", created:"2018/03/06", status:"生效中",time:"1000"}
          // {projectName: "身份证", id: "xxxxxxxx", created:"2018/03/06", status:"生效中",time:"---"},
          // {projectName: "驾驶证", id: "xxxxxxxx", created:"2018/03/06", status:"生效中",time:"200"},
          // {projectName: "我的众包模板1", id: "xxxxxxxx", created:"2018/03/06", status:"生效中",time:"---"}
      ]
    }
  },
  methods: {
    newProject() {
      this.newProjectVisible = true
    },
    rechargePage(){
      this.$router.push('/rechargePage')
    }
  },
  created () {
    // localStorage.removeItem('projectList');
    var projectList = JSON.parse(localStorage.getItem('projectList'));
    if(projectList){
      console.log('index projectList');
      console.log(projectList instanceof Array);
      console.log(projectList);
      this.projectTableData.concat(projectList);
      console.log(this.projectTableData)
    }
    
  },
  mounted () {
    
  },
  components: { lineChart, barChart }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .manageIssueBox{
    margin:15px 20px 0 20px;
    font-size:14px;
 }
 .title{
   line-height:26px;
 }
 .sub-title{
   padding-left:3%;
 }
 .box{
   padding:0 0 30px 0;
 }
 .one-box>.el-col>.el-container{
   border:1px solid #797979;
   font-size: 14px;
 }
 .one-box>.el-col>.el-container>.el-aside,.el-main{
   padding:10px 0 0 15px;
 }
 .one-box>.el-col>.el-container p{
   margin-bottom:20px;
 }
 .one-box>.el-col>.el-container>.el-main span{
   font-size:16px;
   font-weight:bolder;
 }
 .el-table thead.is-group th {
    background: #f5f7fa;
}
</style>
