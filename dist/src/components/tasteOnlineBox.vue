<template>
  <div class="tasteOnlineBox">
    <h3 class="sectionTitle">{{tasteObj.title}}</h3>
    <ul class="tasteList">
      <li class="tasteItem" v-for="(v,i) in tasteObj.tasteArr" :key="i">
        <div class="tasteImgBox">
          <img class="tasteOnlineImg" :src="v.img" alt="tasteOnlineImg">
        </div>
        <a v-if="v.link" class="tasteTxtBox" :href="v.link">{{v.txt}}</a>
        <router-link v-else class="tasteTxtBox" :to="v.to">{{v.txt}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['tasteObj']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sectionTitle{
  margin-bottom: 80px;
}
.tasteOnlineBox{
  padding: 80px 375px 40px;
  background: #ebf6ff;
}
.tasteList{
  display: flex;
  flex-wrap: wrap;
}
.tasteItem{
  display: flex;
  flex-direction: column;
  width: 376px;
  margin-bottom: 40px;
}
.tasteItem:nth-child(3n+2){
  margin: 0 20px;
}
.tasteImgBox{
  height: 220px;
}
.tasteOnlineImg{
  width: 376px;
  height: 100%;
}
.tasteTxtBox{
  height: 64px;
  line-height: 64px;
  text-align: center;
  color: #0090ff;
  background: #ffffff;
}
.tasteTxtBox:hover{
  color: #ffffff;
  background: #0090ff;
}
</style>
