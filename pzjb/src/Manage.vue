<template>
  <div id="manage" :class="{'hideSidebar':hideSidebar}">
      <div class="sidebarWrapper" @click="toggleSidebar">
        <ul class="sidebar-container">
            <li class="sidebar-item" style="color:#ffffff;text-align:center;font-size:12px;">
                <a href="index.html">返回<br>主页</a>
            </li>
            <li class="sidebar-item" @click="toManageIndex">
                <!-- <img :src="summaryIcon" alt="summary"> -->
                <el-tooltip class="item" effect="dark" content="概览" placement="right" style="opacity: 0;">
                    <el-button></el-button>
                </el-tooltip>
                <i class="sidebarIcon summaryIcon"></i>
            </li>
            <li class="sidebar-item" @mouseover="serviceIconOverFn" @mouseout="serviceIconOutFn">
                <!-- <img :src="serviceIcon" alt="service"> -->
                <i class="sidebarIcon serviceIcon"></i>
                <ul class="serviceList" v-show="!hideSideBarServiceList">
                    <li class="serviceItem">
                        <span class="serviceListTitle">{{serviceData.title}}</span>
                    </li>
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
                <router-link to="/manageIndex">
                    <img :src="userIcon" alt="user" title="用户中心">
                </router-link>
                <router-link to="/ZBmodelApprovaling">
                    <img :src="mailIcon" alt="mail" title="消息中心">
                </router-link>
                <router-link to="/manageIssue">
                    <img :src="issueIcon" alt="issue" title="遇到问题">
                </router-link>
                <router-link to="/manageAccount">
                    <img :src="accountIcon" alt="account" title="账户管理">
                </router-link>
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
        hideSidebar: true,
        userIcon: require('./assets/images/manage/显示用户名.png'),
        mailIcon: require('./assets/images/manage/消息.png'),
        issueIcon: require('./assets/images/manage/遇到问题.png'),
        summaryIcon: require('./assets/images/manage/概览.png'),
        serviceIcon: require('./assets/images/manage/产品服务.png'),
        accountIcon: require('./assets/images/manage/账户管理.png'),
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
                    txt: '身份证',
                    to: '/manageIdCardIndex'
                },
                {
                    txt: '银行卡',
                    to: '/manageBankCardFinish'
                },
                {
                    txt: '行驶证',
                    to: '/manageDrivingCardFinish'
                },
                {
                    txt: '驾驶证',
                    to: '/manageVehicleCardFinish'
                },
                {
                    txt: '医疗票据(上海)',
                    to: '/approvaling'
                },
                {
                    txt: '自定义OCR模板',
                    to: '/manageCustomModelIndex'
                },
                {
                    txt: '众包',
                    to: '/manageZBmodelIndex'
                }
            ]
        }
    }
  },
  methods: {
      toggleSidebar(){
        //   this.hideSidebar = !this.hideSidebar;
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
    width: 160px;
    background: #333333;
    /* overflow: hidden; */
    transition: all .28s ease-out;
}
.hideSidebar .sidebarWrapper{
    transform: translate(-100px);
}
.sidebar-container{
    transition: all .28s ease-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* overflow-y: scroll; */
}
.hideSidebar .sidebar-container{
    transform: translate(99px);
}
.sidebar-item{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    /* overflow: hidden; */
    background: rgba(51,51,51,1);
}
.sidebar-item:hover{
    background: rgba(81,81,81);
}
.sidebarIcon{
    width: 16px;
    height: 16px;
}
.summaryIcon{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    /* background: url('./assets/images/manage/概览.png') 100% 100% no-repeat; */
    background: url('static/images/概览.png') no-repeat;
    background-size:  100% 100%;
}
.sidebar-item:nth-of-type(2):hover .summaryIcon{
    background: url('static/images/概览(蓝).png') no-repeat;
    background-size:  100% 100%;
}
.serviceIcon{
    background: url('static/images/产品服务.png') no-repeat;
    background-size:  100% 100%;
}
.sidebar-item:nth-of-type(3){
    position: relative;
}
.sidebar-item:nth-of-type(3):hover .serviceIcon{
    background: url('static/images/产品服务(蓝).png') no-repeat;
    background-size:  100% 100%;
}
.serviceList{
    position: absolute;
    left: 59px;
    top: 0;
    display: flex;
    flex-direction: column;
    /* width: 140px; */
    padding: 20px;
    line-height: 1.8;
    background: rgba(51,51,51,0.9);
}
.serviceItem{
    font-size: 12px;
    color: #ffffff;
    white-space: nowrap;
}
.serviceItem:not(:first-child):hover a{
    color: #0090ff;
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
    transition: all .28s ease-out;
    margin-left: 160px;
}
.hideSidebar .main-container{
    box-sizing: border-box;
    margin-left: 60px;
}
.main-container .navbar{
    display: flex;
    justify-content: normal;
    flex-direction: row-reverse;
    align-items: center;
    height: 60px;
    padding-right: 50px;
    font-size: 0;
    border-bottom: 10px solid #f0f0f0;
}
.navbar img{
    width: 34px;
    margin-right: 30px;
}
</style>
