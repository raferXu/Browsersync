<template>
  <div class="manageCustomDevApprovaling">
    <h2 class="sectionTitle">{{title}}</h2>
    <Row style="padding:20px;background:#f0f0f0;">
      <Row style="background:#fff;height:60px;line-height:60px;border-bottom:1px solid #f0f0f0;padding-left:30px;font-size:20px;">基本信息</Row>
      <Row style="background:#fff;padding:30px 40px;">
        <Col class="msg_module">
          <Col span="12">
            <Col span="8">创建时间:</Col><Col span="16">{{info.date}}</Col>
          </Col>
          <Col span="12">
            <Col span="8">状态:</Col><Col span="16">
              <Poptip  trigger="hover"  placement="bottom">
                <Col>
                  <p v-if="info.status_num==0" style="font-size:14px;color:#018fff;">审核中(需求审批中)</p>
                  <p v-else-if="info.status_num==1" style="font-size:14px;color:#018fff;">待补充(需求审批通过，请上传样本)</p>
                  <p v-else-if="info.status_num==2" style="font-size:14px;color:#018fff;">已失效(需求审批未通过)</p>
                  <p v-else-if="info.status_num==3" style="font-size:14px;color:#018fff;">审核中(训练集审核中)</p>
                  <p v-else-if="info.status_num==4" style="font-size:14px;color:#018fff;">待补充(样本审批未通过)</p>
                  <p v-else-if="info.status_num==5" style="font-size:14px;color:#018fff;">待付费(训练集审核通过，请缴纳训练费用)</p>
                  <p v-else-if="info.status_num==6" style="font-size:14px;color:#018fff;">生效中(模板开发中)</p>
                  <p v-else-if="info.status_num==7" style="font-size:14px;color:#018fff;">生效中(开发完毕，请试用)</p>
                </Col>
                <div class="api pop-content" slot="content">
                  <Col>状态详情：</Col>
                  <Col :class="info.status_num==0?'status_class1':info.status_num>0?'status_class4':'status_class2'">需求审批中</Col>
                  <Col v-if="info.status_num!=2 && info.status_num!=4" :class="info.status_num==1?'status_class1':info.status_num>1?'status_class4':'status_class2'">需求审核通过，请上传训练集</Col>
                  <Col v-if="info.status_num!=2 && info.status_num!=4" :class="info.status_num==3?'status_class1':info.status_num>3?'status_class4':'status_class2'">训练集审核中</Col>
                  <Col v-if="info.status_num!=2 && info.status_num!=4" :class="info.status_num==5?'status_class1':info.status_num>4?'status_class4':'status_class2'">训练集审核通过，请缴纳训练费用</Col>
                  <Col v-if="info.status_num!=2 && info.status_num!=4" :class="info.status_num==6?'status_class1':info.status_num>5?'status_class4':'status_class2'">模板开发中（7个工作日）</Col>
                  <Col v-if="info.status_num!=2 && info.status_num!=4" :class="info.status_num==7?'status_class1':info.status_num>6?'status_class4':'status_class2'">开发完毕，请试用</Col>
                  <Col v-if="info.status_num==2" :class="info.status_num==2?'status_class3':info.status_num>2?'status_class4':'status_class2'">
                    <span>已失效（需求审批未通过）：</span>
                    <p>{{info.fail_reason}}</p>
                  </Col>
                  <Col v-if="info.status_num==4" :class="info.status_num==4?'status_class3':info.status_num>4?'status_class4':'status_class2'">
                    <span>待补充（训练集审批未通过）：</span>
                    <p>{{info.fail_reason}}</p>
                  </Col>
                </div>
              </Poptip>
              
            </Col>
          </Col>
        </Col>
        <Col class="msg_module">
          <Col span="12">
            <Col span="8">服务类别:</Col><Col span="16">开发</Col>
          </Col>
          <Col span="12">
            <Col span="8">预计月调用次数:</Col><Col span="16">{{info.num}}</Col>
          </Col>
        </Col>
        <Col class="msg_module">
          <Col v-if="type=='ocr'" span="12">
            <Col span="8">字段位置信息:</Col><Col span="16">{{info.add?'需要':'不需要'}}</Col>
          </Col>
          <Col v-if="type=='zb'" span="12">
            <Col span="8">需要脱敏处理:</Col><Col span="16">{{info.add?'需要':'不需要'}}</Col>
          </Col>
          <Col span="12">
            <Col span="8">预计调用时长:</Col><Col span="16">{{info.month}}</Col>
          </Col>
        </Col>
        <Col class="msg_module">
          <Col span="12">
            <Col span="8">模板描述:</Col><Col span="16">{{info.desc}}</Col>
          </Col>
          <Col span="12">
            <Col span="8">预计调用峰值:</Col><Col span="16">{{info.max}} <span v-if="type=='ocr'">次/秒</span><span v-if="type=='zb'">字段/小时</span></Col>
          </Col>
        </Col>
        <Col v-if="type=='zb'" class="msg_module">
          <Col span="12">
            <Col span="8">时效性：</Col><Col span="16">T+1</Col>
          </Col>
        </Col>
      </Row>
      <Row style="background:#fff;padding:0 40px 30px;">
        <Col  class="table" v-show="keyList.length>0">
          <div class="tableTitle">录入字段</div>
          <div class="tbrow" v-for="(val,index) in keyList" :key="index">
            <div class="tbcol">{{index+1}}</div>
            <div class="tbcol" >{{val.key}}</div>
            <div class="tbcol" >{{val.description}}</div>
          </div>
        </Col>
      </Row>

      <Row style="background:#fff;padding:0 30px 30px;">
        <ul>
          <li v-for="(v,i) in pictureList" :key="i" style="width:190px;height:130px;margin:0 10px;float:left;">
            <img :src="v" style="width:100%;height:100%;"/>
          </li>
        </ul>
      </Row>

      <Row v-if="info.status_num==1 || info.status_num==4" style="margin-top:20px;background:#fff;">
        <h4 style="height:60px;line-height:60px;font-size:18px;border-bottom:1px solid #f0f0f0;padding-left:30px">上传训练集</h4>
        <Row style="border:1px solid #ffeccd;background:#fff5e6;color:#ffa410;">
          <Col class="modal_price_mes" style="margin-top:10px;padding-bottom:6px;"><span>请压缩上传不少于3000张清晰、具有代表性的样本文件。</span></Col>
          <Col class="modal_price_mes"><span>文件格式：压缩文件.zip，每个文件不大于1G；每张样本图片不大于5Mb，格式为JPEG\PNG。</span></Col>
          <Col class="modal_price_mes"><span>文件命名：“账号ID+模板名称+序号”，如“12345678+身份证+1”，“12345678+身份证+2”，“12345678+身份证+3”。</span></Col>
        </Row>
        <Row style="padding-top:10px;">
          <Col class="modal_price_mes" style="padding-top:10px;"><span>上传链接：</span><a :href="info.upload_link" style="color: #2d8cf0;text-decoration:underline;" target="_blank">{{info.upload_link}}</a></Col>
          <Col class="modal_price_mes" style="padding-top:10px;"><span>上传密码：</span><span>{{info.upload_password}}</span></Col>
          <Col style="text-align:right;padding:20px 60px 20px 40px"><Button @click="modalTrainingSet=true" type="primary">确认提交</Button></Col>
        </Row>
        <Modal
          v-model="modalTrainingSet">
          <Col slot="header"><h4>提示</h4></Col>
          
          <Col style="padding:30px 0 50px;text-align:center;"><span>确认已通过链接上传训练集？</span></Col>
          <Col slot="footer" ><Button @click="modalTrainingSet=false" type="primary">尚未上传</Button><Button @click="uploadOk"  type="primary">确定</Button></Col>
        </Modal>
      </Row>

      <Row v-if="info.status_num==3" style="margin-top:20px;">
        
      </Row>

      <Row v-if="info.status_num==5 || info.status_num==6" style="margin-top:20px;background:#fff;padding:0px 0px 20px 0px;">
        <h4 style="height:60px;line-height:60px;font-size:18px;border-bottom:1px solid #f0f0f0;padding-left:30px">费用</h4>
        <Col style="padding-left:40px;margin-top:20px;"><span>训练费用：</span><span>{{info.testing_fee}}</span><span  v-if="info.status_num==5">元（待付费）</span><span  v-if="info.status_num==6">元（已付费）</span></Col>
        <Col v-if="info.status_num==5" style="text-align:right;padding:20px 60px 0px 40px"><Button @click="modalPrice=true" type="primary">立即付费</Button></Col>
        <Modal
          v-model="modalPrice">
          <Col slot="header"><h4>付费信息</h4></Col>
          <Col class="modal_price_mes" style="height:60px;line-height:60px;border-bottom:1px solid #f0f0f0;"><span>支付方式：</span><span v-if="info.balance>info.testing_fee"><span>使用可用余额: </span><span> ￥ </span><span>{{info.balance}}</span></span><span v-else style="color:red;">余额不足</span></Col>
          <!-- <Col class="modal_price_mes"><span>使用可用余额: <span></span> ￥ </span><span>1234567890.00</span><span>余额不足</span></Col> -->
          <Col class="modal_price_mes" style="margin-top:10px;"><span v-if="type=='ocr'">定制化识别模板训练费用</span><span v-if="type=='zb'">众包录入模板训练费用</span><span><span>￥</span><span>{{info.testing_fee}}</span></span></Col>
          <Col class="modal_price_mes"><span>模板名称：</span><span>我的定制化模板1</span></Col>
          <Col class="modal_price_mes"><span>开发时长：7 个工作日</span></Col>
          <Col class="modal_price_mes"><Span>提示：确认支付后不能申请退回训练费用</Span></Col>
          <Col slot="footer" ><Button  v-if="info.balance>info.testing_fee" @click="pay" type="primary">确认付费</Button><Button v-else @click="toRecharge" type="primary">充值</Button></Col>
        </Modal>
      </Row>

      <Row v-if="info.status_num==7" style="margin-top:20px;background:#fff;padding:0px 0px 20px 0px;">
        <h4 style="height:60px;line-height:60px;font-size:18px;border-bottom:1px solid #f0f0f0;padding-left:30px">服务试用</h4>
        <Row style="padding-left:40px;margin-top:20px;"><span>训练费用：</span><span>{{info.testing_fee}}</span><span>元（已付费）</span></Row>
        <Row style="padding-left:40px;margin-top:20px;line-height:40px;">
          <Col span="4"><span>立即试用：</span></Col>
          <Col span="6">
              <input multiple type="file" ref='upload' @change="upload" style='display:none'>
              <Button type="ghost"  @click='uploadfile'>上传试用图片</Button>
            
          </Col>
          <Col v-if="percent>0" span="8">
            <Progress :percent="percent" ></Progress>
          </Col>
        </Row>
        <Row style="padding-left:40px;margin-top:20px;"><span>剩余试用次数：<span></span>{{info.remaining_frame_count}} 次</span></Row>
        <Row style="padding-left:40px;margin-top:20px;"><span>*</span><span>可上传多张图片，图片在3MB以下，格式为JPEG/PNG。</span></Row>
        <Row style="padding-left:40px;margin-top:20px;"><span>若对此次OCR开发效果需要进一步优化，可联系0755-12345678咨询精度优化方案。</span></Row>
        <Row style="text-align:right;padding:50px 40px 20px;"><Button @click="downloadCSV" type="primary">下载答案</Button></Row>
      </Row>

      <Row v-if="info.status_num==7" style="margin-top:20px;background:#fff;padding:0px 0px 20px 0px;">
        <h4 style="height:60px;line-height:60px;font-size:18px;border-bottom:1px solid #f0f0f0;padding-left:30px">服务开通</h4>
        <Col style="padding-left:40px;margin:20px 0;"><span>开通后月调用费：</span><span v-if="type=='zb'">{{info.calling_price}} 元/次</span></Col>
        <Col v-if="type=='ocr'" style="padding:0 40px;">
          <Table border :columns="columnsTitle" :data="data1"></Table>
        </Col>
        <Col style="text-align:right;padding:20px 40px;"><Button type="primary">立即开通</Button></Col>
      </Row>


    </Row>
    


    
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      files:[],
      templateId:'',
      type:'ocr',
      percent:0,
      modalTrainingSet:false,
      modalPrice:false,
      baseUrl:'',
      pictureList:[],
      keyList:[],
      proofFileName: '',
      statementArr: ['需求审批中','需求审批通过，请上传样本','审核样本中','样本审核通过，请缴纳训练费用','模板开发中 (7个工作日)','开发完毕，请试用'],
      tipsBoxShow: false,
      title: '我的自定义开发',
      info: {
        name: '我的自定义开发',
        page: '2',
        date: '2018年5月12日 12:39',
        state: 0,
        desc: '1',
        num: '1-1000',
        month: '10',
        max: '100',
        add: false,
        status_num:0
      },
      columnsTitle:[
          {
              title: '月调用次数',
              key: 'times',
              align:"center"
          },
          {
              title: '调用单价',
              key: 'price',
              align:"center"              
          }
      ],
      data1:[]
    }
  },
  computed: {
    statement(){
      return this.statementArr[this.info.state];
    }
  },
  created () {
    console.log(this.axios.defaults)
    this.baseUrl = this.axios.defaults.baseURL;
    var templateId = this.$route.query.templateId;
    var type = this.$route.query.type;
    this.type = type;
    this.templateId = templateId;
    console.log(type)
    if(templateId){
      this.axios.post("/token/template/"+type+"/detail",{"template_id": templateId},{
        // headers: {
        //   token: "rafer"
        // }
      }).then(res=>{
        res = res.data;
        console.log(res)
        if(res.code=='200'){
          var data = res.body;
          this.title = data.name;
          this.info.name = data.name;
          this.info.page = data.page_count;
          this.info.date = data.created.split(' ')[0];
          this.info.state = data['status_num'];
          this.info.num = data.expected_frequency;
          this.info.month = data.expected_duration;
          this.info.max = data.expected_peak;
          this.info.add = data.mark_overlaid;
          this.info.desc = data['description'];
          this.info.status_num = data.status_num;
          if('fail_reason' in data){
            this.info.fail_reason = data.fail_reason;
          }
          
          if('testing_fee' in data){
            this.info.testing_fee = data.testing_fee;
          }
          if('balance' in data){
            this.info.balance = data.balance;
          }
          if('upload_link' in data){
            this.info.upload_link = data.upload_link;
          }
          if('remaining_frame_count' in data){
            this.info.remaining_frame_count = data.remaining_frame_count;
          }
          // if(data.status_num == 7){
          //   this.info.remaining_frame_count = data.remaining_frame_count;
          // }
          if('upload_password' in data){
            this.info.upload_password = data.upload_password;
          }
          this.keyList = data["key_list"];
          // this.pictureList = data.pictures_fields;
          for(let i = 0;i<data.pictures_fields.length;i++){
            this.pictureList.push(this.baseUrl+data.pictures_fields[i].marked_pic_url);
          }
          // var tableData = [];
          if('calling_price' in data){
            for(let i = 0;i<data.calling_price.price.length;i++){
              let item = {};
              item.price = data.calling_price.price[i].price + " 元/次";
              item.times = data.calling_price.price[i].down +'-'+ data.calling_price.price[i].up;
              this.data1.push(item);
            }
          }
          if(this.type == 'zb'){
            this.info.calling_price = data.calling_price.price;
          }
        }
        
      }).catch(function(error){
        console.log("/token/template/detail error init."+error);
      })
      
    }
  },
  components: {
  },
  methods: {
    downloadCSV(){
      // alert(localStorage.getItem('token'));
      let _this = this;
      // window.open(_this.axios.defaults.baseURL+'/token/API/retrieve_answer/all_csv/'+_this.templateId);
      var downloadUrl = _this.axios.defaults.baseURL+'/token/API/retrieve_answer/all_csv/'+_this.templateId;
      // this.axios({
      //   url: downloadUrl,
      //   method: "POST",
      //   responseType: 'blob',
      //   headers: {
      //     'Content-Type':'text/cvs'
      //   }
      // }).then(res=>{
      //   const content = res
      //   const blob = new Blob([content])
      //   const fileName = '测试表格123.csv'
      //   if ('download' in document.createElement('a')) { // 非IE下载
      //     const elink = document.createElement('a')
      //     elink.download = fileName
      //     elink.style.display = 'none'
      //     elink.href = URL.createObjectURL(blob)
      //     document.body.appendChild(elink)
      //     elink.click()
      //     URL.revokeObjectURL(elink.href) // 释放URL 对象
      //     document.body.removeChild(elink)
      //   } else { // IE10+下载
      //     navigator.msSaveBlob(blob, fileName)
      //   }
      // })
      // var form = $("<form></form>").attr("action", downloadUrl).attr("method", "post");
      var form = $("<form>");//定义一个form表单  
      form.attr("id", "downloadform");  
      form.attr("style", "display:none");  
      form.attr("target", "");  
      form.attr("method", "post");  
      form.attr("action", downloadUrl);  
      
      var input1=''
      input1=_this.appendInput('token',localStorage.getItem('token'));
      form.append(input1);  
     
      $("body").append(form);//将表单放置在web中  
      form.submit();//表单提交 
    },
    appendInput(key,value){
      let input1 = $("<input>");   
      input1.attr("type", "hidden");  
      input1.attr("name", key); 
      input1.attr("value", value); 
      return input1      
    },
    uploadfile(){
      this.$refs.upload.click();
    },
    upload(){
      let self=this;
      let files=this.$refs.upload.files;
      console.log(files)
      if(files.length<1){
        return false;
      }
      for(let i=0,len=files.length;i<len;i++){
        // console.log(files[i])
        if (window.FileReader) {    
          // console.log(files[i].name)
          var name = files[i].name;
          var reader = new FileReader();    
          reader.readAsDataURL(files[i]);    
          //监听文件读取结束后事件    
          reader.onloadend = function (e) {
              // $(".img").attr("src",e.target.result);    //e.target.result就是最后的路径地址
              console.log(files[i])
              var _fileName = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
              if (_fileName !== "png" && _fileName !== "jpg" && _fileName !== "bmp" && _fileName !== "jpeg") {
                  alert("上传图片格式不正确，请重新上传");
                  return false;
              }
              self.files.push({
                  src:e.target.result,
                  name:name    
              })
              self.uploadImg = e.target.result;
              // console.log(12345)
              self.showUploadImg = true;
          }; 
        }
      }
      let formdata = new FormData();
      for(let i=0;i<files.length;i++){
          formdata.append('files',files[i]);  
      }
      this.axios({
        url:'/token/API/add_task/'+this.type+'/'+this.templateId,
        method:'post',
        data:formdata
      }).then(res=>{
        console.log(res);
        if(res.data.code == 200){
          this.info.remaining_frame_count = res.data.body.remaining_count;
          this.percent = 0;
          this.progressAdd();
        }
      })
    },
    progressAdd(){
      let self=this
      let time=setInterval(function(){
          self.percent++
          if(self.percent>=100){
              clearInterval(time)
          }
      },10)
    },
    uploadOk(){
      let _this = this;
      this.axios({
        url:'/token/template/'+_this.type+'/upload_sample',
        method:'post',
        data:{'template_id':_this.templateId}
      }).then(function(res){
        console.log(res);
        if(res.data.code == 200){
          // _this.info.status_num = 3;
          _this.modalTrainingSet=false
          window.location.reload()
        }
      })
    },
    toRecharge(){
      this.$router.push('/rechargePage');
    },
    pay(){
      let _this = this;
      this.axios({
        url:'/token/template/'+_this.type+'/pay_for_template',
        method:'post',
        data:{'template_id':_this.templateId}
      }).then(function(res){
        console.log(res);
        if(res.data.code == 200){
          window.location.reload()
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg_module{
  padding-bottom: 40px;
  font-size:14px;
}
.pop-content{
    width:246px;
    margin: 0;
    padding:0;
    white-space: normal;
    font-size:14px;
}
.status_class1{
  color:#00c800;
}
.status_class2{
  color:#828282;
}
.status_class3{
  color:#ff3b30;
}
.status_class4{
  color:#333;
}
.table{
  font-size: 14px;
  color: #333333;
}
.tableTitle{
  margin-bottom: 20px;
}
.tbrow{
  display: flex;
  height: 54px;
  line-height: 54px;
  text-align: center;
}
.tbcol{
  border-top: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
  overflow-y: hidden;
  overflow-x: auto;
}
.tbrow .tbcol:nth-child(1){
  width: 70px;
}
.tbrow .tbcol:nth-child(2){
  width: 176px;
}
.tbrow .tbcol:nth-child(3){
  width: 576px;
  border-right: 1px solid #f0f0f0;
}
.tbrow:last-child .tbcol{
  border-bottom: 1px solid #f0f0f0;
}
.modal_price_mes{
  padding:10px 40px;
}
</style>
<style>
.manageCustomDevApprovaling .ivu-modal-body{
  padding:0 0 20px 0;
}
</style>
