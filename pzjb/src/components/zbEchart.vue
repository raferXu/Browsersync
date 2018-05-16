<template>
  <div class="">
    <div class="showDataBox">
      <div class="box tc">
        <p class="label">今日调用</p>
        <p class="value">2863</p>
      </div>
      <div class="box tc">
        <p class="label">今日回收</p>
        <p class="value">20634</p>
      </div>
      <div class="box tc">
        <p class="label">累计调用</p>
        <p class="value">2863</p>
      </div>
      <div class="box tc">
        <p class="label">累计回收</p>
        <p class="value">20634</p>
      </div>
    </div>
    <div class="showEchartsBox">
      <bar-chart :chartData="barData" :height="barChartHeight"></bar-chart>
      <div class="echartTip tc">各项目回收率(数据于整点更新)</div>
    </div>
  </div>
</template>

<script>
import barChart from './sub/barChart.vue'
export default {
  name: '',
  components: {
    barChart
  },
  data () {
    return {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showDataBox{
  display: flex;
  justify-content: space-between;
  padding: 40px 275px 0px;
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
