<template>
  <div class="applicationBox">
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applicationBox{
  width: 1170px;
  height: 857px;
  margin: 0 auto;
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
