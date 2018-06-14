<template>
  <div class="expBox">
    <ul class="df expTitle">
      <li v-for="(v,i) in typeArr" :key="i">{{v.title}}</li>
    </ul>
    <div class="expBody" :style="expBodyStyle">
      <component :is="componentId"></component>
    </div>
  </div>
</template>

<script>
import expIdCard from '@/components/expIdCard'
export default {
  name: '',
  data () {
    return {
      expBodyStyle: {
        height: '723px',
        backgroundSize: '1920px 723px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundImage: 'url(' + require('../assets/images/OCR文字识别背景.png') + ')' 
      },
      componentId: 'expIdCard',
      typeArr: [
        {
          title: '身份证'
        }
      ]
    }
  },
  components: {
    expIdCard
  },
  created () {
    localStorage.setItem('experienceId','OCR文字识别');
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
  width: 80px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
  margin: 0 40px;
  font-size: 18px;
  color: #ffffff;
  border-bottom: 4px solid #0090ff;
}
.expBody{
  width: 100%;
  min-width: 1170px;
}
</style>
