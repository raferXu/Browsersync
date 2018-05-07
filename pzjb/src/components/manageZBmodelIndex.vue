<template>
  <div class="manageIndexBox">
    <h3 class="modelTitle pageTitle">{{title}}</h3>
    <div class="contentBox">
      <div class="toOpenBox">
        <div class="toOpenInfoBox">
          <p>产品服务: {{obj.who}}</p>
          <p>识别字段: {{obj.which}}</p>
          <p>计费方式: {{obj.how}}</p>
        </div>
        <div class="toOpenBtnBox">
          <div class="btn" @click="toOpen">申请开通</div>
        </div>
      </div>
      <div class="ZBmodelTable">
        <el-table  @cell-click="runto" 
            :data="zbModelObj"
            stripe
            style="width: 100%;text-align: center;">
            <el-table-column align="center"
              prop="name"
              label="模板名称">
            </el-table-column>
            <el-table-column align="center"
              prop="project_id"
              label="项目ID">
            </el-table-column>
            <el-table-column align="center"
              prop="created"
              label="创建时间">
            </el-table-column>
            <el-table-column align="center"
              prop="type"
              label="服务类别">
            </el-table-column>
            <el-table-column align="center"
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column align="center"
              prop="called_num"
              label="今日调用次数">
            </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      title: '众包模板',
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
    this.axios.post("/token/public/list_zb",{},{
      // /token/public/list_zb
        // headers: {
        //   token: "rafer"
        // }
    }).then(res=>{
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
  padding: 40px;
  border: 1px solid #f0f0f0;
}
.contentBox{
  padding: 80px;
}
.toOpenBox{
  display: flex;
  justify-content: space-between;
  padding: 40px;
  margin-bottom: 40px;
  border: 1px solid #828282;
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
  border: 1px solid #828282;
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
</style>
