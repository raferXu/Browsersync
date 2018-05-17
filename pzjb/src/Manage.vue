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
                        <router-link :to="v.to">{{v.txt}}</router-link>
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
      
  </div>
</template>

<script>
export default {
  name: 'manage',
  created () {
      var search = location.search;
      if(/to/.test(search)){
        var to = location.search.split('?')[1].split('=')[1];
        console.log('/'+to);
        this.$router.push('/'+to)
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
                // {
                //     txt: '银行卡',
                //     to: '/manageBankCardFinish'
                // },
                // {
                //     txt: '行驶证',
                //     to: '/manageDrivingCardFinish'
                // },
                // {
                //     txt: '驾驶证',
                //     to: '/manageVehicleCardFinish'
                // },
                // {
                //     txt: '医疗票据(上海)',
                //     to: '/approvaling'
                // },
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
</style>
