<!--  -->
<template>
  <div>
      <canvas ref="expCanvas"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
        context: null,
        boxW: 416,
        boxH: 350,
        natImgW: 0,
        natImgH: 0,
        params: {
          scale: 1,
          pt: 0,
          pl: 0
        },
        drawRectData: {},
        drawImgData: {}
    };
  },
  props: {
      src: {
          default: ''
      },
      rectData: {
        default: ()=>{}
      },
      hasClickSubmit: {
        default: false
      }
  },

  components: {},

  computed: {},

  mounted(){
      this.boxW = this.$parent.$refs.bigImgBox.clientWidth
      this.boxH = this.$parent.$refs.bigImgBox.clientHeight
      this.createcanvas()
      this.showImg(this.src);
  },

  watch: {
      src(){  //src变化时绘制大图
          this.showImg(this.src);
      },
      rectData: {  //单选框变化绘制图片和框框
        handler(newValue, oldValue) {
          this.drawImage(this.drawImgData)
          this.drawAllRect(newValue)
  　　　　},
  　　　　deep: true
      },
      hasClickSubmit(){  //提交后导出图片地址
        this.getCanvasImg();
      }
  },

  created(){
  },

  methods: {
    getRectData(name){ //获取姓名或身份证的算法答案
      return this.rectData.example[name]
    },
    resetData(data){  //确定画框最终坐标
      var s = this.params.scale;
      var pt = this.params.pt;
      var pl = this.params.pl;
      var obj = {};
      return {
        x: data.xmin*s+pl,
        y: data.ymin*s+pt,
        w: (data.xmax-data.xmin)*s,
        h: (data.ymax-data.ymin)*s
      }
    },
    drawAllRect(resObj){  //画出所有框
      var nameArr = resObj.checkedNames;
      for(let i=0;i<nameArr.length;i++){
        var originData = this.getRectData(nameArr[i])
        var data = this.resetData(originData)
        this.drawOneRect(this.context,data)
      }
    },
    drawOneRect(ctx,obj){  //画一个框
      ctx.strokeStyle = '#FA6900'; 
      ctx.shadowOffsetX = 5; 
      ctx.shadowOffsetY = 5; 
      ctx.shadowBlur = 4; 
      ctx.shadowColor = 'rgba(204, 204, 204, 0.5)'; 
      ctx.strokeRect(obj.x,obj.y,obj.w,obj.h); 
      ctx.save();
    },
    createcanvas() {  //创建canvas上下文
        var mycanvas=this.$refs.expCanvas;
        mycanvas.width = this.boxW;
        mycanvas.height = this.boxH;
        this.context=mycanvas.getContext('2d');
    },
    drawImage(obj) {  //绘制图片
      this.context.clearRect(0,0,this.boxW,this.boxH);
      this.context.drawImage(obj.src, obj.x, obj.y, obj.w, obj.h);
    },
    showImg(src){  //绘制大图
      var _this = this;
      if(src){
        this.getImageSize(src).then((res)=>{
          var direction = _this.getScaleDirection(res);
          var drawObj = _this.setImageSize(direction,res);
          var obj = Object.assign({},drawObj,{src:res.img})
          _this.drawImgData = obj;
          _this.drawImage(obj);
        },(rej)=>{
          console.log('获取图片失败');
        });
      }else{
        console.log('showImg函数执行时src不存在');
      }
    },
    getImageSize(src){  //获取图片原始尺寸
      return new Promise((resolve,reject)=>{
        var img=new Image(), obj = {};
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload=function() {
          console.log('图片加载成功');
          obj.w = img.naturalWidth;
          obj.h = img.naturalHeight;
          obj.img = img;
          resolve(obj);
        }
        img.onerror = function(){
          alert('图片加载失败，请刷新重试');
          reject(new Error('图片加载失败, url: '+src));
        }
        img.src=src;
      })
    },
    getScaleDirection(obj){  //确定图片缩放方向
      var wScale = this.boxW / obj.w;
      var hScale = this.boxH / obj.h;
      if(wScale>hScale){
        console.log('高度应该撑满')
        return {
          d: 'v',
          s: hScale
        };
      }else{
        console.log('宽度应该撑满')
        return {
          d: 'h',
          s: wScale
        };
      }
    },
    getCanvasImg(){  //导出带画框的图片
      var _this = this;
      this.$emit('getCanvasImg',_this.$refs.expCanvas.toDataURL('image/png'));
    },
    setImageSize(scaleObj,imgObj){  //设置图片的最终尺寸
      var _this = this;
      var s = scaleObj.s;
      var size = {};
      var x,y,w,h;
      this.params.scale = s;
      if(scaleObj.d=='h'){
        w = _this.boxW;
        x = 0;
        h = s*imgObj.h;
        y = (_this.boxH - h)/2
      }else{
        h = _this.boxH;
        y = 0;
        w = s*imgObj.w;
        x = (_this.boxW - w)/2
      }
      this.params.pl = x;
      this.params.pt = y;
      return {
        x: x,
        y: y,
        w: w,
        h: h
      }
    },
  }
}

</script>
<style scoped>
</style>