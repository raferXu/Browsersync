<template>
  <div>
    <Row style='background:#fff;'>
        <Col span="24" offset="" class="title" style="" >申请定制化识别服务</Col>
      <Col span="24" offset="0">
      <Row style="padding: 20px;background:#f5f5f5;">
        <Col  span="22" offset="2"><Card :bordered="false" dis-hover>
          <Steps :current="current">
              <Step  content="上传图片"></Step>
              <Step  content="字段标注"></Step>
              <Step  content="上传样本集"></Step>
              <Step  content="完善信息"></Step>
              <Step  content="提交审核"></Step>
          </Steps>
        </Card></Col>
      </Row>
      </Col>
    </Row>
    <Row style='padding:1px 0px;background:#f5f5f5;'>
      <!-- <Col span="17" offset="1"> -->
      <div style="padding: 40px;background:#fff;">
        <Tabs :value='value'>
            <TabPane disabled label=""  name='name0'>
                <div v-if="current == 0" style="">
                    <Row style='margin-bottom:20px'>
                        <Col span='2' offset="">
                            <Card :bordered="false"  dis-hover>
                                <ul class='img' style="height:300px;width:100%;background:#f5f5f5;">
                                    <li v-for='item,index in files' style="position:relative;"  class="list1">
                                        <img @click="selectImgShow(item,index)" :src="item.src" width="100%" alt="">
                                        <a style="position:absolute;top:0px;right:0px;z-index:1234;" href="#" slot="extra" @click.prevent="del(index)">
                                            <Icon type="close-circled"></Icon>
                                        </a>
                                    </li>
                                </ul>
                                <Col span='24'  offset="0">
                                <input multiple type="file" ref='upload' @change="upload" style='display:none'>
                                <Button style="margin-top:10px;width:100%;"  size="large" type="primary"  @click='uploadfile'>
                                    
                                        <!-- <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon> -->
                                        <!-- <p>上传</p> -->
                                    上传
                                </Button>
                                </Col>
                            </Card>
                        </Col>
                        <Col span='8' style="padding-left:10px;" >
                            <Card :bordered="false" id="canvas_box" style='height:300px'  dis-hover>
                                <div style="width:100%;height:300px;background:#f5f5f5;">
                                    <div  v-if="!showUploadImg" @click='uploadfile' style="padding: 20px 0;width:100%;text-align:center;cursor:pointer;padding-top:103px;">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击上传所需识别的图片</p>
                                    </div>
                                    <!-- <p  v-if="!showUploadImg">请上传图片！</p> -->
                                    <img v-if="showUploadImg" :src='uploadImg' style="width:100%;height:100%;" >
                                </div>
                                   
                            
                                <!-- <div  @click='upload' style="padding: 20px 0;width:100%;text-align:center;cursor:pointer;">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>点击上传所需识别的图片</p>
                                </div> -->
                                <Col span="24" offset="" style="font-size:12px;margin-top:10px;">请点击上传所需识别的图片，每张图片不大于5Mb，格式可为JPEG\PNG。</Col>
                            </Card>
                        </Col>
                        <Col span='14' offset="" style="padding-left:40px;" >
                            <Form :model="formItem" label-position="top"  >
                                <FormItem label="模板名称" required>
                                    <Input v-model="formItem.input1"></Input>
                                </FormItem>
                            </Form>
                            <div>
                                <Col>提示：</Col>
                                <Col>1. 支持上传同一文档/票据/证件的多张不同图片，如一张证件的正、反面。</Col>
                                <Col>2. 模板名称可设置为需要识别的图片类型，如“增值税发票”、“的士票”等，设置后不能更改。</Col>
                            </div>
                        </Col>
                    </Row> 
                </div>
                
                
            </TabPane>
            <TabPane label=""  disabled name='name1'>
                <div v-if="current == 1">
                <Row style='margin-bottom:10px;padding: 0 ;'>
                    <Col span="24"><div class="paint_mes" style="margin-bottom:10px;color:#333;">按下并移动鼠标在每张图片中框选出识别字段所在区域，添加对应字段名及字段描述。</div></Col>
                    <Col span='2' offset=''>
                        <Card :bordered="false" dis-hover>
                            <ul class='img' style="height:300px;width:100%;background:#f5f5f5;">
                                <li style="width:100%;margin-right:5px;position:relative;" v-for='item,index in files' class="list" >
                                    <img :src="item.src" width="100%" alt="" @click='showImg(index)'>
                                    <!-- <a style="position:absolute;top:0px;right:0px;z-index:1234;" href="#" slot="extra" @click.prevent="del(index)">
                                        <Icon type="close-circled"></Icon>
                                    </a> -->
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span='8' offset='' style="padding-left:10px;" >
                        <Card :bordered="false" style='height:300px' dis-hover>
                            
                           <Pic ref='pic' @showImg="showImg" :files="files" :canvasHeight="canvasHeight" :canvasWidth="canvasWidth" @deleteMes="deleteMes" @addItem="addItem" :originImg="originImg" :saveFilesNum="saveFilesNum" :index="index" :percent1="percent1" :filesName="filesName"></Pic>
                        </Card>
                    </Col>
                    <Col span="12" style="padding-left:40px;">
                        <!-- <div style="margin-bottom:40px;">请框选需要识别的字段区域</div>
                        <Button class="btn1" style="margin-bottom:40px;" type="primary">框选</Button><br/>-->
                        
                        <Card :bordered="false" style='margin-top:20px;' dis-hover>
                            <Col :span="10" style="text-align:left;">
                                <span style="color:#f05a3b;">*</span>字段名 <Poptip  trigger="hover"  placement="bottom">
                                        <Icon  type="ios-information-outline" color="#0090ff"  />
                                         <div class="api pop-content" slot="content" style="">如框选区域中的信息为“广东省深圳市福田区八卦三路平安大厦”，则字段名应填写为“地址”，不超过8个中文字符</div>
                                    </Poptip>
                            </Col>
                            <Col :span="13"  offset="1"  style="text-align:left">
                                <span style="color:#f05a3b;">*</span>字段描述 <Poptip trigger="hover"   placement="bottom">
                                            <Icon type="ios-information-outline" color="#0090ff"  />
                                            <div class="api pop-content" slot="content" style="">描述该字段的预估字段内容（如需识别的信息范围、文字种类）、字段长度等</div>
                                        </Poptip>
                            </Col>
                            <Col span="24" offset="">
                            <div v-for='item,index in saveImg' :key='index' style='margin:20px 0;height:32px;'> 
                                <Col span="10">
                                    <Input  v-model='item.value'>
                                        <div style="width:20px;height:20px;line-height:20px;text-align:center;" slot="prepend">{{index+1}}</div>         
                                    </Input>
                                </Col>
                                <Col span="13" offset="1">
                                    <Input  v-model='item.value1'>
                                    </Input>
                                </Col>
                            </div>
                            </Col>
                           
                        </Card>
                    </Col>
                    
                    <Col span="24" offset="0" style="margin-top:10px;">
                        <Col span="12"><div style="margin-bottom:10px;padding-right:80px;">提示：框选的范围需要考虑到后期该字段可能产生的偏移情况，框选时可以略微放大框选区域以防信息遗漏。</div></Col>
                        <Col span="24"><Button class="btn1" style="" type="primary" @click='reset'>重置</Button> </Col>
                    </Col>
                </Row>   
                <Row>
                    <Card :bordered="false" dis-hover>
                        <Row>
                            <Col span='6' offset="1">
                                <!-- <input multiple type="file" ref='upload' @change="upload" style='display:none'>
                                <div style='margin-bottom:5px'>
                                    <Button class="btn1" type="primary" @click='uploadfile'>本地上传</Button>
                                </div> -->
                                    <!-- <div style='text-align:center'>
                                        <Button type="primary" @click='save'>保存图片</Button>
                                </div> -->
                            </Col>
                            <!-- <Col span='18'>
                                <div class='files' v-for='item,index in files'>
                                    <Icon type="android-folder"></Icon>
                                    <span style='margin-right:10px;'>{{item.name}}</span>
                                        <a href="#" slot="extra" @click.prevent="del(index)" style='margin-right:10px'>
                                        <Icon type="close-circled"></Icon>
                                    </a>
                                </div>
                            </Col> -->
                        </Row>
                        <!-- <Col span="20" offset="1" style="font-size:12px;">提示：支持上传一种类型的证件／票据／文档的扫描图，每页大小不超过xxMB，长边不超过xxxx像素的png,jpg,jpeg,bmp图片。</Col> -->
                    </Card>
                </Row>
                    <!-- <Row>
                        <Card :bordered="false" style='margin-top:20px' dis-hover>
                            <Col span="13" offset="1"><div v-for='item,index in saveImg' :key='index' style='margin-bottom:5px'> 
                                 <Input  v-model='item.value'>
                                     <span slot="prepend">{{index+1}}</span>         
                                </Input>    
                            </div></Col>
                           
                        </Card>
                    </Row> -->
                    </div>
            </TabPane>
            <TabPane label=""  disabled name='name2' style="padding:40px;"><Col style="">
                <div id="uploadm" v-if="current == 2" >
                <Upload
                    multiple
                    type="drag"
                    :before-upload="handleUpload"
                    style="border:none;"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <div style="border:1px solid #2d8cf0;color:#2d8cf0;width:200px;height:40px;line-height:40px;text-align:center;font-size:16px;margin:5px auto;">点击上传样本集压缩包</div>
                        <p>请上传不少于20份与模版标注图片相同类型的图片作为样本集，压缩文件格式为.zip</p>
                        <p>样本图片规格为：每张图片不大于5Mb，格式可以为JPEG/PNG</p>
                    </div>
                </Upload>
                <Col v-show="showPer" span="8" offset="8"><div>
                    <Progress :percent="percent" ></Progress>
                    <Button v-if="percent==100" type="primary" style="margin:40px 40px 0 0;" icon="folder">{{file.name}}</Button>
                </div></Col>
                </div></Col>
            </TabPane>
            <TabPane label="" disabled name='name3' >
                <div v-if="current == 3">
                 <Card :bordered="false" dis-hover>
                    <Form :model="formItem" label-position="left" :label-width="120">
                        
                        <Col span="20" offset=""><FormItem label="需求描述" required>
                            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="简单描述您使用业务的应用场景，如支持一款理财APP的用户身份验证。"></Input>
                        </FormItem></Col>
                        <!-- <FormItem label="模版页数" required>
                            <Input v-model="formItem.input2"></Input>
                        </FormItem> -->
                        
                        <!-- <FormItem label="预计月调用次数" required>
                            <Select v-model="formItem.select">
                                <Option value="1">1～10000</Option>
                                <Option value="2">10000～15000</Option>
                                <Option value="3">15000～20000</Option>
                            </Select>
                        </FormItem> -->
                        <Col span="24" offset="">
                            <FormItem label="预计月调用次数" required>
                                <Col span="18"><RadioGroup v-model="formItem.select" @on-change="changeValue" type="button" size="large">
                                    <Radio label="1"><span @click="writeTime1">1-10000</span></Radio>
                                    <Radio label="2"><span @click="writeTime1">10001-50000</span></Radio>
                                    <Radio label="3"><span @click="writeTime1">50001-100000</span></Radio>
                                    <Radio label="4"><span @click="writeTime">>100000</span></Radio>
                                </RadioGroup></Col>
                                <!-- <Col class="write_time" v-if="writetimes" span="4"><Input v-model="formItem.button4" placeholder="请输入预计使用次数">
                                    
                                </Input></Col> -->
                            </FormItem>
                        </Col>
                        <Col  span="24" class="select_time">
                            <FormItem label="预计调用时长" required>
                                <RadioGroup v-model="formItem.input4" type="button" size="large">
                                    <!-- <Radio true-value="1个月" false-value="1" ></Radio> -->
                                    <Radio label="1"><span>1个月</span></Radio>
                                    <Radio label="2"><span>2个月</span></Radio>
                                    <Radio label="3"><span>3个月</span></Radio>
                                    <Radio label="4"><span>4个月</span></Radio>
                                    <Radio label="5"><span>5个月</span></Radio>
                                    <Radio label="6"><span>6个月</span></Radio>
                                    <Radio label="7"><span>7个月</span></Radio>
                                    <Radio label="8"><span>8个月</span></Radio>
                                    <Radio label="9"><span>9个月</span></Radio>
                                    <Radio label="12"><span>1年</span></Radio>
                                    <Radio label="24"><span>2年</span></Radio>
                                    <Radio label="36"><span>3年</span></Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="13" class="select_need">
                        <FormItem label="字段位置信息" required>
                            <RadioGroup v-model="formItem.radio" type="button" size="large">
                                <Radio label="1">需要</Radio>
                                <Radio label="0">不需要</Radio>
                            </RadioGroup>
                        </FormItem>
                        </Col>
                        <Col span="24"><Col span="6" class="form_times">
                        <FormItem label="预计调用峰值" required>
                            <Input v-model="formItem.input5">
                                <span slot="append">次/秒</span>
                            </Input>
                        </FormItem>
                        </Col></Col>
                    </Form>
                </Card>
                </div>
            </TabPane>
            <TabPane label=""  disabled name='name4'>
                <div v-if="current == 4">
                 <Card :bordered="false" dis-hover>
                     <!-- <Col style="margin-bottom:50px;font-size:24px;color:#323232;" span="22" offset="1">自定义模版信息</Col> -->
                     <Row>
                    <Form :model="formItem" label-position="left" :label-width="120">
                        <Col span='12' offset=''>
                            <FormItem label="模板名称："  :label-width="80">
                                <span>{{formItem.input1}}</span>
                            </FormItem>
                        </Col >
                        <Col span='11' offset='1'>
                            <FormItem label="预计月调用次数：">
                               <span>{{formItem.select==1?'1~10000':formItem.select==2?'10001~50000':formItem.select==3?'50001~100000':'>100000'}}</span>
                            </FormItem>
                        </Col >
                        <!-- <Col span='9' offset='1'>
                            <FormItem label="模板页数">
                                <span>{{formItem.input2}}</span>
                            </FormItem>
                        </Col> -->
                         <Col span='12' offset=''>
                            <FormItem label="需求描述：" :label-width="80">
                                <span>{{formItem.textarea}}</span>
                            </FormItem>
                        </Col>
                        
                           
                        <Col span='11' offset='1'>
                            <FormItem label="预计调用时长：">
                                <span>{{formItem.input4=="1"?"1个月":formItem.input4=="2"?"2个月":formItem.input4=="3"?"3个月":formItem.input4=="4"?"4个月":formItem.input4=="5"?"5个月":formItem.input4=="6"?"6个月":formItem.input4=="7"?"7个月":formItem.input4=="8"?"8个月":formItem.input4=="9"?"9个月":formItem.input4=="12"?"1年":formItem.input4=="24"?"2年":"3年"}}</span>
                            </FormItem>
                        </Col>
                        <Col span='12' offset=''>
                            <FormItem label="识别字段：" :label-width="80">
                                <span>您已在当前模版选择以下字段进行OCR识别</span>
                            </FormItem>
                            <Col span="20" offset="2" style="padding-left:30px;"><Table :border=true :show-header=false highlight-row ref="currentRowTable" :columns="columns3" :data="data1"></Table></Col>
                        </Col>

                        <Col span='11' offset='1'>
                            <Col span='24' offset=''>
                                <FormItem label="字段位置信息：">
                                    <span>{{formItem.radio==1?'需要':'不需要'}}</span>
                                </FormItem>
                            </Col>
                            <Col span='24' offset=''>
                                <FormItem label="预计调用峰值：">
                                    <span>{{formItem.input5}}</span>
                                </FormItem>
                            </Col >
                            <Col span='20' offset=''>
                                <FormItem label="样本集：">
                                    <span>{{isupload?file.name:'未上传文件'}}</span>
                                </FormItem>
                            </Col >
                        </Col>


                        
                        
                    </Form>
                      </Row>
                </Card>
                <!-- <Row style='margin-top:20px;'>
                    <Col style="margin-bottom:50px;font-size:24px;color:#323232;padding-left:16px;" span="22" offset="1">字段标注</Col>
                    <Col span='13' offset='1' dis-hover>
                        <Card :bordered="false" style='height:349px' dis-hover>
                          <img :src="img1" width="100%" alt="">
                        </Card>
                    </Col>
                    <Col span='9'>
                         <Card :bordered="false" style='height:349px' dis-hover>
                          <div class="list_info" v-for='item,index in saveFiles[imgIndex].infoList' >
                              <span style="font-weight:800;color:#2d8cf0;">{{index+1}}</span> : <span>{{item.value}}</span>
                          </div>
                        </Card>
                    </Col>
                </Row> -->
                <!-- <Row>
                    <Col span='13' offset="1">
                        <Card :bordered="false" dis-hover>
                            <ul class='img' style="height:145px;width:100%;background:#f5f5f5;">
                                <li style="float:left;height:145px;margin-right:5px;" v-for='item,index in saveFiles' class="list" @click='showImg1(item,index)'>
                                    <img :src="item.src" height="145px" alt="">
                                </li>
                            </ul>
                        </Card>
                    </Col>
                </Row> -->
                <!-- <Row>
                    <Col style="margin-bottom:50px;font-size:24px;color:#323232;padding-left:16px;" span="22" offset="1">样本上传</Col>
                    <Col span="13" offset="1">
                    <Card :bordered="false" style='margin-top:20px;text-align:center;' dis-hover>
                        
                        <Button type="primary" icon="folder">{{isupload?file.name:'未上传文件'}}</Button>
                        <Button type="success" v-show='isupload' shape="circle" size='small' icon="checkmark-round"></Button>
                    </Card>
                    </Col>
                </Row> -->
                </div>
            </TabPane>
        </Tabs>  
      </div>
      <!-- </Col> -->
    </Row>
    
      
    
    <Row style='padding-top:40px;padding-bottom:80px;background:#f5f5f5;'>
      <Col span="24" offset="" style='text-align:right;padding-right:40px;'>
      <!-- <Button class="btn1" type="primary" v-if='current!=0' @click="back">上一步</Button> -->
      <Button class="btn1" type="primary" v-if='current!=0' @click="cancel">取消申请</Button>
      <Button class="btn1" type="primary" v-if='current!=4' @click="next">下一步</Button>
      <Button class="btn1" type="primary" v-if='current==4' @click="submit">确认提交</Button>

      </Col>
    </Row>
  </div>
</template>
<script>
import Pic from '@/components/canvas.vue'
export default {
  components:{
      Pic
  },
  data () {
      return {
          submitFlag:true,
          showPer:false,
          showUploadImg:false,
          uploadImg:'',
          localtion:{},
          writetimes:false,
        //   showCanvas:false,
          canvasWidth:200,
          canvasHeight:200,
          params:{},
          originImg:[],
          filesName:"",
          percent1:0.5,
          saveFlag:false,
          saveFilesNum:0,
          index:0,
          imgIndex:0,
          img1:'',
          saveFiles:[],
          isupload:false,
          percent:0,
          file:{},
          src:'',
          files:[],
          current: 0,
            formItem: {
                input1: '',
                input2: '1',
                input3: '',
                input4: '',
                input5: '',
                textarea:'',
                radio:'1',
                select: '1',
                button1:'1',
                button2:'1',
                button4:''
            },
            value:"name0",
            saveImg:[],
            columns3: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    key: 'value',
                    width:120,
                },
                {
                    key: 'value1'
                }
            ],
            data1: []
        
      }
  },
  mounted(){
        

    
  },
  methods: {
      selectImgShow(v,i){
          this.uploadImg = v.src;
      },
      reset(){
          let _this = this;
          
          if(!this.saveFiles[this.index]){
            this.saveImg = [];
          }else if(this.saveFiles[this.index].infoList){
            this.saveImg = [];
            this.saveFiles[this.index].infoList = [];
          }
          console.log(this.index);
          this.$refs.pic.clearCount();
          function runAsync(){
              var p = new Promise(function(resolve, reject){
                    _this.$refs.pic.drawImage(_this.originImg[_this.index].src,resolve);
                });
                return p;
          }
          runAsync().then(function(data){
              _this.files[_this.index].src = self.penal.toDataURL('image/png');
              console.log(333)
            })
          
          console.log(111111);
      },
      cancel(){
          console.log('cancel')
          this.$router.push('/')
      },
      writeTime1(){
          this.writetimes = false;
          
      },
      writeTime(){
        //   alert(111);
          this.writetimes = true;
      },
      changeValue(){
          console.log(event)
      },
      next() {
          var _this = this;
          if(this.current == 0){
            var canvasBox = document.getElementById("canvas_box");
            this.canvasWidth = canvasBox.clientWidth;
            this.canvasHeight = canvasBox.clientHeight;
            console.log(this.canvasWidth+"+++"+this.canvasHeight);
            if(this.files.length == 0){
                alert("请上传图片！");
                return false;
            }
            if(this.formItem.input1 == ''){
                alert("请填写模版名称！");
                return false;
            }
            
            // this.showCanvas = true;
          }else if(this.current == 1){
              for(var j = 0;j<this.saveFiles.length;j++){
                  for(var k = 0;k<this.saveFiles[j].infoList.length;k++){
                      if(this.saveFiles[j].infoList[k].value == "" || this.saveFiles[j].infoList[k].value1 == ""){
                          alert("请填写所有字段名及字段描述！");
                          return false;
                      }
                  }
              }
              for(var l = 0;l<this.saveImg.length;l++){
                  if(this.saveImg[l].value == '' || this.saveImg[l].value1 == ''){
                      alert("请填写所有字段名及字段描述！");
                      return false;
                  }
              }
              _this.save()
             this.location = this.$refs.pic.allPaintMes;
              if(this.files.length != this.saveFiles.length){
                  alert("请标注所有上传图片！");
                  return false;
              }else{
                  for(var i = 0;i<this.saveFiles.length;i++){
                      if(this.saveFiles[i].infoList.length == 0){
                            alert("请标注所有上传图片！");
                            return false;
                      }
                    // console.log(this.saveFiles[i].infoList.length);
                  }
              }
            //   console.log(this.saveFiles)
              
              this.img1 = this.saveFiles[0].src;
          }else if(this.current == 2){
              if(this.isupload == false){
                  alert("请上传压缩文件！");
                  return false;
              }
          }else if(this.current == 3){
              this.submitFlag = true;
              this.data1 = [];
              for(var i = 0;i<this.saveFiles.length;i++){
                  for(var j = 0;j<this.saveFiles[i].infoList.length;j++){
                      this.data1.push(this.saveFiles[i].infoList[j]);
                  }
              }
            if(this.formItem.textarea == ""){
                alert("请填写需求描述！")
                return false;
            }
            if(this.formItem.input4 == ""){
                alert("请选择预计调用时长！")
                return false;
            }
            if(this.formItem.input5 == ""){
                alert("请填写预计调用峰值！")
                return false;
            }
            //   console.log(this.saveFiles);
            //   console.log(123456)
            //   console.log(this.data1);
          }
          this.current += 1;
          this.value='name'+this.current
      },
      back(){
          this.current -= 1;
          this.value='name'+this.current
      },
      submit(){
        //   this.instance("success")
        if(this.submitFlag == false){
            return false;
        }
        let _this = this;
        var data1 = {};
        var json_params = {
            type : "1",
            name : this.formItem.input1,
            description : this.formItem.textarea,
            page : this.formItem.input2,
            expected_frequency : this.formItem.select,
            expected_duration : this.formItem.input4,
            expected_peak : this.formItem.input5,
            mark_overlaid : this.formItem.radio,
            pictures_fields : [],
            size:{
                "width":this.canvasWidth,
                "height":this.canvasHeight
            }
        };
        var data2 = this.saveFiles;
        this.submitFlag = false;
        

        // json_params.type = "1";
        // json_params.name = this.formItem.input1;
        // json_params.description = this.formItem.textarea;
        // json_params.page = this.formItem.input2;
        // json_params.expected_frequency = this.formItem.select;
        // json_params.expected_duration = this.formItem.input4;
        // json_params.expected_peak = this.formItem.input5;
        // json_params.mark_overlaid = this.formItem.radio;
       
        

    //     this.axios({
    //         method: 'post',
    //         url:url,
    //         data: params
    //   }).then(function(response){
    //         let res=response.data.body
    //         console.log(res)
    //         alert(res.url_list)
    //   })
            let formdata1 = new FormData();
            // for(let i=0;i<file.length;i++){
                formdata1.append('files',this.file);  
            // }
            let params1=formdata1
        this.axios.all([
            _this.axios({
                url:"/token/upload_files",
                // url:"http://192.168.0.203:5000/token/payment/balance",
                data:_this.params,
                method:'post'
            }).then(function(res){
                let data = res.data.body
                console.log(data);
                // json_params.pictures_fields = data.url_list;
                for(var i = 0;i<data2.length;i++){
                    var paintData = [];
                    for(var j = 0;j<_this.saveFiles[i].infoList.length;j++){
                        paintData.push({
                            key:_this.saveFiles[i].infoList[j].value,
                            description:_this.saveFiles[i].infoList[j].value1,
                            x1:_this.location[i][j].x1,
                            x2:_this.location[i][j].x2,
                            y1:_this.location[i][j].y1,
                            y2:_this.location[i][j].y2
                        })
                    }
                    
                    json_params.pictures_fields.push({
                        origin_pic_url:data.url_list[i],
                        location:paintData
                    })
                }
                console.log("---------")
                console.log(json_params);
            }),
            _this.axios({
                url:"/token/upload_files",
                // url:"http://192.168.0.203:5000/token/payment/balance",
                data:formdata1,
                method:'post'
            }).then(function(res){
                let data = res.data.body
                console.log(data);
                json_params.assessment_sample = data.url_list;
            })
        ]).then(function(){
            console.log(json_params)
            _this.axios({
                url:'/token/template/new',
                method:'post',
                data:json_params
            }).then(function(res){
                console.log(12345)
                console.log(res);
                _this.$router.push({path:'/customSubmit'});
                // if(res.data.body.code == 200){
                //     this.$router.push({path:'/customSubmit'});
                // }else{
                //     alert('请确认填写信息正确！')
                // }
                
            }).catch(()=>{
                console.log('new catch submitflag true');
                this.submitFlag = true;
            })
        })
        
        

        

        // this.$router.push({path:'/manageSubmit'});
      },
      upload(){
        let self=this  
        //   console.log(this.$refs.upload.files[0])
        let files=this.$refs.upload.files
        for(let i=0,len=files.length;i<len;i++){
            if (window.FileReader) {    
                    var reader = new FileReader();    
                    reader.readAsDataURL(files[i]);    
                    //监听文件读取结束后事件    
                reader.onloadend = function (e) {
                    // $(".img").attr("src",e.target.result);    //e.target.result就是最后的路径地址
                    console.log(files[i].name)
                    self.files.push({
                        src:e.target.result,
                        name:files[i].name    
                    })
                    self.originImg.push({
                        src:e.target.result,
                        name:files[i].name   
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
        this.params=formdata
        console.log(typeof(formdata))
        // this.axios({
        //     url:"/token/upload_files",
        //     // url:"http://192.168.0.203:5000/token/payment/balance",
        //     data:formdata,
        //     method:'post'
        // }).then(function(res){
        //     let data = res.data.body
        //     // alert(11111);
        //     console.log(1111111);
        //     console.log(data);
        // })
      },
      uploadfile(){
          this.$refs.upload.click()
      },
      del(index){
          this.files.splice(index,1)
          if(this.files.length != 0){
              this.uploadImg = this.files[this.files.length-1].src;
          }else{
              this.showUploadImg = false;
          }
      },
      judgeImgData(index){
          for(var i = 0;i<this.saveFiles.length;i++){
              if(this.saveFiles[i].key == index){
                this.saveImg = this.saveFiles[i].infoList;
                this.saveFilesNum = this.saveFiles[i].infoList.length + 1;
                console.log("this.saveFilesNum::"+this.saveFilesNum)
                if(this.saveFilesNum !=0){
                    this.$refs.pic.count = this.saveFilesNum;
                }
              }
          }
      },
      showImg(index){
          if(this.saveFlag){this.save();}
        //   this.$refs.pic.showCanvas();
          this.$refs.pic.clearCount();
          this.$refs.pic.drawImage(this.files[index].src);
        //   this.filesName = this.files[index].name;
          this.filesName = index;
          this.index = index;
          this.judgeImgData(index);
          this.showCloseBtn(index);
          this.saveFlag = true;
      },
      showCloseBtn(index){
          var close_x = document.getElementsByClassName("close_x");
          var show_x = document.getElementsByClassName("close_x_"+index);
          console.log(close_x.length+"++++++"+show_x.length+"+++"+index);
          if(close_x.length!=0){
              for(var i = 0;i<close_x.length;i++){
                  close_x[i].style.display = "none";
              }
          }
          if(show_x.length!=0){
              for(var j = 0;j<show_x.length;j++){
                  show_x[j].style.display = "block";
              }
          }
          
      },
      showImg1(item,index){
          this.img1 = item.src;
          this.imgIndex = index;
      },
      reAddImg(i){   
        this.saveFiles[i].src = self.penal.toDataURL('image/png');
       
        this.saveFiles[i].infoList = this.saveImg;
        return false;      
      },
      addNewImg(){
        this.saveFiles.push(
            {
                src:self.penal.toDataURL('image/png'),
                infoList:this.saveImg,
                key:this.index
            }
        )
      },
      judgeImg(){
          if(this.saveFiles.length == 0){
                this.addNewImg();
            }else{
                for(var i = 0;i<this.saveFiles.length;i++){
                    if(this.saveFiles[i].key == this.index){
                        this.reAddImg(i);
                        return false;
                    }
                }
                this.addNewImg();
            }
      },
      save(){
          
        //  var a = document.createElement('a');
        //     a.href = self.penal.toDataURL('image/png');//这里对应img url
            // a.download = 'image.jpeg';
            // a.id = 'download';
            // a.innerHTML = 'download';
            // document.body.appendChild(a);
            // document.getElementById('download').style.display = 'none';
            // document.getElementById('download').click();
            // a.parentNode.removeChild(a)  
            
            if(this.saveImg.length == 0){
                return false;
            }
            
            this.judgeImg();
            // this.saveFiles.push(
            //     {
            //         src:self.penal.toDataURL('image/png'),
            //         infoList:this.saveImg,
            //         key:this.index
            //     }
            // )
            
            // this.$refs.pic.clearCount();
            console.log(this.saveFiles)
            // console.log(self.penal.toDataURL)
            this.files[this.index].src = self.penal.toDataURL('image/png');
            // console.log(22222222);
            // console.log(self.penal.toDataURL('image/png'))
            this.saveImg=[];
      },
    instance (type) {
        const title = '信息确认';
        const content = '您的自定义开发申请已成功提交，审核结果将于7个工作日内反馈，请于项目管理页面查询。';
        switch (type) {
            case 'info':
                this.$Modal.info({
                    title: title,
                    content: content
                });
                break;
            case 'success':
                this.$Modal.success({
                    title: title,
                    content: content
                });
                break;
            case 'warning':
                this.$Modal.warning({
                    title: title,
                    content: content
                });
                break;
            case 'error':
                this.$Modal.error({
                    title: title,
                    content: content
                });
                break;
        }
    },
    handleUpload(file){
        this.file = file;
        this.progressAdd()
        this.isupload=true
        this.showPer = true;
        console.log(file)
        return false; 
    },
    progressAdd(){
        let self=this
        let time=setInterval(function(){
            self.percent++
            if(self.percent>=100){
                clearInterval(time)
            }
        },50)
    },
    addItem(){
        this.saveImg.push({
            value:'',
            value1:''
        })
    },
    deleteMes(msg){
        if(this.saveFiles[msg.n].infoList[msg.m].value){
            this.saveFiles[msg.n].infoList[msg.m].value = "已删除";
            this.saveFiles[msg.n].infoList[msg.m].value1 = "已删除";
        }
        // this.saveFiles[msg.n].infoList[msg.m].value = "已删除";
        // console.log(this.saveFiles[msg.n].infoList[msg.m].value+"value");
        this.saveFiles[msg.n].src = self.penal.toDataURL('image/png')
    }
  }
}
</script>
<style>
.ivu-card-body{
    padding:0;
}
.img{
    list-style:none;
    height: 377px;
    overflow-y:auto;
    overflow-x: hidden;
}
.list1{
    border: 2px transparent ; 
    cursor: pointer;
    border: 2px solid rgba(0,0,0,0);

}
.list1:hover{
    border: 2px solid #e4393c;  
}
.files{
    margin-bottom:5px;
}
.list_info{
    text-align: left ;
}
.ivu-tabs .ivu-tabs-bar {
        display: none;
    }
.ivu-steps-horizontal .ivu-steps-content{
        padding-left: 0px;
    margin-left: -15px;
    margin-top: 10px;
}
.ivu-steps{
    padding-left:5%;
}
.ivu-steps-content{
    font-size:18px;
}
.ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
    border-color: #78c4ff;
    background-color: #78c4ff;
}
.ivu-form-item{
    margin-bottom: 20px;
}
.btn1{width:130px;height:54px;font-size:20px;margin-right:40px;}
.ivu-upload-drag{
    border:none;
    
    padding-bottom: 20px;
}
.ivu-upload-drag:hover{
    border:none;
}
#uploadm .ivu-upload-drag{
    /* background:#f5f5f5; */
}
.ivu-form-item-label{
    height:100%;
    line-height:100%;
}
.ivu-radio-group-button .ivu-radio-wrapper{
    border-radius: 0px !important;
    width: 224px;
    height: 54px;
    margin-right:20px;
    text-align: center;
    line-height: 54px;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked{
    background:#2d8cf0;
    color:#fff;
}
.select_time .ivu-radio-group-button .ivu-radio-wrapper{
    margin-right:0px;
    width:100px;
}
.select_need .ivu-radio-group-button .ivu-radio-wrapper{
     width:100px;
}
.ivu-radio-group-button .ivu-radio-wrapper{
    padding: 0;
}
.write_time .ivu-input-wrapper,.write_time input{
    border-radius: 0px !important;
    width: 224px;
    height: 54px;
    line-height: 54px;
}
.form_times .ivu-input-group{
    width: 220px;
    border-radius: 0px;
    border: none;
    color:#828282;
}
.form_times input , .form_times .ivu-input-group-append{
    border-radius: 0px;
    border: none;
    background:#f5f5f5;
    outline:none;
}
.paint_mes{
    font-size:18px;
}
.ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper,textarea.ivu-input{
    font-size: 12px;
}
.title{
    font-size:20px;height:90px;line-height:90px;padding-left:40px;
}
.ivu-steps,.ivu-steps .ivu-steps-head,.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner{
    background:#f5f5f5;
}
.pop-content{
    width:164px;
    margin: 0;
    padding:0;
    white-space: normal;
    font-size:14px;
}
.ivu-poptip-body{
    padding:20px;
}
.ivu-poptip-arrow{
    display:none;
}
</style>


