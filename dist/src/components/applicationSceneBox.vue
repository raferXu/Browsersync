<template>
  <div class="applicationSceneBox">
    <h3 class="sectionTitle">{{apsObj.title}}</h3>
    <div class="imgBox">
      <img v-for="(v,i) in apsObj.imgArr" :key="i" :src="v" alt="applicationSceneImg">
    </div>
    <consultAndTryBtnG></consultAndTryBtnG>
  </div>
</template>

<script>
import consultAndTryBtnG from './consultAndTryBtnG'

export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['apsObj'],
  components: {
    consultAndTryBtnG
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applicationSceneBox{
  padding: 160px 415px;
}
.sectionTitle{
  margin-bottom: 80px;
}
.imgBox{
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
.imgBox img{
  width: 350px;
  height: 350px;
}
</style>
