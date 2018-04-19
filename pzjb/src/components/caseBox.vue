<template>
  <div class="caseBox">
    <div class="title">
      <img class="titleImg" v-if="obj.title.img" :src="obj.title.img" alt="title">
      <span v-else>{{obj.title.txt}}</span>
    </div>
    <div class="pasxCaseBox">
      <div class="imgBox"></div>
      <div class="infoBox">
        <h4 class="name">{{obj.pasx.name}}</h4>
        <p class="desc">{{obj.pasx.txt}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['obj'],
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.caseBox{
  padding: 0 375px 80px;
}
.title{
  margin-bottom: 80px;
  text-align: center;
}
.titleImg{
  width: 153px;
}
.pasxCaseBox{
  position: relative;
  height: 330px;
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,.1);
}
.imgBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
  height: 330px;
  background: #f0f0f0;
}
.infoBox{
  padding-left: 370px;
  text-align: left;
}
.name{
  padding: 40px 0 20px;
  font-size: 24px;
  color: #333333;
}
.desc{
  font-size: 14px;
  color: #828228;
}
</style>
