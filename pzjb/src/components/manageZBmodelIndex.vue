<template>
  <div class="manageIndexBox">
    <h3 class="title">{{title}}</h3>
    <div class="contentBox">
      <div class="toOpenBox">
        <div class="toOpenInfoBox">
          <img src="../assets/images/众包录入icon.png" class="img">
        </div>
        <div class="toOpenBtnBox">
          <div class="btn btn1" @click="toOpen">申请开通</div>
        </div>
      </div>
      <div class="ZBmodelTable" v-show="zbModelObj.length>0">
        <h3 class="pageTitle bgf">项目</h3>
        <div class="tableWrap">
          <my-table :tableData="zbModelObj" :tableTitle="tableTitle"></my-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myTable from '@/components/myTable'
export default {
  name: '',
  data () {
    return {
      tableTitle: {
        "name":"模板名称",
        "project_id":"项目ID",
        "created":"创建时间",
        "type":"服务类别",
        "status":"状态" ,
        "called_num":"今日调用次数"
      },
      title: '众包录入',
      obj: {
        who: '众包文字识别',
        which: '自定义 (支持印刷体及手写体)',
        how: '预存款，每月按实际使用量扣款'
      },
      zbModelObj: []
    }
  },
  computed: {
  },
  created () {
    this.axios.post("/token/public/list_zb",{},{}).then(res=>{
      console.log(res);
      res = res.data;
      if(res.code=='200'){
        var data = res.body.projects;
        this.zbModelObj = this.zbModelObj.concat(data)
      }
      
    }).catch(function(error){
      console.log("/token/project/start error init."+error);
    })
  },
  components: {
    myTable
  },
  methods: {
    toOpen(){
      this.$router.push('/ZBmodel')
    },
    toFinishPage(i){
      var _this = this;
      this.$router.push({path:'/manageZBmodelFinish',query:{obj: _this.zbModelObj[i]}})
    },
    toCheckPage(){
      this.$router.push('/ZBmodelApprovaling')
    },
    runto(row, column, cell, event){
      var templateId = row.template_id;
      this.$router.push({path: '/manageCustomDevApprovaling',query: {templateId: templateId}});

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  height: 90px;
  line-height: 90px;
  padding-left: 40px;
  font-size:20px;
}
.contentBox{
  padding: 20px;
  background:#f5f5f5;
}
.toOpenBox{
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background:#fff;
}
.toOpenBox p{
  font-size: 24px;
  line-height: 2;
}
.toOpenBtnBox{
  display: flex;
  align-items: center;
}
.btn{
  display: inline-block;
  text-align: center;
  height: 54px;
  line-height: 54px;
  padding: 0 20px;
  color: #ffffff;
  font-size: 24px;
  background: #0090ff;
  cursor: pointer;
}
.btn:active{
  background: #68bdff;
}
.ZBmodelTable{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-size: 24px;
}
.row{
  display: flex;
  line-height: 2.5;
}
.row:nth-child(1){
  border-bottom: 1px solid #828282;
}
.col{
  flex: 1;
  text-align: center;
}
.row:not(:first-child) .col:first-child{
  color: #68bdff;
  cursor: pointer;
}
.img{
  width: 688px;
  height:120px;
}
.btn1{
  width: 130px;
  height: 54px;
  font-size:20px;
  line-height: 54px;
  padding: 0px !important;
  text-align: center;
  border-radius: 10px;
}
.main-container{
  background:#f5f5f5;
}
.title{
  background: #fff;
}
.pageTitle{
  padding: 40px 0 20px 40px;
  font-size: 24px;
  color: #323232;
  border-bottom: 1px solid #f0f0f0;
}
.tableWrap{
  font-size: 0.18rem;
  padding: 0 20px 20px;
  background: #ffffff;
}
</style>
