<template>
  <div>
    <Row style='margin-top:30px'>
        <Col span="22" offset="1" style="font-size:24px;height:40px;line-height:40px;" >自定义模版开发</Col>
      <Col span="24" offset="0">
      <Row style="padding: 2px;border:1px solid #eee;">
        <Col  span="13"><Card :bordered="false" dis-hover>
          <Steps :current="current">
              <Step  content="填写信息"></Step>
              <Step  content="字段标注"></Step>
              <Step  content="样本上传"></Step>
              <Step  content="提交审核"></Step>
          </Steps>
        </Card></Col>
      </Row>
      </Col>
    </Row>
    <Row style='margin-top:30px'>
      <!-- <Col span="17" offset="1"> -->
      <div style="padding: 0px">
        <Tabs :value='value'>
            <TabPane disabled label=""  name='name0'>
                <div v-if="current == 0">
                 <Col span="13" offset="1"><Card :bordered="false" dis-hover>
                    <Form :model="formItem" label-position="left" :label-width="120">
                        <FormItem label="模板名称" required>
                            <Input v-model="formItem.input1"></Input>
                        </FormItem>
                        <FormItem label="需求描述" required>
                            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="模版页数" required>
                            <Input v-model="formItem.input2"></Input>
                        </FormItem>
                        <Col span="13"><FormItem label="预计月调用次数" required>
                            <Select v-model="formItem.select">
                                <Option value="1">1～10000</Option>
                                <Option value="2">10000～15000</Option>
                                <Option value="3">15000～20000</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="预计调用时长" required>
                            <Input v-model="formItem.input4">
                                <span slot="append">月</span>
                            </Input>
                        </FormItem>
                        <FormItem label="预计调用峰值" required>
                            <Input v-model="formItem.input5">
                                <span slot="append">秒/次</span>
                            </Input>
                        </FormItem></Col>
                        <Col span="24">
                        <FormItem label="位置叠加信息" required>
                            <RadioGroup v-model="formItem.radio">
                                <Radio label="1">需要</Radio>
                                <Radio label="2">不需要</Radio>
                            </RadioGroup>
                        </FormItem></Col>
                    </Form>
                </Card></Col>
                </div>
            </TabPane>
            <TabPane label=""  disabled name='name1'>
                <div v-if="current == 1">
                <Row style='margin-bottom:20px'>
                    <Col span='13' offset='1' >
                        <Card :bordered="false" style='height:410px' dis-hover>
                           <Pic ref='pic' @deleteMes="deleteMes" @addItem="addItem" :originImg="originImg" :saveFilesNum="saveFilesNum" :index="index" :percent1="percent1" :filesName="filesName"></Pic>
                        </Card>
                    </Col>
                    <Col span="6" style="padding-top:12px;padding-left:40px">
                        <div style="margin-bottom:40px;">请框选需要识别的字段区域</div>
                        <Button class="btn1" style="margin-bottom:40px;" type="primary">框选</Button><br/>
                        <Button class="btn1" type="primary" @click='save'>保存</Button>
                    </Col>
                    <Col span='13' offset='1'>
                        <Card :bordered="false" dis-hover>
                            <ul class='img' style="height:145px;width:100%;background:#f5f5f5;">
                                <li style="float:left;height:145px;margin-right:5px;position:relative;" v-for='item,index in files' class="list" >
                                    <img :src="item.src" height="100%" alt="" @click='showImg(index)'>
                                    <a style="position:absolute;top:0px;right:0px;z-index:1234;" href="#" slot="extra" @click.prevent="del(index)">
                                        <Icon type="close-circled"></Icon>
                                    </a>
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    
                </Row>   
                <Row>
                    <Card :bordered="false" dis-hover>
                        <Row>
                            <Col span='6' offset="1">
                                <input multiple type="file" ref='upload' @change="upload" style='display:none'>
                                <div style='margin-bottom:5px'>
                                    <Button class="btn1" type="primary" @click='uploadfile'>本地上传</Button>
                                </div>
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
                        <Col span="20" offset="1" style="font-size:12px;">提示：支持上传一种类型的证件／票据／文档的扫描图，每页大小不超过xxMB，长边不超过xxxx像素的png,jpg,jpeg,bmp图片。</Col>
                    </Card>
                </Row>
                    <Row>
                        <Card :bordered="false" style='margin-top:20px' dis-hover>
                            <Col span="13" offset="1"><div v-for='item,index in saveImg' :key='index' style='margin-bottom:5px'> 
                                 <Input  v-model='item.value'>
                                     <span slot="prepend">{{index+1}}</span>         
                                </Input>    
                            </div></Col>
                           
                        </Card>
                    </Row>
                    </div>
            </TabPane>
            <TabPane label=""  disabled name='name2'>
                <div v-if="current == 2">
                <Upload
                    multiple
                    type="drag"
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
                <Col span="13" offset="1"><div>
                    <Button type="primary" style="margin:40px 40px 0 0;" icon="folder">{{file.name}}</Button>
                    <!-- <Progress :percent="percent" ></Progress> -->
                </div></Col>
                </div>
            </TabPane>
            <TabPane label=""  disabled name='name3'>
                <div v-if="current == 3">
                 <Card :bordered="false" dis-hover>
                     <Col style="margin-bottom:50px;font-size:24px;color:#323232;" span="22" offset="1">自定义模版信息</Col>
                     <Row>
                    <Form :model="formItem" label-position="left" :label-width="100">
                        <Col span='9' offset='1'>
                            <FormItem label="模板名称">
                                <span>{{formItem.input1}}</span>
                            </FormItem>
                        </Col >
                        <Col span='9' offset='1'>
                            <FormItem label="模板页数">
                                <span>{{formItem.input2}}</span>
                            </FormItem>
                        </Col>
                         <Col span='20' offset='1'>
                            <FormItem label="模板描述">
                                <span>{{formItem.textarea}}</span>
                            </FormItem>
                        </Col>
                        <Col span='9' offset='1'>
                            <FormItem label="预计月调用次数">
                               <span>{{formItem.select==1?'1~10000':formItem.select==2?'10000~15000':'15000~20000'}}</span>
                            </FormItem>
                        </Col >
                           
                        <Col span='9' offset='1'>
                            <FormItem label="预计调用时长">
                                <span>{{formItem.input4}}</span>
                            </FormItem>
                        </Col>
                        <Col span='9' offset='1'>
                            <FormItem label="预计调用峰值">
                               <span>{{formItem.input5}}</span>
                            </FormItem>
                        </Col >
                        <Col span='9' offset='1'>
                            <FormItem label="叠加位置信息">
                                <span>{{formItem.radio==1?'需要':'不需要'}}</span>
                            </FormItem>
                        </Col>
                    </Form>
                      </Row>
                </Card>
                <Row style='margin-top:20px;'>
                    <Col style="margin-bottom:50px;font-size:24px;color:#323232;padding-left:16px;" span="22" offset="1">字段标注</Col>
                    <Col span='13' offset='1' dis-hover>
                        <Card :bordered="false" style='height:410px' dis-hover>
                          <img :src="img1" width="100%" alt="">
                        </Card>
                    </Col>
                    <Col span='9'>
                         <Card :bordered="false" style='height:410px' dis-hover>
                          <div class="list_info" v-for='item,index in saveFiles[imgIndex].infoList' >
                              <span style="font-weight:800;color:#2d8cf0;">{{index+1}}</span> : <span>{{item.value}}</span>
                          </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span='13' offset="1">
                        <Card :bordered="false" dis-hover>
                            <ul class='img' style="height:145px;width:100%;background:#f5f5f5;">
                                <li style="float:left;height:145px;margin-right:5px;" v-for='item,index in saveFiles' class="list" @click='showImg1(item,index)'>
                                    <img :src="item.src" height="145px" alt="">
                                </li>
                            </ul>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col style="margin-bottom:50px;font-size:24px;color:#323232;padding-left:16px;" span="22" offset="1">样本上传</Col>
        <Col span="13" offset="1"><Card :bordered="false" style='margin-top:20px;text-align:center;' dis-hover>
            
            <Button type="primary" icon="folder">{{isupload?file.name:'未上传文件'}}</Button>
            <Button type="success" v-show='isupload' shape="circle" size='small' icon="checkmark-round"></Button>
        </Card></Col>
    </Row></div>
            </TabPane>
        </Tabs>  
      </div>
      <!-- </Col> -->
    </Row>
    
      
    
    <Row style='margin-top:160px;margin-bottom:160px;'>
      <Col span="20" offset="1" style='text-align:left'>
      <Button class="btn1" type="primary" v-if='current!=0' @click="back">上一步</Button>
      <Button class="btn1" type="primary" v-if='current!=3' @click="next">下一步</Button>
      <Button class="btn1" type="primary" v-if='current==3' @click="submit">确认提交</Button>

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
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                textarea:'',
                radio:'1',
                select: '1',
            },
            value:"name0",
            saveImg:[]
      }
  },
  methods: {
      next () {
          if(this.current == 1){
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
        this.$router.push({path:'/manageSubmit'});
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
                };    
            } 
        }
       
      },
      uploadfile(){
          this.$refs.upload.click()
      },
      del(index){
          this.files.splice(index,1)
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
        })
    },
    deleteMes(msg){
        if(this.saveFiles[msg.n].infoList[msg.m].value){
            this.saveFiles[msg.n].infoList[msg.m].value = "已删除";
        }
        // this.saveFiles[msg.n].infoList[msg.m].value = "已删除";
        // console.log(this.saveFiles[msg.n].infoList[msg.m].value+"value");
        this.saveFiles[msg.n].src = self.penal.toDataURL('image/png')
    }
  }
}
</script>
<style scoped>
.img{
    list-style:none;
    height: 377px;
    overflow-y:auto;
}
.list{
    border: 2px transparent ; 
    cursor: pointer;

}
.list:hover{
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
    margin-bottom: 40px;
}
.btn1{width:130px;height:54px;font-size:20px;margin-right:40px;}
</style>


