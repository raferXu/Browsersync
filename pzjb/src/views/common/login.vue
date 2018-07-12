<!--  -->
<template>
  <div class="logAndRegWrap" :style="bgStyle">
    <div class="logAndRegBox">
      <div class="logregTitle">{{formTxt.title}}</div>
      <div class="inputRow">
        <div class="inputBox">
          <input class="lrInput" type="text" v-model="formData.name" :placeholder="formTxt.placeholder.user">
        </div>
        <div class="tipsBox" v-if="errorShow.name">{{formTxt.errorTips.user.txt}}</div>
      </div>
      <div class="inputRow">
        <div class="inputBox">
          <input class="lrInput" type="password" v-model="formData.password" :placeholder="formTxt.placeholder.password">
        </div>
        <div class="tipsBox" v-if="errorShow.password">{{formTxt.errorTips.password.txt}}</div>
      </div>
      <div class="checkboxWrap">
        <div class="checkboxBox">
          <Checkbox size="large" v-model="formTxt.checkRow.rememberFlag">{{formTxt.checkRow.label}}</Checkbox>
        </div>
        <div class="forgetPasswordBox" @click="forgetPassword">{{formTxt.checkRow.other}}</div>
      </div>
      <div class="btnBox">
        <div class="btn" @click="loginHandler">{{formTxt.btnTxt}}</div>
        <div class="tipsBox" v-if="errorShow.axios">{{formTxt.errorTips.axios.txt}}</div>
      </div>
      <div class="toRegisterBox">{{formTxt.toRegister.tip}}<span @click="toRegister">{{formTxt.toRegister.txt}}</span></div>
    </div>
  </div>
</template>

<script>
import {common} from '../../assets/js/common'
export default {
  data () {
    return {
      from: '',
      bgStyle: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(' + require('../../assets/images/登录注册背景.jpg') + ')' ,
      },
      token: '',
      formTxt: {
        title: '登录',
        placeholder: {
          user: '账号/手机/邮箱',
          password: '密码'
        },
        errorTips: {
          user: {
            txt: '请输入帐号',
            arr: ['请输入帐号']
          },
          password: {
            txt: '请输入密码',
            arr: ['请输入密码']
          },
          axios: {
            txt: '账号不存在或密码错误，请重新输入',
            arr: ['账号不存在或密码错误，请重新输入','账号或密码不对']
          }
        },
        checkRow: {
          label: '记住我',
          other: '忘记密码',
          rememberFlag: false 
        },
        btnTxt: '登录',
        toRegister: {
          txt: '立即注册',
          tip: '还没有帐号?'
        }
      },
      formData: {
        name: '',
        password: ''
      },
      canSubmit: true,
      errorShow: {
        name: false,
        password: false,
        axios: false
      }
    };
  },
  created () {
    
    this.$store.commit('footerHide');
    this.$store.commit('cancelTokenFail',false);
    var username = localStorage.getItem('username');
    if(username){
      console.log('之前 记住我 勾选了,user: '+username);
      this.formTxt.checkRow.rememberFlag = true;
      this.formData.name = username;
    }else{
      console.log('之前 记住我 没勾选');
    }
    this.from = common.GetUrlParam('from');
    console.log('from: '+this.from);
    
  },
  components: {},
  computed: {},
  mounted(){
  },
  methods: {
    checkUserName(){
      if(!this.formData.name){
        console.log('登录时用户名为空');
        this.errorShow.name = true;
        return true;
      }else{
        this.errorShow.name = false;
      }
    },
    checkPassword(){
      if(!this.formData.password){
        console.log('登录时密码为空');
        this.errorShow.password = true;
        return true;
      }else{
        this.errorShow.password = false;
      }
    },
    checkRemember(){
      if(this.formTxt.checkRow.rememberFlag){
        console.log('记住我 勾选了');
        localStorage.setItem('username',this.formData.name);
      }else{
        console.log('记住我 没勾选');
        localStorage.removeItem('username');
      }
    },
    loginReq(data){
      return this.axios({
          url:"/token/account/log_in",
          data:data,
          method:'post'
      });
    },
      loginHandler(){
        var _this = this;
        console.log('点击登录按钮，目前按钮是否可点击: '+this.canSubmit);
        if(this.checkUserName() || this.checkPassword()) return;
        this.checkRemember();
        this.canSubmit = false;
        
        this.loginReq(this.formData).then((res)=>{
          _this.canSubmit = true;
          console.log('/token/account/log_in then')
          console.log(res)
          if(res.status==200){
            var resData = res.data;
            if(resData.code==200){
              var token = resData.body.token;
              var phone = resData.body.phone;
              window.localStorage.setItem('token',token);
              this.$store.commit('loginFn', token);
              this.$store.commit('setName', this.formData.name);
              this.$store.commit('setPhone', phone);
              let redirect = decodeURIComponent(_this.$route.query.redirect || '/index');
              console.log(redirect);
              if(this.from){
                common.backTo(this.from);
              }else{
                this.$router.push({
                  path: redirect
                });
              }
            }else{
              console.log('接口异常，返回码为: '+resData.code);
              if(resData.code==703){
                this.formTxt.errorTips.axios.txt = this.formTxt.errorTips.axios.arr[1];
                this.errorShow.axios = true;
              }
              return;
            }
          }else{
            console.log('网络异常，返回状态码: '+res.status);
          }
        }).catch((err)=>{
          console.log('/token/account/log_in err')
          console.log(err)
        });
      },
      forgetPassword(){
        console.log('忘记密码click');
      },
      toRegister(){
        console.log('立即注册click');
        if(this.from){
          this.$router.push('/register?from='+this.from);
        }else{
          var redirect = this.$route.query.redirect || '/index';
          console.log('redirect: '+redirect);
          this.$router.push('/register?to='+redirect);
        }
        
      }
  }
}

</script>
<style>
.logAndRegWrap .ivu-checkbox-wrapper{
  font-size: 14px;
  margin: 0;
}
.logAndRegWrap .ivu-checkbox{
  margin-right: 3px;
}
/* .logAndRegWrap .ivu-checkbox-inner{
  background: none;
  border-color: #ffffff;
} */
</style>
<style scoped>
.logAndRegWrap{
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
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
.tipsBox{
  padding: 8px 0 0 10px;
  line-height: 30px;
  text-align: left;
  font-size: 14px;
  color: #ff3b30;
}
.checkboxWrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  margin: 30px 0 20px;
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
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  background: #0090ff;
  font-weight: bold;
}
.btn:hover{
  cursor: pointer;
}
.toRegisterBox{
  padding-top: 20px;
  font-size: 14px;
  color: #ffffff;
}
.toRegisterBox span{
  color: #0090ff;
}
.toRegisterBox span:hover{
  cursor: pointer;
}
</style>