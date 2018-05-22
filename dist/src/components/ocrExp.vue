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
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
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
  font-size: 24px;
  color: #ffffff;
  padding: 0 20px 20px;
  border-bottom: 8px solid #0090ff;
}
.expBody{
  width: 1920px;
  height: 645px;
}

</style>
