<template>
  <div class="listWrap">
    <div class="imgBox tc">
      <img class="listImg" :src="listObj.url" alt="listImg">
    </div>
    <div class="mainH3B tc">{{listObj.title}}</div>
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
.mainH3B{
  padding: 20px 0;
  font-size:18px;
  color: #333333;
}
.mainTxtB{
  text-align: left;
  color:#828282;
  font-size:14px;
}
.listImg{
  width: 75px;
}
</style>
