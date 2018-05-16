<template>
  <div class="applicationBox" :style="applicationBg">
    <div class="title">
      <img class="titleImg" v-if="obj.title.img" :src="obj.title.img" alt="title">
      <span v-else>{{obj.title.txt}}</span>
    </div>
    <ul class="listBox">
      <li class="listItem" v-for="(item,index) in obj.list" :key="index">
        <img class="listImg" :src="item.img" alt="listImg" :class="{'moveDown':index%2==1}">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['obj'],
  data () {
    return {
      applicationBg: {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../assets/images/应用场景背景.png') + ')' ,
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applicationBox{
  box-sizing: border-box;
  width: 100%;
  height: 857px;
  padding: 160px 390px;
  /* margin-bottom: 160px; */
}
.title{
  height: auto;
  margin-bottom: 80px;
  text-align: center;
  border: none;
}
.titleImg{
  width: 172px;
}
.listBox{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.listItem{
  padding-bottom: 80px;
}
.listImg{
  width: 262px;
}
.moveDown{
  position: relative;
  top: 80px;
}
</style>
