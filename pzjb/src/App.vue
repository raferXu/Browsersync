<template>
  <div id="app">
    <div class="doc">
      <div class="jbheader">
        <div class="navbar">
          <div class="navbar-nav navbar-left">
            <img @click="toIndex" class="logo" :src="navbarObj.left.icon" alt="icon">
            <ul class="navbar-nav navbar-main">
              <router-link tag="li" to="/">产品服务</router-link>
              <!-- <li class="proService" @mouseenter="showPro" @mouseleave="hidePro">产品服务</li> -->
              <router-link tag="li" to="/techExperience">技术体验</router-link>
              <!-- <li class="techExperience" @click="jumpTo('/techExperience')" @mouseenter="showTech" @mouseleave="hideTech">技术体验</li> -->
              <router-link tag="li" to="/devCenter">开发者中心</router-link>
              <router-link tag="li" to="/cooperConsult">合作咨询</router-link>
            </ul>
          </div>
          <ul class="navbar-nav navbar-right">
            <router-link tag="li" to="/loginPage">登录</router-link>
            <router-link tag="li" to="/registerPage">注册</router-link>
            <!-- <li><a href="manage.html?to=manageAccount">管理后台</a></li> -->
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
          icon: require('./assets/images/logo.png'),
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
.logo{
  cursor: pointer;
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
