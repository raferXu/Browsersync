<template>
  <div>
    <Row style='margin-top:30px'>
      <Col span="20" offset="2">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <Steps :current="current">
              <Step  content="填写信息"></Step>
              <Step  content="字段标注"></Step>
              <Step  content="样本上传"></Step>
              <Step  content="提交审核"></Step>
          </Steps>
        </Card>
      </div>
      </Col>
    </Row>
    <Row style='margin-top:30px'>
      <Col span="20" offset="2">
      <div style="background:#eee;padding: 20px">
        <Tabs :value='value'>
            <TabPane disabled label="信息填写"  name='name0'>
                <div v-if="current == 0">
                 <Card :bordered="false">
                    <Form :model="formItem" label-position="left" :label-width="100">
                        <FormItem label="模板名称">
                            <Input v-model="formItem.input1"></Input>
                        </FormItem>
                        <FormItem label="需求描述">
                            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="Enter something..."></Input>
                        </FormItem>
                        <FormItem label="模版页数">
                            <Input v-model="formItem.input2"></Input>
                        </FormItem>
                        <FormItem label="预计页调用次数">
                            <Select v-model="formItem.select">
                                <Option value="1">1～10000</Option>
                                <Option value="2">10000～15000</Option>
                                <Option value="3">15000～20000</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="预计调用时长">
                            <Input v-model="formItem.input4">
                                <span slot="append">月</span>
                            </Input>
                        </FormItem>
                        <FormItem label="预计调峰值">
                            <Input v-model="formItem.input5">
                                <span slot="append">秒/次</span>
                            </Input>
                        </FormItem>
                        <FormItem label="位置叠加信息">
                            <RadioGroup v-model="formItem.radio">
                                <Radio label="1">需要</Radio>
                                <Radio label="2">不需要</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Card>
                </div>
            </TabPane>
            <TabPane label="字段标注"  disabled name='name1'>
                <div v-if="current == 1">
                <Row style='margin-bottom:20px'>
                    <Col span='4' >
                        <Card :bordered="false">
                                <ul class='img'>
                                <li v-for='item,index in files' class="list" @click='showImg(index)'>
                                    <img :src="item.src" width="100%" alt="">
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span='19' offset='1' >
                        <Card :bordered="false" style='height:410px'>
                           <Pic ref='pic' @addItem="addItem"></Pic>
                        </Card>
                    </Col>
                </Row>   
                <Row>
                    <Card :bordered="false">
                        <Row>
                            <Col span='6'>
                                <input multiple type="file" ref='upload' @change="upload" style='display:none'>
                                <div style='text-align:center;margin-bottom:5px'>
                                    <Button type="primary" @click='uploadfile'>点击上传文件</Button>
                                </div>
                                    <div style='text-align:center'>
                                        <Button type="primary" @click='save'>保存图片</Button>
                                </div>
                            </Col>
                            <Col span='18'>
                                <div class='files' v-for='item,index in files'>
                                    <Icon type="android-folder"></Icon>
                                    <span style='margin-right:10px;'>{{item.name}}</span>
                                        <a href="#" slot="extra" @click.prevent="del(index)" style='margin-right:10px'>
                                        <Icon type="close-circled"></Icon>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Row>
                    <Row>
                        <Card :bordered="false" style='margin-top:20px'>
                            <div v-for='item,index in saveImg' :key='index' style='margin-bottom:5px'> 
                                 <Input  v-model='item.value'>
                                     <span slot="prepend">{{index+1}}</span>         
                                </Input>    
                            </div>
                           
                        </Card>
                    </Row>
                    </div>
            </TabPane>
            <TabPane label="样本上传"  disabled name='name2'>
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
                <div>
                    <Button type="primary" icon="folder">{{file.name}}</Button>
                    <Progress :percent="percent" ></Progress>
                </div>
                </div>
            </TabPane>
            <TabPane label="提交审核"  disabled name='name3'>
                <div v-if="current == 3">
                 <Card :bordered="false">
                     <Row>
                    <Form :model="formItem" label-position="left" :label-width="100">
                        <Col span='9' offset='2'>
                            <FormItem label="模板名称">
                                <span>{{formItem.input1}}</span>
                            </FormItem>
                        </Col >
                        <Col span='9' offset='2'>
                            <FormItem label="模板页数">
                                <span>{{formItem.input2}}</span>
                            </FormItem>
                        </Col>
                         <Col span='20' offset='2'>
                            <FormItem label="模板描述">
                                <span>{{formItem.textarea}}</span>
                            </FormItem>
                        </Col>
                        <Col span='9' offset='2'>
                            <FormItem label="预计月调用次数">
                               <span>{{formItem.select==1?'1~10000':formItem.select==2?'10000~15000':'15000~20000'}}</span>
                            </FormItem>
                        </Col >
                           
                        <Col span='9' offset='2'>
                            <FormItem label="预计调用时长">
                                <span>{{formItem.input4}}</span>
                            </FormItem>
                        </Col>
                        <Col span='9' offset='2'>
                            <FormItem label="预计调用峰值">
                               <span>{{formItem.input5}}</span>
                            </FormItem>
                        </Col >
                        <Col span='9' offset='2'>
                            <FormItem label="叠加位置信息">
                                <span>{{formItem.radio==1?'需要':'不需要'}}</span>
                            </FormItem>
                        </Col>
                    </Form>
                      </Row>
                </Card>
                <Row style='margin-top:20px;'>
                    <Col span='4' >
                        <Card :bordered="false">
                                <ul class='img'>
                                <li v-for='item,index in saveFiles' class="list" @click='showImg1(item,index)'>
                                    <img :src="item.src" width="100%" alt="">
                                </li>
                            </ul>
                        </Card>
                    </Col>
                    <Col span='10' offset='1' >
                        <Card :bordered="false" style='height:410px'>
                          <img :src="img1" width="100%" alt="">
                        </Card>
                    </Col>
                    <Col span='8' offset='1'>
                         <Card :bordered="false" style='height:410px'>
                          <div class="list_info" v-for='item,index in saveFiles[imgIndex].infoList' >
                              <span style="font-weight:800;color:#2d8cf0;">{{index+1}}</span> : <span>{{item.value}}</span>
                          </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
        <Card :bordered="false" style='margin-top:20px'>
            <Button type="primary" icon="folder">{{isupload?file.name:'未上传文件'}}</Button>
            <Button type="success" v-show='isupload' shape="circle" size='small' icon="checkmark-round"></Button>
        </Card>
    </Row></div>
            </TabPane>
        </Tabs>  
      </div>
      </Col>
    </Row>
    
      
    
    <Row style='margin-top:30px'>
      <Col span="20" offset="2" style='text-align:center'>
      <Button type="primary" v-if='current!=0' @click="back">上一步</Button>
      <Button type="primary" v-if='current!=3' @click="next">下一步</Button>
      <Button type="primary" v-if='current==3' @click="submit">确认提交</Button>

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
          this.current += 1;
          this.value='name'+this.current
      },
      back(){
          this.current -= 1;
          this.value='name'+this.current
      },
      submit(){
          this.instance("success")
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
      showImg(index){
          this.$refs.pic.drawImage(this.files[index].src)
      },
      showImg1(item,index){
          this.img1 = item.src;
          this.imgIndex = index;
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
            var img = {};
            this.saveFiles.push(
                {
                    src:self.penal.toDataURL('image/png'),
                    infoList:this.saveImg
                }
            )
            this.saveImg=[]
            this.$refs.pic.clearCount();
            console.log(this.saveFiles)
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
    }
  }
}
</script>
<style scoped>
.img{
    list-style:none;
    height: 377px;
    overflow-y:scroll;
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
</style>


