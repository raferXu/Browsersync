<template>
  <div class="jbfooter">
    <ul class="tipsBox">
      <li>
        <span>帮助文档</span>
        <a href="#">xxxxxxxxxx</a>
        <a href="#">xxxx</a>
      </li>
      <li>
        <span>产品服务</span>
        <a href="#">技术体验</a>
        <a href="#">自定义OCR申请试用</a>
        <a href="#">众包申请试用</a>
        <a href="#">产品开通</a>
      </li>
      <li>
        <span>服务与声明</span>
        <a href="#">声明</a>
      </li>
      <li>
        <span>联系我们</span>
        <i>客服电话 0755-12345678</i>
        <i>邮件 xxxxxxxxxxxxxxxxx</i>
        <a href="#">在线咨询</a>
      </li>
      <li>
        <span>关注我们</span>
        <i>微信公众号</i>
        <i>xxxxxxxxxxxx</i>
        <img src="" alt="" class="qrcodeImg">
      </li>
    </ul>
    <div class="copyright">版权所有 平安接包 CopyRight2008-2018 备案号: 粤11098765号</div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jbfooter{
  position: relative;
  padding: 0 200px;
  height: 300px;
  margin-top: -300px;
  background: #333333;
  color: #ffffff;
}
.tipsBox{
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}
.tipsBox li{
  display: flex;
  flex-direction: column;
  text-align: left;
}
.tipsBox span{
  margin-bottom: 20px;
  font-size: 18px;
}
.tipsBox i, .tipsBox a{
  font-size: 14px;
}
.tipsBox i{
  font-style: normal;
}
.copyright{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;
  text-align: center;
  font-size: 12px;
}
</style>
