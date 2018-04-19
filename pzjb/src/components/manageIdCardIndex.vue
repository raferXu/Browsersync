<template>
  <div class="manageIndexBox">
    <h3 class="title">{{title}}</h3>
    <div class="contentBox">
      <div class="toOpenBox">
        <div class="toOpenInfoBox">
          <p>产品服务: {{obj.who}}</p>
          <p>识别字段: {{obj.which}}</p>
          <p>计费方式: {{obj.how}}</p>
        </div>
        <div class="toOpenBtnBox">
          <div class="btn" @click="toOpen">申请开通</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      title: '产品服务>身份证',
      obj: {
        who: '身份证OCR识别',
        which: '姓名、身份证号',
        how: '预存款，每月按实际使用量扣款'
      }
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    toOpen(){
      this.$router.push('/OCRmodel')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  height: 90px;
  line-height: 90px;
  padding-left: 40px;
  font-size: 32px;
  color: #323232;
  border: 1px solid #f0f0f0;
}
.contentBox{
  padding: 80px;
}
.toOpenBox{
  display: flex;
  justify-content: space-between;
  padding: 40px;
  border: 1px solid #828282;
}
.toOpenBox p{
  font-size: 24px;
  line-height: 2;
}
.toOpenBtnBox{
  display: flex;
  align-items: center;
}
.btn{
  display: inline-block;
  text-align: center;
  height: 54px;
  line-height: 54px;
  padding: 0 20px;
  color: #ffffff;
  font-size: 24px;
  background: #0090ff;
  cursor: pointer;
}
.btn:active{
  background: #68bdff;
}
</style>
