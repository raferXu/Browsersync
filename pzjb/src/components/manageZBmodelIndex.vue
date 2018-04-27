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
        <div class="row" v-for="(value,index) in zbModelObj" :key="index">
          <div class="col" v-for="(v,i) in value" :key="i">
            <i v-if="i=='name'&&value['state']=='生效中'" @click="toFinishPage(index)">{{v}}</i>
            <b v-else-if="i=='name'&&value['state']!='状态'" @click="toCheckPage">{{v}}</b>
            <span v-else>{{v}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      title: '产品服务>众包模板',
      obj: {
        who: '众包文字识别',
        which: '自定义 (支持印刷体及手写体)',
        how: '预存款，每月按实际使用量扣款'
      },
      zbModelObj: [
        {
          name: '模板名称',
          id: '项目ID',
          date: '创建时间',
          state: '状态',
          today: '今日调用量'
        },
        {
          name: '众包1',
          id: '12345612',
          date: '2018/03/02',
          state: '生效中',
          today: '500'
        },
        {
          name: '众包2',
          id: '12345613',
          date: '2018/03/01',
          state: '生效中',
          today: '500'
        },
        {
          name: '众包3',
          id: '12345614',
          date: '2018/03/02',
          state: '生效中',
          today: '500'
        },
        {
          name: '众包4',
          id: '12345615',
          date: '2018/03/01',
          state: '生效中',
          today: '500'
        }
      ]
    }
  },
  computed: {
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
