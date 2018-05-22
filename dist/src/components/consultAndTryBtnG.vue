<template>
  <div class="btnG">
    <router-link class="priceBtn" to="/">合作咨询</router-link>
    <router-link v-if="page=='customizedOCR'" class="priceBtn" to="/">申请自定义开发</router-link>
    <a class="priceBtn" href="manage.html?to=OCRmodel">立即使用</a>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: {
    page: {
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnG{
  display: flex;
  justify-content: space-between;
  padding: 0 375px;
}
.priceBtn{
  display: inline-block;
  padding: 0 20px;
  text-align: center;
  height: 54px;
  line-height: 54px;
  color: #ffffff;
  font-size: 24px;
  background: #0090ff;
  cursor: pointer;
}
.priceBtn:active{
  background: #68bdff;
}
</style>
