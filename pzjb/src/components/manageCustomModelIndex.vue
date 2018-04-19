<template>
  <div class="manageIndexBox">
    <h3 class="title">{{title}}</h3>
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
            <i v-if="i=='name'&&value['statement']=='生效中'" @click="toFinishPage">{{v}}</i>
            <b v-else-if="i=='name'&&value['statement']!='状态'" @click="toCheckPage">{{v}}</b>
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
      title: '产品服务>自定义开发',
      obj: {
        who: '自定义OCR识别模板',
        which: '自定义 (支持识别印刷体)',
        how: '预存款，每月按实际使用量扣款'
      },
      zbModelObj: [
        {
          name: '模板名称',
          id: '项目ID',
          date: '创建时间',
          statement: '状态',
          today: '今日调用量'
        },
        {
          name: '我的自定义模板1',
          id: 'xxxxxxxxxxxx',
          date: '2018/03/01',
          statement: '待补充',
          today: '200'
        },
        {
          name: '我的自定义模板0',
          id: 'xxxxxxxxxx',
          date: '2018/02/10',
          statement: '生效中',
          today: '-'
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
      this.$router.push('/manageCustomDevIndex')
    },
    toFinishPage(){
      this.$router.push('/manageCustomDevFinish')
    },
    toCheckPage(){
      this.$router.push('/CustomDevApprovaling')
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
  font-size: 32px;
  color: #323232;
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
