<template>
  <div class="manageIndexBox">
    <h3 class="modelTitle pageTitle">{{title}}</h3>
    <div class="contentBox">
      <div class="table baseInfoWrap">
        <h4>基本信息</h4>
        <div class="baseInfoBox">
          <div class="row">
            <div class="col">
              <i>模板名称: </i>
              <input v-if="edit" type="text" v-model="obj.base.name">
              <span v-else>{{obj.base.name}}</span>
            </div>
            <div class="col">
              <i>项目ID: </i>
              <input v-if="edit" type="text" v-model="obj.base.id">
              <span v-else>{{obj.base.id}}</span>
            </div>
            <div class="col">
              <i>状态: </i>
              <input v-if="edit" type="text" v-model="obj.base.state">
              <span v-else>{{obj.base.state}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <i>创建时间: </i>
              <input v-if="edit" type="text" v-model="obj.base.date">
              <span v-else>{{obj.base.date}}</span>
            </div>
            <div class="col">
              <i>API key: </i>
              <input v-if="edit" type="text" v-model="obj.base.apiKey">
              <span v-else>{{obj.base.apiKey}}</span>
            </div>
            <div class="col">
              <i>Secret key: </i>
              <input v-if="edit" type="text" v-model="obj.base.secretKey">
              <span v-else>{{obj.base.secretKey}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <i>预计调用量: </i>
              <input v-if="edit" type="text" v-model="obj.base.num">
              <span v-else>{{obj.base.num}}</span>
            </div>
            <div class="col">
              <i>预计使用时间: </i>
              <input v-if="edit" type="text" v-model="obj.base.month">
              <span v-else>{{obj.base.month}}</span>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="table projectWrap">
        <h4>项目进度</h4>
        <div class="projectBox">
          <div class="row">
            <div class="col">
              <i>调用次数: </i>
              <input v-if="edit" type="text" v-model="obj.process.count">
              <span v-else>{{obj.process.count}}</span>
            </div>
            <div class="col">
              <i>调用失败次数: </i>
              <input v-if="edit" type="text" v-model="obj.process.fail">
              <span v-else>{{obj.process.fail}}</span>
            </div>
            <div class="col">
              <i>已产生费用: </i>
              <input v-if="edit" type="text" v-model="obj.process.money">
              <span v-else>{{obj.process.money}}元</span>
            </div>
          </div>
        </div>
      </div>
      <div class="table APIWrap">
        <h4>
          <el-row>
           <el-col :span="7" ><span style="font-size:14px;line-height:40px;">API监控</span></el-col>
           <el-col :span="17">
             <el-radio v-model="radio" label="0">小时</el-radio>
             <el-radio v-model="radio" label="1">日</el-radio>
             <el-radio v-model="radio" label="2">月</el-radio>
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
      radio: '1',
      value6: '',
      title: '我的自定义模板0',
      edit: false,
      region: {
        '10000': "1-10000",
        '50000': "10001-50000",
        '100000': "50001-100000",
        '150000': ">100000"
      },
      obj: {
        base: {
          name: '我的众包模板1',
          id: '123456123456qwer',
          state: '生效中',
          date: '2018年3月12日 12:39',
          apiKey: 'xxxxxxxxxxxxxxxxxx',
          secretKey: 'xxxxxxxxxxxxxxxxxxxx',
          num: '1-10000',
          month: '3'
        },
        process: {
          fail: '4800',
          money: '1440',
          count: '12000'
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
            data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
            type: 'line'
        },
        {
            name:'调用成功',
            data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
            type: 'line'
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
.title{
  padding: 40px;
  border: 1px solid #f0f0f0;
}
.contentBox{
  padding: 80px;
}
.table{
  overflow: hidden;
  padding: 0 20px;
  font-size: 18px;
  border: 20px solid #f0f0f0;
}
.table h4{
  padding: 0 999px;
  margin: 0 -999px;
  line-height: 3;
  font-size: 24px;
  border-bottom: 1px solid #f0f0f0;
}
.row{
  display: flex;
  width: 100%;
}
.col{
  flex: 1;
  line-height: 2;
}
.projectBox{
  padding: 20px 0;
}
</style>
