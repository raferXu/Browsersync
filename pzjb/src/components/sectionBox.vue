<template>
  <div class="sectionBox">
    <div class="title" style="height: auto;">
      <img class="titleImg" v-if="obj.title.img" :src="obj.title.img" alt="title">
      <span v-else>{{obj.title.txt}}</span>
    </div>
    <ul class="listBox">
      <li class="listItem" v-for="(item,index) in obj.list" :key="index">
        <img class="listImg" :src="item.img" alt="listImg">
        <h4 class="listTitle">{{item.title}}</h4>
        <p class="listTxt">{{item.txt}}</p>
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

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sectionBox{
  padding-bottom: 160px;
}
.title{
  height: auto;
  margin-bottom: 80px;
  text-align: center;
  border: none;
}
.titleImg{
  width: 137px;
}
.listBox{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 200px;
}
.listItem{
  box-sizing: border-box;
  width: 320px;
  /* padding: 0 10px; */
  text-align: center;
}
.listImg{
  height: 68px;
  margin-bottom: 20px;
}
.listTitle{
  font-size: 24px;
  color: #333333;
  /* font-weight: normal; */
  margin-bottom: 20px;
}
.listTxt{
  text-align: left;
  font-size: 18px;
  color: #828282;
}
</style>
