<template>
  <div class="tableBox">
    <div class="row tableTitle">
      <div class="col" v-for="(v,i) in tableTitle" :key="i">{{v}}</div>
    </div>
    <div class="row" v-for="(v1,i1) in tableData" :key="i1">
      <div class="col" v-for="(v2,i2) in tableTitle" :key="i2">{{v1[i2]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['tableData','tableTitle'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{
  display: flex;
  line-height: 80px;
}
.row:nth-child(even){
  background: #fafafa;
}
.col{
  flex: 1;
  text-align: center;
}
.tableTitle{
  height: 100px;
  line-height: 100px;
  font-size: 18px;
  color: #323232;
}
</style>
