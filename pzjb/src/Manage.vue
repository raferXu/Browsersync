<template>
  <div id="manage">
      <div class="sidebarWrapper">
        <ul class="sidebar-container">
            <a href="index.html"><li id="logo" class="sidebar-item sidebar-logo" style="color:#ffffff;text-align:center;font-size:12px;">
                <img class="img" src="./assets/images/平安接包logo.png">
            </li></a>
            <li class="sidebar-item" @click="toManageIndex">
                <i class="sidebarIcon" :style="summaryBg"></i><span class="sidebarTxt">概览</span>
            </li>
            <li class="sidebar-item" @mouseover="serviceIconOverFn" @mouseout="serviceIconOutFn">
                <i class="sidebarIcon" :style="serviceBg"></i><span class="sidebarTxt">产品服务</span>
                <ul class="serviceList" v-show="!hideSideBarServiceList">
                    <li class="serviceItem" v-for="(v,i) in serviceData.listData" :key="i">
                        <a v-if="v.txt=='身份证识别'" @click="jumpToIdCard">{{v.txt}}</a>
                        <router-link v-else :to="v.to">{{v.txt}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
      <div class="main-wrap">
        <div class="main-container">
            <div class="navbar">
                <!-- <router-link to="/">
                    <img :src="userIcon" alt="user" title="账户管理">
                </router-link> -->
                <div>
                    <img :src="userIcon" alt="user" title="账户管理">
                </div>
                <div>
                    <img :src="mailIcon" alt="mail" title="消息中心">
                </div>
                <div>
                    <img :src="issueIcon" alt="issue" title="帮助与支持">
                </div>
                <div>
                    <img :src="accountIcon" alt="account" title="费用管理">
                </div>
                <!-- <router-link to="/">
                    <img :src="mailIcon" alt="mail" title="消息中心">
                </router-link>
                <router-link to="/">
                    <img :src="issueIcon" alt="issue" title="帮助与支持">
                </router-link>
                <router-link to="/">
                    <img :src="accountIcon" alt="account" title="费用管理">
                </router-link> -->
            </div>
            <router-view></router-view>
        </div>
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
export default {
  name: 'manage',
  watch:{
    '$route': function(to,from){
      console.log('manage watch $route');
      let token = this.$store.state.token;
      if(!token || token === null || token === 'null'){
          token = window.localStorage.getItem('token');
          this.$store.state.token = window.localStorage.getItem('token')
      }
　　　 if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null || token === 'null')) {
　　　　　console.log('manage.vue 页面需要登录却没有登录');
        this.$store.commit('footerHide');
        this.$refs.loginBtn.click();
　　　 } else {
　　　　　console.log('manage.vue 无需登陆或已登录或在注册或登录页面')
        this.$store.commit('footerShow');
　　　 }
　　 }
　},
  created () {
      console.log('manage localStorage token');
      console.log(localStorage.getItem('token'));
      console.log('manage store token');
      console.log(this.$store.state.token)
      var search = location.search;
      if(/to/.test(search)){
        var to = location.search.split('?')[1].split('=')[1];
        console.log('/'+to);
        this.$router.push('/'+to)
      }
  },
  computed: {
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
  data () {
    return {
        hideSideBarServiceList: true,
        userIcon: require('./assets/images/显示用户名.png'),
        mailIcon: require('./assets/images/消息12.png'),
        issueIcon: require('./assets/images/遇到问题.png'),
        summaryIcon: require('./assets/images/manage/概览.png'),
        serviceIcon: require('./assets/images/manage/产品服务.png'),
        accountIcon: require('./assets/images/费用.png'),
        serviceBg: {
            backgroundImage: 'url("'+require('./assets/images/manage/产品服务.png')+'")',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
        },
        summaryBg: {
            backgroundImage: 'url("'+require('./assets/images/manage/概览.png')+'")',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
        },
        serviceData: {
            title: '产品服务',
            listData: [
                {
                    txt: '身份证识别',
                    to: '/manageIdCardIndex'
                },
                {
                    txt: '定制化识别服务',
                    to: '/manageCustomModelIndex'
                },
                {
                    txt: '众包录入',
                    to: '/manageZBmodelIndex'
                }
            ]
        }
    }
  },
  methods: {
    loginBtnClick(){
        console.log('loginBtnClick');
        window.location.href = 'index.html?to=login&from=manage'
    },
    toggleSidebar(){
    },
    serviceIconOverFn(){
        this.hideSideBarServiceList = false;
    },
    serviceIconOutFn(){
        this.hideSideBarServiceList = true;
    },
    toManageIndex(){
        this.$router.push('/manageIndex')
    },
    jumpToIdCard(){
        console.log('jumpToIdCard');
        var _this = this;
    this.axios.post("/token/public/list_public",{},{}).then(res=>{
        res = res.data;
        var code = res.code;
        console.log('/token/public/list_public');
        console.log(res);
        if(code=='200'){
            var publicList = res.body.projects;
            for(var z=0;z<publicList.length;z++){
                if(publicList[z].name=='身份证'){
                    console.log('有身份证项目');
                    this.$router.push({path: '/manageIdCardFinish',query: {templateId: publicList[z]["template_id"]}});
                    return;
                }
            }
            this.$router.push('/manageIdCardIndex');
            
        }else{
            console.log('code: '+code);
        }
    }).catch(function(error){
    console.log("/token/public/list_public error init."+error);
    });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#manage{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.sidebarWrapper{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 200px;
    background: #333333;
}
.sidebar-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.sidebar-item{
    position: relative;
    display: flex;
    align-items: center;
    height: 90px;
    line-height: 90px;
    background: rgba(51,51,51,1);
    font-size: 18px;
    color: #969696;
}
.sidebar-logo{
    justify-content: center;
}
.sidebar-item:hover{
    background: rgba(81,81,81);
}
.sidebar-item:hover .sidebarTxt{
    color: #ffffff;
}
.sidebarIcon{
    width: 24px;
    height: 24px;
    margin: 0 30px;
}
.sidebarTxt{
    color:#969696;
    text-align:left;
}
.sidebar-item:nth-of-type(3){
    position: relative;
}
.serviceList{
    position: absolute;
    left: 200px;
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 35px 60px 40px;
    line-height: 70px;
    background: rgba(51,51,51,0.9);
}
.serviceItem{
    font-size: 18px;
    color: #ffffff;
    white-space: nowrap;
}
.serviceItem a{
    color: #ffffff;
}
.serviceItem:hover a{
    color: #0090ff;
    /* font-size: 24px; */
}
.serviceListTitle{
    font-size: 14px;
    color: #c8c8c8;
}
.main-wrap{
    width: 100%;
    height: 100%;
    overflow: auto;
}
.main-container{
    min-height: 100%;
    margin-left: 200px;
    background:#f5f5f5;
}
.navbar{
    display: flex;
    justify-content: normal;
    flex-direction: row-reverse;
    align-items: center;
    height: 80px;
    font-size: 0;
    background: #3c3c3c;
}
.navbar img{
    width: 34px;
    margin-right: 60px;
}
.img{
    width:22px;
    height:38px;
}
#logo{
    line-height: 100%;
    text-align: center;
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
.tipBox p{
    padding: 10px;
    text-align: center;
}
</style>
