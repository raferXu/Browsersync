<template>
  <div class="cardApplicationBox">
    <h3 class="sectionTitle txtWhite">{{obj.title}}</h3>
    <div class="imgTxtWrap">
      <div class="imgTxtBox">
        <div class="txtBox txtBox2">
          <h4 class="pt40 pb40">{{obj.imgTxtArr[1].title}}</h4>
          <p>{{obj.imgTxtArr[1].txt}}</p>
        </div>
        <img class="applicationImg applicationImg2" :src="obj.imgTxtArr[1].img" alt="application">
      </div>
      <div class="imgTxtBox">
        <img class="applicationImg applicationImg1" :src="obj.imgTxtArr[0].img" alt="application">
        <div class="txtBox txtBox1">
          <h4 class="pt40 pb40">{{obj.imgTxtArr[0].title}}</h4>
          <p>{{obj.imgTxtArr[0].txt}}</p>
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
      obj: {
        title: '应用场景',
        imgTxtArr: [
          {
            img: require('../assets/images/业务部门身份信息采集.png'),
            title: '2. 业务部门身份信息采集',
            txt: '人社、金融、工商、公安等政府办事部门使用身份证OCR技术，可以快速识别用户身份信息，缓解政府部门办事压力，减少业务办理的等待时间，是智能识别产业在政务领域的一大突破。'
          },
          {
            img: require('../assets/images/服务类产品用户实名认证.png'),
            title: '1. 服务类产品用户实名认证',
            txt: '身份证OCR识别技术服务于银行、保险、物流及互联网等行业，适用于各类用户身份认证场景，自动识别并录入姓名及身份证号信息，提升信息输入效率。'
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.txtWhite{
  color: white;
}
.cardApplicationBox{
  padding: 160px 415px;
  background: #333333;
  color: #ffffff;
}
.sectionTitle{
  margin-bottom: 80px;
}
.imgTxtBox{
  position: relative;
  min-height: 210px;
  text-align: left;
}
.imgTxtBox:not(:last-child){
  margin-bottom: 80px;
}
.applicationImg{
  position: absolute;
  top: 0;
  width: 382px;
  height: 220px;
}
.applicationImg1{
  left: 0;
}
.applicationImg2{
  right: 0;
}
.txtBox1{
  margin-left: 542px;
}
.txtBox2{
  margin-right: 542px;
}
.imgTxtBox h4{
  font-weight: normal;
  font-size: 36px;
}
.imgTxtBox p{
  font-size: 18px;
}
</style>
