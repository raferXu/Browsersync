<template>
  <div class="priceBox">
    <h3 class="sectionTitle">{{obj.title}}</h3>
    <div class="priceTable">
      <div class="row" v-for="(value,index) in APIprice" :key="index">
        <div class="col" v-for="(v,i) in value" :key="i">{{v}}</div>
      </div>
    </div>
    <consultAndTryBtnG></consultAndTryBtnG>
  </div>
</template>

<script>
import consultAndTryBtnG from './consultAndTryBtnG'
export default {
  name: '',
  data () {
    return {
      obj: {
        title: 'API价格',
      },
      APIprice: [
        {
          count: 'API',
          price: '单价 (元/次)'
        },
        {
          count: '0 < 月调用量 < 10000',
          price: '0.2'
        },
        {
          count: '100000 ≤ 月调用量 < 50000',
          price: '0.17'
        },
        {
          count: '50000 ≤ 月调用量 < 100000',
          price: '0.14'
        },
        {
          count: '100000 ≤ 月调用量',
          price: '0.08'
        }
      ]
    }
  },
  components: {
    consultAndTryBtnG
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.priceBox{
  padding: 80px 375px;
  background: #ebf6ff;
}
.sectionTitle{
  margin-bottom: 80px;
}
.priceTable{
  display: flex;
  flex-direction: column;
  /* height: 330px; */
  margin-bottom: 40px;
  background: #ffffff;
  border: 1px solid #0090ff;
  font-size: 24px;
  overflow: hidden;
}
.priceTable .row{
  display: flex;
  line-height: 3.5;
}
.priceTable .row:nth-child(1){
  line-height: 5;
}
.priceTable .row:not(:last-child){
  border-bottom: 1px solid #f0f0f0;
}
.priceTable .col{
  flex: 1;
}
.priceTable .col:nth-child(2n+1){
  border-right: 1px solid #f0f0f0;
}
</style>
