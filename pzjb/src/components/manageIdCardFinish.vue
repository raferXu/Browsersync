<template>
  <div class="manageIndexBox">
    <h3 class="modelTitle pageTitle">{{title}}</h3>
    <div class="contentBox modelBox">
      <div class="table baseInfoWrap">
        <h4 class="modelTitle">基本信息</h4>
        <div class="baseInfoBox modelParam">
          <div class="row">
            <div class="col">
              <i class="modelLabel">创建时间: </i>
              <input v-if="edit" type="text" v-model="obj.base.date">
              <span v-else>{{obj.base.date}}</span>
            </div>
            <div class="col">
              <i class="modelLabel">项目ID: </i>
              <input v-if="edit" type="text" v-model="obj.base.id">
              <span v-else>{{obj.base.id}}</span>
            </div>
            <div class="col">
              <i class="modelLabel">状态: </i>
              <input v-if="edit" type="text" v-model="obj.base.state">
              <span v-else>{{obj.base.state}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <i class="modelLabel">预计月调用量: </i>
              <span>{{obj.base.count}}</span>次/月
            </div>
            <div class="col">
              <i class="modelLabel">调用单价: </i>
              <input v-if="edit" type="text" v-model="obj.base.price">
              <span v-else>{{obj.base.price}}</span> 元/次
            </div>
            <div class="col">
              <i class="modelLabel">累计支付: </i>
              <input v-if="edit" type="text" v-model="obj.base.pay">
              <span v-else>{{obj.base.pay}}</span> 元
            </div>
          </div>
          <div class="row">
            <div class="col">
              <i class="modelLabel">API key: </i>
              <input v-if="edit" type="text" v-model="obj.base.apiKey">
              <span v-else>{{obj.base.apiKey}}</span>
            </div>
            <div class="col">
              <i class="modelLabel">Secret key: </i>
              <input v-if="edit" type="text" v-model="obj.base.secretKey">
              <span v-else>{{obj.base.secretKey}}</span>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="table projectWrap">
        <h4 class="modelTitle">服务进度</h4>
        <div class="projectBox modelParam">
          <div class="row">
            <div class="col">
              <i class="modelLabel">本日有效调用次数: </i>
              <input v-if="edit" type="text" v-model="obj.process.todayCount">
              <span v-else>{{obj.process.todayCount}}</span>
            </div>
            <div class="col">
              <i class="modelLabel">累计有效调用次数: </i>
              <input v-if="edit" type="text" v-model="obj.process.allCount">
              <span v-else>{{obj.process.allCount}}</span>
            </div>
            <div class="col">
              <i class="modelLabel">累计调用失败次数: </i>
              <input v-if="edit" type="text" v-model="obj.process.allFail">
              <span v-else>{{obj.process.allFail}}</span>
            </div>  
          </div>
          <div class="row">
            <div class="col">
              <i class="modelLabel">本月有效调用次数: </i>
              <input v-if="edit" type="text" v-model="obj.process.count">
              <span v-else>{{obj.process.count}}</span>
            </div>
            <div class="col">
              <i class="modelLabel">预计总剩余次数: </i>
              <input v-if="edit" type="text" v-model="obj.process.remainder">
              <span v-else>{{obj.process.remainder}}</span>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="table APIWrap">
        <h4 class="">
          <el-row class="modelTitle APITitle">
           <el-col :span="6">
             <h4 class="">API监控</h4>
           </el-col>
           <el-col :span="18" class="tr">
             <el-radio v-model="radio" label="0">小时</el-radio>
             <el-radio v-model="radio" label="1">日</el-radio>
             <el-radio v-model="radio" label="2">月</el-radio>
             <el-radio v-model="radio" label="3">自定义</el-radio>
             <el-date-picker
              v-model="value6"
              type="daterange"
              range-separator="至"
              start-placeholder="2018-5-2"
              end-placeholder="2018-5-2"
              style="margin-left:30px;"
              >
             </el-date-picker>
           </el-col>
         </el-row>
        </h4>
        <div class="APIBox">
         <div id="main" style="width: 100%;height:300px;"> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  data () {
    return {
      radio: '0',
      value6: '',
      title: '身份证',
      edit: false,
      region: {
        '10000': "1-10000",
        '50000': "10001-50000",
        '100000': "50001-100000",
        '150000': ">100000"
      },
      obj: {
        base: {
          name: '身份证',
          id: '1234567890QWER',
          state: '生效中',
          date: '2018年1月12日',
          apiKey: 'xxxxxxxxxxxxxxxxxx',
          secretKey: 'xxxxxxxxxxxxxxxxxxxx',
          count: '10000-50000',
          month: '3',
          price: '0.17-0.2',
          pay: 0
        },
        process: {
          money: '0',
          count: '0',
          allCount: '0',
          allFail: '0', 
          allMoney: '0',
          todayCount: '0',
          remainder: '0'
        },
        api: {
        }
      }
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    setOptions() {
      var self = this
      this.chart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['调用成功','调用失败'],
            bottom: '0'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:'调用失败',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#ffba00'
              }
            }
        },
        {
            name:'调用成功',
            // data: [0, 0, 0, 0, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#68c800'
              }
            }
        }]
      }, false)
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('main'))
      this.setOptions()
    }
  },
  mounted() {
    this.initChart()
  },
  created () {
    var _this = this;
    console.log(this.$route)
    var obj = {num: this.region[this.$route.params.num]}
    this.obj.base = Object.assign({},this.obj.base,this.$route.params,obj)
    console.log('templateId')
    console.log(this.$route.query.templateId)
    var templateId = this.$route.query.templateId;
    if(templateId){
      this.axios.post("/token/project/detail",{"template_id": templateId},{
        // headers: {
        //   token: "rafer"
        // }
      }).then(res=>{
        res = res.data;
        if(res.code=='200'){
          var data = res.body;
          console.log(_this)
          _this.obj.base.name = data.project_id
          _this.obj.base.id = data.project_id
          _this.obj.base.state = data.status
          _this.obj.base.date = data.created_time.split(' ')[0]
          // _this.obj.base.apiKey = data.api_key
          // _this.obj.base.secretKey = data.secret_key
          _this.obj.base.count = _this.region[data.expected_frequency]
          // _this.obj.base.month = data.expected_frequency
          // _this.obj.base.price = data.expected_frequency
          _this.obj.base.pay = data.accumulative_payment
          // _this.obj.process.money = data.expected_frequency
          // _this.obj.process.allFail = data.failed_calls
          // _this.obj.process.count = data.success_calls
          // _this.obj.process.allCount = data.remaining_calls
          // _this.obj.process.allMoney = data.success_calls_month
          // _this.obj.process.todayCount = data.success_calls_today
          _this.obj.process.remainder = data.expected_frequency
          

        }
        
      }).catch(function(error){
        console.log("/token/project/start error init."+error);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  padding: 40px;
  border: 1px solid #f0f0f0;
}
.table{
  overflow: hidden;
  font-size: 18px;
}
.row{
  display: flex;
  width: 100%;
}
.col{
  flex: 1;
  line-height: 2;
}
.APITitle{
  display: flex;
  align-items: center;
}
.APIBox{
  padding-bottom: 40px;
}
</style>
<style>
.el-date-editor .el-range-separator{
  padding: 0;
}
</style>
