<template>
  <div class="cardApplicationBox">
    <h3 class="sectionTitle">{{obj.title}}</h3>
    <div class="imgTxtWrap">
      <div class="imgTxtBox">
        <img class="applicationImg applicationImg1" :src="obj.imgTxtArr[0].img" alt="application">
        <div class="txtBox txtBox1">
          <h4>{{obj.imgTxtArr[0].title}}</h4>
          <p>{{obj.imgTxtArr[0].txt}}</p>
        </div>
      </div>
      <div class="imgTxtBox">
        <div class="txtBox txtBox2">
          <h4>{{obj.imgTxtArr[1].title}}</h4>
          <p>{{obj.imgTxtArr[1].txt}}</p>
        </div>
        <img class="applicationImg applicationImg2" :src="obj.imgTxtArr[1].img" alt="application">
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
            img: require('../assets/images/logo.png'),
            title: '1.服务类产品用户实名认证',
            txt: '服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户实名认证服务类产品用户'
          },
          {
            img: require('../assets/images/logo.png'),
            title: '2.业务部门身份信息采集',
            txt: '业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集业务部门身份信息采集'
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cardApplicationBox{
  padding: 160px 415px;
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
  width: 340px;
  height: 210px;
}
.applicationImg1{
  left: 0;
}
.applicationImg2{
  right: 0;
}
.txtBox1{
  margin-left: 400px;
}
.txtBox2{
  margin-right: 400px;
}
.imgTxtBox h4{
  margin-bottom: 12px;
  font-weight: normal;
  font-size: 24px;
  color: #333333;
}
.imgTxtBox p{
  font-size: 16px;
  color: #666666;
}
</style>
