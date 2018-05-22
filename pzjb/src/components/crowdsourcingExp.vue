<template>
  <div class="expBox">
    <ul class="df expTitle">
      <li :class="{'active':i==tabIndex}" @click="tabTo(v.id,i)" v-for="(v,i) in typeArr" :key="i">{{v.title}}</li>
    </ul>
    <div class="expBody" :style="expBodyStyle">
      <component :is="componentId"></component>
    </div>
  </div>
</template>

<script>
import expCrowdCheck from '@/components/expCrowdCheck'
import expCrowdInput from '@/components/expCrowdInput'
export default {
  name: '',
  data () {
    return {
      tabIndex: 0,
      expBodyStyle: {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../assets/images/OCR文字识别背景.png') + ')' 
      },
      componentId: 'expCrowdCheck',
      typeArr: [
        {
          title: '众包校验',
          id: 'expCrowdCheck'
        },
        {
          title: '众包录入',
          id: 'expCrowdInput'
        }
      ]
    }
  },
  methods: {
    tabTo(v,i){
      this.componentId = v;
      localStorage.setItem('crowdsourcingExp',v);
      this.tabIndex = i;
    }
  },
  components: {
    expCrowdCheck,expCrowdInput
  },
  created () {
    localStorage.setItem('experienceId','众包服务');
    var exp = localStorage.getItem('crowdsourcingExp');
    if(exp=='expCrowdCheck'){
      this.componentId = exp;
      this.tabIndex = 0;
    }else if(exp=='expCrowdInput'){
      this.componentId = exp;
      this.tabIndex = 1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.expBox{
  position: relative;
}
.expTitle{
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: -6px;
}
.expTitle li{
  font-size: 24px;
  color: #ffffff;
  padding: 0 20px 20px;
  border-bottom: 8px solid transparent;
}
.expTitle li:hover{
  cursor: pointer;
}
.expTitle li.active{
  border-bottom-color: #0090ff;
}
.expBody{
  width: 1920px;
  height: 645px;
}

</style>
