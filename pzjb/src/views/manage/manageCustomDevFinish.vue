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
              <span v-else>{{obj.process.remainder}} 元</span>
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
      title: '飞机票',
      edit: false,
      region: {
        '10000': "1-10000",
        '50000': "10001-50000",
        '100000': "50001-100000",
        '150000': ">100000"
      },
      obj: {
        base: {
          name: '行驶证',
          id: '23457321',
          state: '生效中',
          date: '2018年5月22日',
          apiKey: '8547345434',
          secretKey: '1423132543565473',
          count: '10000-50000',
          month: '3',
          price: '0.17-0.2',
          pay: 2970
        },
        process: {
          money: '40',
          count: '850',
          allCount: '11700',
          allFail: '3', 
          allMoney: '2300',
          todayCount: '200',
          remainder: '5882'
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
            data: [0, 0, 0, 0, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0],
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
    console.log(this.$route)
    var obj = {num: this.region[this.$route.params.num]}
    this.obj.base = Object.assign({},this.obj.base,this.$route.params,obj)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manageIndexBox{
  background: #ffffff; 
}
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
