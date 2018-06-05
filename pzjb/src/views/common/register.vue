<!--  -->
<template>
  <div class="logAndRegWrap" :style="bgStyle">
    <div class="logAndRegBox">
      <div class="logregTitle">{{formTxt.title}}</div>
      <div class="inputRow">
        <div class="inputBox">
          <input @focus="focus('name')" @blur="blur('name')" class="lrInput" type="text" v-model="formData.name" :placeholder="formTxt.placeholder.name">
        </div>
        <div class="tipsBox" v-if="tipsShow.name">{{formTxt.tips.name.txt}}</div>
        <div class="tipsBox errorTxt" v-if="errorShow.name">{{formTxt.errorTips.name.txt}}</div>
      </div>
      <div class="inputRow">
        <div class="inputBox">
          <input @focus="focus('email')" @blur="blur('email')" class="lrInput" type="email" v-model="formData.email" :placeholder="formTxt.placeholder.email">
        </div>
        <div class="tipsBox" v-if="tipsShow.email">{{formTxt.tips.email.txt}}</div>
        <div class="tipsBox errorTxt" v-if="errorShow.email">{{formTxt.errorTips.email.txt}}</div>
      </div>
      <div class="inputRow">
        <div class="inputBox">
          <input @focus="focus('phone_number')" @blur="blur('phone_number')" class="lrInput" type="tel" v-model="formData.phone_number" :placeholder="formTxt.placeholder.phone_number">
        </div>
        <div class="tipsBox" v-if="tipsShow.phone_number">{{formTxt.tips.phone_number.txt}}</div>
        <div class="tipsBox errorTxt" v-if="errorShow.phone_number">{{formTxt.errorTips.phone_number.txt}}</div>
      </div>
      <div class="inputRow">
        <div class="inputBox codeBox">
          <input @focus="focus('sms_code')" @blur="blur('sms_code')" class="lrInput codeInput" type="tel" v-model="formData.sms_code" :placeholder="formTxt.placeholder.sms_code">
          <div class="codeBtn" @click="getCode">{{codeObj.codeBtn}}</div>
        </div>
        <div class="tipsBox" v-if="tipsShow.sms_code">{{formTxt.tips.sms_code.txt}}</div>
        <div class="tipsBox errorTxt" v-if="errorShow.sms_code">{{formTxt.errorTips.sms_code.txt}}</div>
      </div>
      <div class="inputRow">
        <div class="inputBox">
          <input @focus="focus('password')" @blur="blur('password')" class="lrInput" type="password" v-model="formData.password" :placeholder="formTxt.placeholder.password">
        </div>
        <div class="tipsBox" v-if="tipsShow.password">{{formTxt.tips.password.txt}}</div>
        <div class="tipsBox errorTxt" v-if="errorShow.password">{{formTxt.errorTips.password.txt}}</div>
      </div>
      <div class="inputRow">
        <div class="inputBox">
          <input @focus="focus('confirmPassword')" @blur="blur('confirmPassword')" class="lrInput" type="password" v-model="formData.confirmPassword" :placeholder="formTxt.placeholder.confirmPassword">
        </div>
        <div class="tipsBox" v-if="tipsShow.confirmPassword">{{formTxt.tips.confirmPassword.txt}}</div>
        <div class="tipsBox errorTxt" v-if="errorShow.confirmPassword">{{formTxt.errorTips.confirmPassword.txt}}</div>
      </div>
      <div class="checkboxWrap" @click="changeCheckbox">
        <Checkbox v-model="formTxt.checkRow.read">{{formTxt.checkRow.label}}</Checkbox>
        <span class="forgetPasswordBox" @click.stop="toProtocol">{{formTxt.checkRow.link}}</span>
      </div>
      <div class="btnBox">
        <div class="btn" @click="registerHandler">{{formTxt.btnTxt}}</div>
        <div class="tipsBox errorTxt" v-if="errorShow.axios">{{formTxt.errorTips.axios.txt}}</div>
      </div>
      <div class="toLoginBox">{{formTxt.toLogin.tip}}<span @click="toLogin">{{formTxt.toLogin.txt}}</span></div>
    </div>
  </div>
</template>

<script>
import {common} from '../../assets/js/common'
export default {
  data () {
    return {
      from: '',
      codeObj: {
        codeBtn: '获取验证码',
        canClick: true
      },
      regexp: {
        name: ''
      },
      bgStyle: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../../assets/images/登录注册背景.jpg') + ')' ,
      },
      token: '',
      formTxt: {
        title: '注册',
        placeholder: {
          name: '账号',
          email: '邮箱',
          phone_number: '手机号',
          sms_code: '手机验证码',
          password: '密码',
          confirmPassword: '确认密码'
        },
        tips: {
          name: {
            txt: '仅支持中英文、数字及下划线，5~15个字符，不能为纯数字',
            arr: ['仅支持中英文、数字及下划线，5~15个字符，不能为纯数字']
          },
          email: {
            txt: '',
            arr: []
          },
          phone_number: {
            txt: '',
            arr: []
          },
          sms_code: {
            txt: '',
            arr: []
          },
          password: {
            txt: '8~16位字符，不能输入空格，至少包含数字、英文字母（区分大小写）、符号中的2种',
            arr: ['8~16位字符，不能输入空格，至少包含数字、英文字母（区分大小写）、符号中的2种']
          },
          confirmPassword: {
            txt: '',
            arr: ['']
          }
        },
        errorTips: {
          name: {
            txt: '请输入帐号',
            arr: ['请输入帐号','仅支持中英文、数字及下划线，5~15个字符，不能为纯数字']
          },
          email: {
            txt: '请输入邮箱',
            arr: ['请输入邮箱','邮箱格式有误']
          },
          phone_number: {
            txt: '请输入手机号',
            arr: ['请输入手机号','手机号码格式有误']
          },
          sms_code: {
            txt: '请输入手机验证码',
            arr: ['请输入手机验证码']
          },
          password: {
            txt: '请设置密码',
            arr: ['请设置密码','8~16位字符，不能输入空格，至少包含数字、英文字母（区分大小写）、符号中的2种']
          },
          confirmPassword: {
            txt: '请再次输入密码',
            arr: ['请再次输入密码','两次输入密码不一致']
          },
          axios: {
            txt: '账号不存在或密码错误，请重新输入',
            arr: ['账号不存在或密码错误，请重新输入','该账号已注册','该邮箱已注册','该手机号已注册','验证码填写错误','请勾选平安接包说明协议']
          }
        },
        checkRow: {
          label: '我已阅读并同意',
          link: '平安接包说明协议',
          read: false 
        },
        btnTxt: '注册',
        toLogin: {
          txt: '已有帐号?',
          tip: '点击登录'
        }
      },
      formData: {
        name: '',
        email: '',
        password: '',
        phone_number: '',
        sms_code: '',
        confirmPassword: ''
      },
      canSubmit: true,
      errorShow: {
        name: false,
        email: false,
        password: false,
        phone_number: false,
        sms_code: false,
        confirmPassword: false,
        axios: false
      },
      tipsShow: {
        name: false,
        email: false,
        password: false,
        phone_number: false,
        sms_code: false,
        confirmPassword: false,
        axios: false
      }
    };
  },
  created () {
    this.$store.commit('cancelTokenFail',false);
    this.$store.commit('footerHide');
    this.from = common.GetUrlParam('from');
    console.log('from: '+this.from);
  },
  components: {},
  computed: {},
  mounted(){
  },
  methods: {
    getCode(){
      if(this.codeObj.canClick){
        console.log('点击发送请求获取验证码');
        this.codeObj.canClick = false;
        let count = 60;
        this.codeObj.codeBtn = count+'s后可重发';
        let timer = setInterval(()=> {
          count--;
          if(count>=0){
            this.codeObj.codeBtn = count+'s后可重发';
          }else{
            clearInterval(timer);
            this.codeObj.codeBtn = '获取验证码';
            this.codeObj.canClick = true;
          }
        },1000);
      }else{
        console.log('正在获取验证码中');
      }
    },
    toProtocol(){
      console.log('查看协议内容');
    },
    checkname(){
      console.log('检查帐号');
      var reg = /^[A-Za-z0-9-_\u4e00-\u9fa5]{5,15}$/;
      var patrn = /^[0-9]*$/;  
      if(reg.test(this.formData.name) && !patrn.test(this.formData.name)){
        console.log('格式符合要求');
        this.errorShow.name = false;
      }else{
        console.log('格式错误');
        this.formTxt.errorTips.name.txt = this.formTxt.errorTips.name.arr[1];
        this.errorShow.name = true;
      }
    },
    checkemail(){
      console.log('检查邮箱');
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if(reg.test(this.formData.email)){
        console.log('格式符合要求');
        this.errorShow.email = false;
      }else{
        console.log('格式错误');
        this.formTxt.errorTips.email.txt = this.formTxt.errorTips.email.arr[1];
        this.errorShow.email = true;
      }
    },
    checkpassword(){
      console.log('检查密码');
      var reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/, reg2 = /\s/;
      if(reg.test(this.formData.password)){
        if(reg2.test(this.formData.password)){
          console.log('包含空格');
          this.formTxt.errorTips.password.txt = this.formTxt.errorTips.password.arr[1];
          this.errorShow.password = true;
        }else{
          console.log('格式符合要求');
          console.log()
          this.errorShow.password = false;
        }
      }else{
        console.log('格式错误');
        this.formTxt.errorTips.password.txt = this.formTxt.errorTips.password.arr[1];
        this.errorShow.password = true;
      }
    },
    checkphone_number(){
      console.log('检查手机');
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if(reg.test(this.formData['phone_number'])){
        console.log('格式符合要求');
        this.errorShow['phone_number'] = false;
      }else{
        console.log('格式错误');
        this.formTxt.errorTips['phone_number'].txt = this.formTxt.errorTips['phone_number'].arr[1];
        this.errorShow['phone_number'] = true;
      }
    },
    checksms_code(){
      console.log('检查验证码');
    },
    checkconfirmPassword(){
      console.log('检查重置密码');
      if(this.formData.password){
        console.log('密码有设置，可以比对');
        if(this.formData.password==this.formData.confirmPassword){
          console.log('密码和重置密码一致');
          this.errorShow.confirmPassword = false;
        }else{
          console.log('密码前后不一致');
          this.formTxt.errorTips.confirmPassword.txt = this.formTxt.errorTips.confirmPassword.arr[1];
          this.errorShow.confirmPassword = true;
        }
      }else{
        console.log('密码还没有设置');
      }
    },
    registerReq(data){
      return this.axios({
          url:"/token/account/register",
          data:data,
          method:'post'
      });
    },
    changeCheckbox(){
      console.log('协议被点击');
      if(this.errorShow.axios){
        this.errorShow.axios = false;
      }
    },
    registerHandler(){
      console.log('点击注册按钮，目前按钮是否可点击: '+this.canSubmit);
      for(let k in this.errorShow){
        if(k!='axios'){
          if(this.errorShow[k]){
            console.log('存在input格式有错误');
            return;
          }
        }else{
          console.log('无需判断key为axios的错误值');
        }
      }
      for(let k in this.formData){
        if(!this.formData[k]){
          console.log(this.formTxt.errorTips[k].arr[0]);
          this.formTxt.errorTips.axios.txt = this.formTxt.errorTips[k].arr[0];
          this.errorShow.axios = true;
          return;
        }
      }
      if(this.formTxt.checkRow.read){
        console.log('已接受平安接包协议');
      }else{
        console.log('请勾选协议');
        this.formTxt.errorTips.axios.txt = this.formTxt.errorTips.axios.arr[5];
        this.errorShow.axios = true;
        return;
      }

      console.log('发起注册请求');
      
      this.canSubmit = false;
      var _this = this;
      this.registerReq(this.formData).then((res)=>{
        _this.canSubmit = true;
        console.log('/token/account/register then')
        console.log(res)
        if(res.status==200){
          var resData = res.data;
          if(resData.code==200){
            var token = resData.body.token;
            window.localStorage.setItem('token',token);
            this.$store.commit('loginFn', token);
            this.$store.commit('setName', this.formData.name);
            this.$store.commit('setPhone', this.formData.phone_number);
            console.log('this.from: '+this.from);
            if(this.from){
              common.backTo(this.from);
            }else{
              let redirect = decodeURIComponent(_this.$route.query.redirect || '/index');
              console.log(redirect);
              this.$router.push({
                path: redirect
              });
            }
          }else{
            console.log('接口异常，返回码为: '+resData.code);
            if(resData.code==701){
              this.formTxt.errorTips.axios.txt = this.formTxt.errorTips.axios.arr[1];
              this.errorShow.axios = true;
            }else if(resData.code==702){
              this.formTxt.errorTips.axios.txt = this.formTxt.errorTips.axios.arr[3];
              this.errorShow.axios = true;
            }
            return;
          }
        }else{
          console.log('网络异常，返回状态码: '+res.status);
        }
      }).catch((err)=>{
        console.log('/token/account/register err')
        console.log(err)
      });
    },
    toLogin(){
      console.log('点击登录click');
      this.$router.push('/login');
    },
    focus(val){
      console.log(`${val}输入框获取焦点`);
      this.errorShow.axios = false;
      if(this.formData[val]){
        console.log(`获取焦点时input有值，不处理`);
      }else{
        console.log(`获取焦点时input为空，去掉错误，出现提示`);
        if(this.formTxt.tips[val].txt){
          this.tipsShow[val] = true;
        }
        this.errorShow[val] = false;
      }
    },
    blur(val){
      console.log(`${val}输入框失去焦点`);
      if(this.formData[val]){
        console.log(`失去焦点时input有值，去掉提示，判断格式是否有误`);
        this.tipsShow[val] = false;
        this['check'+val]();
      }else{
        console.log(`失去焦点时input为空，去掉提示，去掉错误`);
        this.tipsShow[val] = false;
        this.errorShow[val] = false;
      }
    }
  }
}

</script>
<style>
.ivu-checkbox-wrapper{
  margin: 0;
  color: #ffffff;
}
.ivu-checkbox-inner{
  background: none;
  border-color: #ffffff;
}
</style>
<style scoped>
.logAndRegWrap{
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  padding: 140px 0 60px;
}
.logAndRegBox{
  width: 460px;
  padding: 40px 80px;
  margin: 0 auto;
  background: rgba(24,30,34,0.5);
}
.logregTitle{
  padding-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}
.inputBox{
  padding-top: 20px;
}
.lrInput{
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #969696;
  font-size: 14px;
  color: #ffffff;
  background: none;
}
.lrInput:focus{
  border-bottom-color: #0090ff;
}
.lrInput::-webkit-input-placeholder { /* WebKit browsers */ 
  color: #969696; 
  font-size: 14px;
} 

.lrInput:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
  color: #969696; 
  font-size: 14px;
}

.lrInput:-ms-input-placeholder { /* Internet Explorer 10+ */ 
  color: #969696; 
  font-size: 14px;
} 
.codeBox{
  display: flex;
  justify-content: space-between;
}
.codeInput{
  flex: 1;
}
.codeBtn{
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  margin-left: 10px;
  text-align: center;
  color: #ffffff;
  background: #0090ff;
  font-size: 14px;
  white-space: nowrap;
}
.tipsBox{
  padding: 8px 0 0 10px;
  line-height: 30px;
  text-align: left;
  font-size: 14px;
  color: #ffffff;
}
.errorTxt{
  color: #ff3b30;
}

.checkboxWrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  margin: 30px 0 20px;
  white-space: nowrap;
}
.checkboxBox{
  color: #ffffff;
}
.forgetPasswordBox{
  font-size: 14px;
  color: #0090ff;
}
.forgetPasswordBox:hover{
  cursor: pointer;
}
.btn{
  width: 300px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  background: #0090ff;
  font-weight: bold;
}
.btn:hover{
  cursor: pointer;
}
.toLoginBox{
  padding-top: 20px;
  font-size: 14px;
  color: #ffffff;
}
.toLoginBox span{
  color: #0090ff;
}
.toLoginBox span:hover{
  cursor: pointer;
}
</style>