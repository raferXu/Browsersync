<template>
  <div class="manageIndexBox">
    <h3 class="title">{{title}}</h3>
    <div class="contentBox">
      <div class="toOpenBox">
        <div class="toOpenInfoBox">
          <img src="../../assets/images/身份证icon.png" class="img">
        </div>
        <div class="toOpenBtnBox">
          <div class="btn btn1" @click="toOpen">申请开通</div>
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
      title: '身份证',
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
  font-size:20px;
}
.contentBox{
  padding: 20px;
  background:#f5f5f5;
}
.toOpenBox{
  display: flex;
  justify-content: space-between;
  padding: 35px;
  background:#fff;
  /* border: 1px solid #828282; */
}
.toOpenBox p{
  font-size: 20px;
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
.img{
  width: 688px;
  height: auto;
}
.btn1{
  width: 130px;
  height: 54px;
  font-size:20px;
  line-height: 54px;
  padding: 0px !important;
  text-align: center;
  border-radius: 10px;
}
.main-container{
  background:#f5f5f5;
}
.title{
  background: #fff;
}
</style>
