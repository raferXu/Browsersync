<template>
  <div class="manageIndexBox">
    <h3 class="title">{{title}}</h3>
    <div class="contentBox">
      <div class="toOpenBox">
        <div class="toOpenInfoBox">
          <img :src="content.img" class="img">
          <div class="textBox">
            <h3>{{content.title}}</h3>
            <p><span>识别内容:</span>{{content.content}}</p>
            <p><span>计费方式:</span>{{content.fee}}</p>
          </div>
        </div>
        <div class="toOpenBtnBox">
          <div class="btn btn1" @click="toOpen">{{content.btn}}</div>
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
      content: {
        img: require('../../assets/images/身份证icon.png'),
        btn: '申请开通',
        title: '身份证',
        content: '二代居民身份证的姓名及身份证号',
        fee: '预存款，调用单价0.08~0.2元/次，每月按实际使用量扣款'
      },
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
  padding: 30px;
  background:#fff;
  /* border: 1px solid #828282; */
}
.toOpenBox p{
  font-size: 20px;
  line-height: 2;
}
.toOpenBtnBox{
  display: flex;
  align-items: flex-start;
}
.btn{
  display: inline-block;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border: 1px solid #0090ff;
  color: #0090ff;
  font-size: 20px;
  background: #ffffff;
  cursor: pointer;
}
.btn:active,.btn:hover{
  background: #0090ff;
  color: #ffffff;
}
.btn1{
  width: 130px;
  height: 40px;
  font-size:20px;
  line-height: 40px;
  padding: 0px !important;
  text-align: center;
}
.main-container{
  background:#f5f5f5;
}
.title{
  background: #fff;
}


.toOpenInfoBox{
  display: flex;
}
.img{
  width: 75px;
  height: 75px;
}
.textBox{
  padding-left: 30px;
}
.contentBox h3{
  font-size: 18px;
  color: #323232;
  padding-bottom: 20px;
}
.contentBox p{
  line-height: 20px;
  font-size: 14px;
  color: #323232;
}
.contentBox span{
  padding-right: 20px;
  color: #828282;
}
</style>
