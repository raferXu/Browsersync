<template>
  <div class="listWrap">
    <div class="imgBox tc">
      <img class="listImg" :src="listObj.url" alt="listImg">
    </div>
    <div class="mainH3B tc pt40 pb40">{{listObj.title}}</div>
    <div class="mainTxtB">{{listObj.txt}}</div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['listObj'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listImg{
  width: 75px;
}
</style>
