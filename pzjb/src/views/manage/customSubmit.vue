<template>
  <div class=""  style="background:#fff;">
    <div class="title" style="">
      <Col class="title1" span="24" offset="" >申请定制化识别服务</Col>
    </div>
    <Row style="padding:40px 20px 160px 20px;text-align:center;">
      <img  src="../../assets/images/开通完成.png" style="width:100%;margin-bottom:200px;">
      <img class="img" src="../../assets/images/申请成功提交icon.png" alt="">
      <!-- <Icon type="checkmark-circled" size="40" color="#00c802" /> -->
      <Col class="mes">您的定制化识别服务申请已成功提交，审核结果将于7个工作日内反馈，请于控制台查询。</Col>
      <Button class="btn" type="primary" @click="clickFn">确定</Button>
      
    </Row>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  methods:{
    clickFn(){
      this.$router.push({path: '/manageIndex'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mes{
      font-size:18px;
      margin-top:80px;
      margin-bottom:40px;
    }
    .btn{
      width:130px;
      height:54px;
      font-size:20px;
      background:#fff;
      border:1px solid #0090ff;
      color:#0090ff;
    }
     .title{border:1px solid #eee;height:80px;font-size:20px;line-height:80px;}
     .title1{padding-left:40px;}
     .img{
       width:229px;height:134px;
     }
</style>
