<template>
  <div class="tableBox">
    <div class="row tableTitle">
      <div class="col" v-for="(v,i) in tableTitle" :key="i">{{v}}</div>
    </div>
    <div v-if="tableData.length>0" class="row bodyRow" v-for="(v1,i1) in tableData" :key="i1" @click="jumpTo(tableData[i1])">
      <div class="col" v-for="(v2,i2) in tableTitle" :key="i2">{{v1[i2]}}</div>
    </div>
    <div v-if="tableData.length==0" class="row bodyRow">
      <div class="col">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    tableData: {
      default: []
    },
    tableTitle: {
      default: {}
    },
    type: {
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    jumpTo(obj){
      console.log(obj);
      if(obj.name=='身份证'){
        this.$router.push({path: '/manageIdCardFinish',query: {templateId: obj["template_id"]}});
      }else if(this.type=='zb'||obj.category==2){
        if(obj.type=='开发'){
          this.$router.push({path: '/ZBmodelApprovaling',query: {templateId: obj["template_id"]}});
        }else{
          this.$router.push({path: '/manageZBmodelFinish',query: {templateId: obj["template_id"]}});
        }
      }else{
        if(obj.type=='开发'){
          this.$router.push({path: '/manageCustomDevApprovaling',query: {templateId: obj["template_id"]}});
        }else{
          this.$router.push({path: '/manageCustomDevFinish',query: {templateId: obj["template_id"]}});
        }
      }
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
.bodyRow:hover{
  cursor: pointer;
}
</style>
