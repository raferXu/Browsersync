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
        xData:['4月10日', '4月11日', '4月12日', '4月13日', '4月14日', '4月15日', '4月16日'],
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
  justify-content: space-between;
  padding: 40px 620px 80px;
}
.echartTip{
  padding: 40px 0;
  font-size: 18px;
  color: #323232;
}
.label{
  font-size: 18px;
  color: #828282;
}
.value{
  padding-top: 16px;
  font-size: 24px;
  color: #323232;
  font-weight: bold;
}
</style>
