<template>
  <div class="">
    <div class="showDataBox">
      <div class="box tc">
        <p class="label">今日用量</p>
        <p class="value">2863</p>
      </div>
      <div class="box tc">
        <p class="label">累计用量</p>
        <p class="value">20634</p>
      </div>
    </div>
    <div class="showEchartBox">
      <line-chart :chartData="lineData" :height="lineChartHeight"></line-chart>
      <div class="echartTip tc">近七日用量(数据于整点更新)</div>
    </div>
  </div>
</template>

<script>
import lineChart from './sub/lineChart.vue'
export default {
  name: '',
  components: {
    lineChart
  },
  data () {
    return {
      lineData: {
        seriesData: [
          {
            name:'用量',
            data: [200, 230, 189, 276, 124, 264, 268], 
            type: 'line',
            itemStyle: {
              normal: {
                color: '#0090ff'
              }
            } 
          }
        ], 
        legendData:['用量'],
        xData:['5月9日', '5月10日', '5月11日', '5月12日', '5月13日', '5月14日', '5月15日'],
        title: ''
      },
      lineChartHeight: '220px',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showDataBox{
  display: flex;
  justify-content: center;
}
.box:not(:first-child){
  margin-left: 230px;
}
.echartTip{
  padding: 0 0 20px;
  font-size: 14px;
  color: #323232;
}
.label{
  padding-top:30px;
  font-size: 14px;
  color: #828282;
}
.value{
  padding-top: 12px;
  font-size: 20px;
  color: #323232;
  font-weight: bold;
}
</style>
