<template>
  <div class="">
    <div style="border:1px solid #eee;height:80px;font-size:24px;line-height:80px;">
      <Col span="22" offset="1" >众包模版申请</Col>
    </div>
    <Row style="padding:250px 0 160px;text-align:center;">
      <Icon type="checkmark-circled" size="40" color="#00c802" />
      <Col class="mes">您的众包模版申请已成功提交，审核结果将于7个工作日内反馈，请于项目管理页面查询。</Col>
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
<style>
    .mes{
      font-size:18px;
      margin-top:40px;
      margin-bottom:160px;
    }
    .btn{
      width:130px;
      height:54px;
      font-size:20px;
    }
</style>
