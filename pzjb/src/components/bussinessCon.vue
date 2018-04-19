<template>
  <div class="bussinessConBox">
    <h3 class="sectionTitle">{{bussinessCon.title}}</h3>
    <ul class="bsnConList">
      <li class="bsnConItem" v-for="(v,i) in bussinessCon.bussinessArr" :key="i">
        <img class="bussinessImg" :src="v.img" alt="bussinessImg">
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
  props: ['bussinessCon']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bussinessConBox{
  padding: 80px 375px 60px;
  background: #ebf6ff;
}
.sectionTitle{
  margin-bottom: 80px;
}
.bsnConList{
  display: flex;
  flex-wrap: wrap;
}
.bsnConItem{
  width: 575px;
  height: 280px;
  margin-bottom: 20px;
}
.bsnConItem:nth-child(2n+1){
  margin-right: 20px;
}
.bussinessImg{
  width: 100%;
  height: 100%;
}
</style>
