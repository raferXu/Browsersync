<template>
  <div class="manageIndexBox">
    <h3 class="title">{{title}}</h3>
    <div class="contentBox">
      <div class="toOpenBox">
        <div class="toOpenInfoBox">
          <img :src="content.img" class="img">
          <div class="textBox">
            <h3>{{content.title}}</h3>
            <p><span>识别内容:</span>{{content.content}}</p>
            <p><span>支持对象:</span>{{content.object}}</p>
            <p><span>计费方式:</span>{{content.fee}}</p>
          </div>
        </div>
        <div class="toOpenBtnBox">
          <div class="btn btn1" @click="toOpen">{{content.btn}}</div>
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
      title: '定制化识别服务',
      content: {
        img: require('../../assets/images/定制化识别服务icon.png'),
        btn: '申请开通',
        title: '定制化识别服务',
        content: '自定义模板',
        object: '各式印刷体',
        fee: '预存款，每月按实际使用量扣款，具体费用以实际报价为准'
      },
      tableTitle: {
        "name":"模板名称",
        "project_id":"项目ID",
        "created":"创建时间",
        "type":"服务类别",
        "status":"状态" ,
        "called_num":"今日调用次数"
      },
      zbModelObj: [
      ]
    }
  },
  computed: {
  },
  components: {
    myTable
  },
  created () {
    this.axios.post("/token/public/list_ocr",{},{
    }).then(res=>{
      res = res.data;
      if(res.code=='200'){
        var data = res.body.projects;
        this.zbModelObj = this.zbModelObj.concat(data)
        console.log(this.zbModelObj)
      }
    }).catch(function(error){
      console.log("/token/project/start error init."+error);
    })
  },
  methods: {
    toOpen(){
      this.$router.push('/manageCustomDevIndex')
    },
    toFinishPage(){
      this.$router.push('/manageCustomDevFinish')
    },
    toCheckPage(){
      this.$router.push('/CustomDevApprovaling')
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
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  min-width: 930px;
  padding: 30px;
  background:#fff;
}
.toOpenBox p{
  font-size: 20px;
  line-height: 2;
}
.toOpenBtnBox{
  display: flex;
  align-items: flex-start;
}
.btn{
  display: inline-block;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border: 1px solid #0090ff;
  color: #0090ff;
  font-size: 20px;
  background: #ffffff;
  cursor: pointer;
}
.btn:active,.btn:hover{
  background: #0090ff;
  color: #ffffff;
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
.toOpenInfoBox{
  display: flex;
}
.img{
  width: 75px;
  height: 75px;
}
.textBox{
  padding-left: 30px;
}
.contentBox h3{
  font-size: 18px;
  color: #323232;
  padding-bottom: 20px;
}
.contentBox p{
  line-height: 20px;
  font-size: 14px;
  color: #323232;
}
.contentBox span{
  padding-right: 20px;
  color: #828282;
}

.btn1{
  width: 130px;
  height: 40px;
  font-size:20px;
  line-height: 40px;
  padding: 0px !important;
  text-align: center;
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
