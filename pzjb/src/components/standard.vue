<template>
  <div class="standardWrap">
    <h3 class="mainH3B pb80 tc">{{standardData.title}}</h3>
    <p class="mainTxtB pb40 tl">{{standardData.txt}}</p>
    <div class="imgBox">
      <img class="standardImg" :src="standardData.url" alt="standardImg">
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['standardData'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.standardImg{
  width: 100%;
}
.mainTxtB{
  color:#828282;
}
</style>
