<template>
  <div id="app">
    <div class="doc" :class="{'pb0':!footerFlag}">
      <div class="jbheader">
        <div class="navbar">
          <div class="navbar-nav navbar-left">
            <span class="logoWrap" @click="toIndex">
              <img class="logo" :src="navbarObj.left.icon" alt="icon"><i class="logoTxt">平安接包</i>
            </span>
            <ul class="navbar-nav navbar-main">
              <li class="productListTag">
                <span class="productListTitle">产品服务</span>
                <ul class="productList">
                  <router-link tag="li" to="/idCard">身份证识别</router-link>
                  <router-link tag="li" to="/customizedOCR">定制化识别服务</router-link>
                  <router-link tag="li" to="/crowdsourcing">众包服务</router-link>
                </ul>
              </li>
              <router-link tag="li" to="/techExperience">技术体验</router-link>
              <li>开发者中心</li>
              <li>合作咨询</li>
              <!-- <router-link tag="li" to="/devCenter">开发者中心</router-link> -->
              <!-- <router-link tag="li" to="/cooperConsult">合作咨询</router-link> -->
            </ul>
          </div>
          <ul class="navbar-nav navbar-right">
            <template v-if="loginFlag">
              <li class="username" @mouseover="userMouseover" @mouseout="userMouseout">
                <div :title="username">{{username}}</div>
                <span v-show="usernameHoverFlag" class="loginout" @click="loginout">退出</span>
              </li>
              <li><a href="manage.html">控制台</a></li>
            </template>
            <template v-else>
              <router-link tag="li" to="/login">登录</router-link>
              <router-link tag="li" to="/register">注册</router-link>
              <router-link tag="li" to="/login?from=manage">控制台</router-link>
            </template>
          </ul>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <div v-if="footerFlag">
      <jbfooter></jbfooter>
    </div>
    <div class="maskBg" v-if="modal1">
        <div class="tipBox">
            <p>帐号异常，请重新登录</p>
            <p>
                <button @click="loginBtnClick" ref="loginBtn">确定</button>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import jbfooter from './components/jbfooter'
import {common} from './assets/js/common'
export default {
  name: 'App',
  data(){
    return {
      usernameHoverFlag: false,
      nowNav: '',
      navbarObj: {
        left: {
          icon: require('./assets/images/平安接包logo.png'),
          txt: '平安接包'
        },
        right: {}
      }
    }
  },
  computed: {
    footerFlag(){
      return this.$store.state.footerFlag
    },
    loginFlag(){
      let token = this.$store.state.token;
      if(!token || token===null || token==='null'){
        console.log('$store.state.token为空');
        token =  this.$store.state.token = localStorage.getItem('token');
        if(!token || token===null || token==='null'){
          console.log('$localStorage.token为空');
          return false;
        }else{
          console.log('$localStorage.token存在');
          return true;
        }
      }
      return true;
    },
    username(){
      console.log('$store username: '+this.$store.state.name);
      console.log('localStorage username: '+localStorage.getItem('name'));
      if(this.$store.state.name){
        return this.$store.state.name;
      }else if(localStorage.getItem('name')){
        this.$store.state.name = localStorage.getItem('name');
        return localStorage.getItem('name')
      }else{
        return '';
      }
      
    },
    modal1: function () {
      let tokenFail = this.$store.state.tokenFail;
      console.log('modal1: '+tokenFail);
      if(tokenFail){
          return true;
      }else{
          return false;
      }
    }
  },
  methods: {
    loginBtnClick(){
        console.log('loginBtnClick');
        window.location.href = 'index.html?to=login&from=manage'
    },
    loginoutReq(data){
      return this.axios({
          url:"/token/account/log_out",
          data:data,
          method:'post'
      });
    },
    loginout(){
      console.log('点击退出按钮');
      var loginoutJSON = {
        phone: this.$store.state.phone || localStorage.getItem('phone')
      };

      this.loginoutReq(loginoutJSON).then((res)=>{
        console.log('/token/account/log_out then')
        if(res.status==200){
            var resData = res.data;
            if(resData.code==200){
              this.$store.commit('logoutFn');
              common.refresh2(this);
            }else{
              console.log('接口异常，返回码为: '+resData.code);
            }
        }else{
          console.log('网络异常，返回状态码: '+res.status);
        }
      }).catch((err)=>{
        console.log('/token/account/log_out err')
        console.log(err)
      });
      
    },
    userMouseover(){
      this.usernameHoverFlag = true;
    },
    userMouseout(){
      this.usernameHoverFlag = false;
    },
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
    jbfooter
  },
  created(){
    console.log('index localStorage token');
    console.log(localStorage.getItem('token'));
    console.log('index store token');
    console.log(this.$store.state.token)
    console.log('this.$route');
    console.log(this.$route);
    var to = common.GetUrlParam('to');
    if(to){
      this.$router.push({
        path: '/login'
      });
    }
  },
  watch:{
    '$route': function(to,from){
      console.log('watch $route');
      let token = this.$store.state.token;
      if(!token || token === null || token === 'null'){
          token = window.localStorage.getItem('token');
          this.$store.state.token = window.localStorage.getItem('token')
      }
　　　 if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null || token === 'null')) {
　　　　　console.log('app.vue 页面需要登录却没有登录');
        this.$store.commit('footerHide');
　　　 } else {
　　　　　console.log('app.vue 无需登陆或已登录或在注册或登录页面')
        this.$store.commit('footerShow');
　　　 }
　　 }
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
  /* height: 100%; */
  padding-bottom: 400px;
  z-index: 1;
}
.pb0{
  padding-bottom: 0;
}
.jbheader{
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 11;
  display: flex;
  width: 1170px;
  height: 60px;
  line-height: 60px;
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
  margin-right: 60px;
}
.logo{
  width: 22px;
  cursor: pointer;
  float: left;
  margin-top:15px;
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
  left: -5px;
  display: none;
  padding: 20px;
  white-space: nowrap;
  background: rgba(0,0,0,0.7);
}
.productList li{
  color: #ffffff;
}
.productList li:hover,.productList li.router-link-active{
  color: #0090ff;
}
.productList li{
  line-height:40px;
  height:40px;
  text-align: left;
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

.navbar-main .router-link-active{
  color: #0090ff;
}
.username{
  position: relative;
  width: 1.5rem;
}
.username div{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.navbar-nav .username:hover{
  color: #ffffff;
}
.navbar-nav .username span:hover{
  color: #0090ff;
}
.loginout{
  position: absolute;
  top: 80px;
  left: 0px;
  right: 0px;
  text-align: center;
  line-height: 50px;
  background: #000000;
}

.maskBg{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background: rgba(0,0,0,0.7);
}
.tipBox{
    width: 40%;
    margin: 100px auto;
    background: #ffffff;
}
</style>
