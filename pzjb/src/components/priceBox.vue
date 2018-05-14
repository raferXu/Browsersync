<template>
  <div class="priceBox">
    <h3 class="sectionTitle">{{obj.title}}</h3>
    <div class="priceTable">
      <div class="row" v-for="(value,index) in APIprice" :key="index">
        <div class="col" v-for="(v,i) in value" :key="i">{{v}}</div>
      </div>
      <div class="lastRow">
        <span class="redStar">*</span>
        按梯度收费，产品的每个购买阶梯使用一个价格，每个阶梯内的用量与该阶梯的价格相乘，累加后得出总价。
如：用户本月调用了40000次，则产生费用为 10000*0.2+（40000-10000）*0.17 = 7100 元
每月费用在次月第一天的00：00结算。
      </div>
    </div>
    <div class="btnG">
      <!-- <span class="mainColorBtn">立即开通</span> -->
      <a class="mainColorBtn" href="manage.html?to=OCRmodel">立即开通</a>
    </div>
  </div>
</template>

<script>
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
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.priceBox{
  padding: 160px 415px;
}
.sectionTitle{
  margin-bottom: 80px;
}
.priceTable{
  display: flex;
  flex-direction: column;
  /* height: 330px; */
  margin-bottom: 40px;
  font-size: 24px;
  overflow: hidden;
}
.row{
  display: flex;
  line-height: 54px;
  font-size: 24px;
  line-height: 54px;
  color: #333333;
}
.row:nth-child(even){
  background: #f0f0f0;
}
.row:nth-child(odd){
  background: #dcdcdc;
}
.row:first-child{
  font-size: 20px;
  color: #ffffff;
  background: #333333;
  margin-bottom: 10px;
  font-weight: bold;
}
.col{
  flex: 1;
}
.btnG{
  text-align: center;
}
.lastRow{
  background: #f0f0f0;
  padding: 15px 120px;
  font-size: 18px;
  line-height: 30px;
  text-align: left;
}
</style>
