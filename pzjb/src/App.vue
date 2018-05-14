<template>
  <div id="app">
    <div class="doc">
      <div class="jbheader">
        <div class="navbar">
          <div class="navbar-nav navbar-left">
            <span class="logoWrap" @click="toIndex">
              <img class="logo" :src="navbarObj.left.icon" alt="icon"><i class="logoTxt">平安接包</i>
            </span>
            <ul class="navbar-nav navbar-main">
              <li class="productListTag">
              <!-- <router-link tag="li" to="/" class="productListTag"> -->
                <span class="productListTitle">产品服务</span>
                <ul class="productList">
                  <router-link tag="li" to="/idCard">身份证识别</router-link>
                  <router-link tag="li" to="/customizedOCR">定制化识别服务</router-link>
                  <router-link tag="li" to="/crowdsourcing">众包服务</router-link>
                </ul>
              <!-- </router-link> -->
              </li>
              <router-link tag="li" to="/techExperience">技术体验</router-link>
              <li>开发者中心</li>
              <li>合作咨询</li>
              <!-- <router-link tag="li" to="/devCenter">开发者中心</router-link> -->
              <!-- <router-link tag="li" to="/cooperConsult">合作咨询</router-link> -->
            </ul>
          </div>
          <ul class="navbar-nav navbar-right">
            <!-- <router-link tag="li" to="/loginPage">登录</router-link> -->
            <!-- <router-link tag="li" to="/registerPage">注册</router-link> -->
            <li><a href="manage.html">控制台</a></li>
          </ul>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <jbfooter></jbfooter>
  </div>
</template>

<script>
import sfz from './components/sfz'
import jbfooter from './components/jbfooter'
export default {
  name: 'App',
  data(){
    return {
      nowNav: '',
      navbarObj: {
        left: {
          icon: require('./assets/images/平安接包logo.png'),
          txt: '平安接包'
        },
        right: {

        },
        main: {
          pro: {
            normal: [
              {
                name: 'OCR文字识别',
                path: '/ocrPro'
              },
              {
                name: '众包业务',
                path: '/zbPro'
              }
            ]
          },
          tech: {
            ocr: [
              {
                name: '身份证',
                path: '/idCard'
              },
              {
                name: '银行卡',
                path: '/bankCard'
              },
              {
                name: '行驶证',
                path: '/drivingCard'
              },
              {
                name: '驾驶证',
                path: '/vehicleCard'
              },
              {
                name: '医疗票据(上海)',
                path: '/hospitalBill'
              },
              {
                name: '自定义OCR模板',
                path: '/customizedOCR'
              }
            ],
            zb: [
              {
                name: '众包',
                path: '/crowdsourcing'
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    showTech(){
      this.nowNav = 'tech';
    },
    hideTech(){
      this.nowNav = '';
    },
    showPro(){
      this.nowNav = 'pro';
    },
    hidePro(){
      this.nowNav = '';
    },
    dump(){
      this.nowNav = '';
      console.log('dump')
    },
    toIndex(){
      this.$router.push('/');
    },
    jumpTo(link){
      this.$router.push(link);
    }
  },
  components: {
    sfz,jbfooter
  }
}
</script>

<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.doc{
  position: relative;
  box-sizing: border-box;
  min-height: 100%;
  padding-bottom: 400px;
  z-index: 1;
}
.jbheader{
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 375px;
  background: rgba(0,0,0,0.5);
  /* overflow: hidden; */
}
.navbar{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.navbar-nav{
  display: flex;
}
.logoWrap{
  cursor: pointer;
}
.logo{
  width: 22px;
  cursor: pointer;
}
.logoTxt{
  font-size: 24px;
  color: #ffffff;
  padding-left: 20px;
}
.navbar-nav>li, .navbar-nav>li a{
  padding: 0 20px;
  font-size: 14px;
  color: #ffffff;
}
.navbar-nav>li:hover, .navbar-nav>li:hover a{
  color: #0090ff;
  cursor: pointer;
}
.productListTag{
  position: relative;
}
.productListTag::before{
  display: none;
  position: absolute;
  bottom: 0;
  content: '';
  width: 70px;
  height: 4px;
  /* background: #0090ff; */
  background: transparent;
}
.productListTag:hover::before{
  display: inline-block;
}
.productListTag:hover .productList{
  display: block;
}
.productList{
  position: absolute;
  left: -40px;
  display: none;
  padding: 40px;
  white-space: nowrap;
  background: rgba(0,0,0,0.7);
}
.productList li, .productList li.router-link-exact-active{
  color: #ffffff;
}
.productList li:hover{
  color: #0090ff;
}
.proService, .techExperience{
  position: relative;
}
.techBox{
  position: absolute;
  left: 0;
  top: 60px;
  border-top: 4px solid #0090ff;
  display: flex;
  padding: 20px;
  background: #ffffff;
}
.techBox ul{
  text-align: left;
}
.techBox ul:nth-child(2){
  margin-left: 40px;
}
.techBox li{
  line-height: 1.8;
  font-size: 14px;
  color: #828282;
  white-space: nowrap;
}
.techBox li:hover{
  color: #0090ff;
  cursor: pointer;
}
.techBox .cate{
  padding-bottom: 18px;
  line-height: 1;
  font-size: 18px;
  color: #333333;
}
.techBox .cate:hover{
  color: #333333;
  cursor: default;
}
.techBox .cate span{
  padding-bottom: 6px;
  border-bottom: 1px solid #333333;
}

.navbar-main .router-link-exact-active{
  color: #0090ff;
}
</style>
