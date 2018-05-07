<template>
    <div id="canvas_con" style="width:100%">
        <canvas id="penal" width="" height="191" style='background:#ccc' @mousemove='mousemove' @mouseup='mouseup' @mousedown='mousedown' @mouseleave='mouseleave'></canvas>
    </div>  
</template>

<script>
// import {draw} from '@components/canvas/canvas'

export default {
  props: ['canvasWidth','canvasHeight','index','originImg','imgFlag'],
  data () {
    return {
        pen:{},
        penal:{},
        isDraw:false,
        originX:null,
        originY:null,
        img:new Image(),
        list:[],
        count:1,
        paintxy:{},
        paintData:[],
        imgSize:{},
        savePaint:[],
        paintMes:{},
        allPaintMes:{}
    }
  },
  mounted() {
      // let penal=this.penal=document.getElementById('penal');
      // let canvasCon = document.getElementById("canvas_con");
      // let pen=this.pen=penal.getContext('2d')
      // pen.strokeStyle = "red";
      //   //第四步：绘制矩形，只有线。内容是空的
      //   // pen.strokeRect(1, 1, 190, 100);
      //   // var docSize = document.body.clientWidth;
      //   // console.log(this.percent1);
      //   penal.width = this.canvasWidth;
      //   penal.height = this.canvasHeight;
      //   this.imgSize.x = penal.width;
      //   this.imgSize.y = 191;
      //   console.log(this.canvasWidth+"__________");
      //   canvasCon.style.cssText="width:"+this.imgSize.x+"px;height:"+this.imgSize.y+"px;position:relative;margin:0 auto;";
      //   //this.createCloseBtn();
        this.$nextTick(() => {
            let penal=this.penal=document.getElementById('penal');
      let canvasCon = document.getElementById("canvas_con");
      let pen=this.pen=penal.getContext('2d')
      pen.strokeStyle = "red";
        //第四步：绘制矩形，只有线。内容是空的
        // pen.strokeRect(1, 1, 190, 100);
        // var docSize = document.body.clientWidth;
        // console.log(this.percent1);
        penal.width = this.canvasWidth;
        penal.height = this.canvasHeight;
        this.imgSize.x = penal.width;
        this.imgSize.y = penal.height;
        // console.log(this.canvasWidth+"__________");
        canvasCon.style.cssText="width:"+this.imgSize.x+"px;height:"+this.imgSize.y+"px;position:relative;margin:0 auto;";
        //this.createCloseBtn();
        })
  },
  methods:{
      mousedown(e){
        this.isDraw = true;
        this.img.src = this.penal.toDataURL('image/png');
        this.originX = e.clientX - this.penal.getBoundingClientRect().left;    //原点x坐标
        this.originY = e.clientY - this.penal.getBoundingClientRect().top;     //原点y坐标
        this.pen.moveTo(this.originX, this.originY);
        this.pen.strokeStyle = 'red';
        this.pen.lineWidth = '2px';
        this.pen.beginPath();
        this.paintxy.y = this.originY;
        this.paintMes.x1 = this.originX;
        this.paintMes.y1 = this.originY;
       
      },
      mousemove(e){
          let self=this
          if(self.isDraw){
            var x = e.clientX - self.penal.getBoundingClientRect().left;
            var y = e.clientY - self.penal.getBoundingClientRect().top;
            var newOriginX  = this.originX,newOriginY = this.originY;
            self.pen.clearRect(0,0,800,800);
            self.pen.drawImage(self.img, 0, 0);
            self.pen.beginPath();

            // if(x < originX){
            //     newOriginX = x;
            // }
            // if(y < originY){
            //     newOriginY = y;
            // }
            self.pen.rect(newOriginX,newOriginY,Math.abs(x-this.originX),Math.abs(y-this.originY));
            self.pen.stroke();
            self.pen.closePath();
        }
      },
      mouseleave(){
        if(this.isDraw){
            this.pen.closePath();
            this.isDraw = false;
        }
      },
      mouseup(e){
        this.$emit("addItem");
        this.pen.fillStyle = 'red';
        this.pen.font = '14px 宋体';
        console.log("count:"+this.count);
        this.paintMes.x2 = e.clientX - this.penal.getBoundingClientRect().left;
        this.paintMes.y2 = e.clientY - this.penal.getBoundingClientRect().top;
        this.addPaintMes();
        this.pen.strokeText(this.count,e.clientX - this.penal.getBoundingClientRect().left +10,e.clientY - this.penal.getBoundingClientRect().top);
        this.paintxy.x = e.clientX - this.penal.getBoundingClientRect().left;
        this.paintData.push(this.paintxy);
        
        this.createCloseBtn(this.paintMes.x2-12,this.paintMes.y1-5);
        // console.log(this.paintData[this.count-1]);
        // this.pen.fillText("X",this.paintData[this.count-1].x+10,this.paintData[this.count-1].y+10);
        this.isDraw = false;
        this.count++;
        this.paintxy = [];
        
        
      }, 
      addPaintMes(){
        var attr = this.index;
        // this.savePaint.push({
        //   x1:this.paintMes.x1,
        //   y1:this.paintMes.y1,
        //   x2:this.paintMes.x2,
        //   y2:this.paintMes.y2
        // })
        // if(!this.allPaintMes[attr]){
        //   this.allPaintMes[attr] = [];
        //   this.allPaintMes[attr].push(this.savePaint);
        // }else{
        //   this.allPaintMes[attr].push(this.savePaint);
        // } 
        // this.savePaint = [];
        if(!this.allPaintMes[attr]){
          this.allPaintMes[attr] = [];
          this.allPaintMes[attr].push({
          x1:this.paintMes.x1,
          y1:this.paintMes.y1,
          x2:this.paintMes.x2,
          y2:this.paintMes.y2
        });
        }else{
          this.allPaintMes[attr].push({
          x1:this.paintMes.x1,
          y1:this.paintMes.y1,
          x2:this.paintMes.x2,
          y2:this.paintMes.y2
        });
        } 
        // this.savePaint = [];
        // console.log(this.allPaintMes);
      },
      clearCount(){
        this.count = 1;
      },
      offset(e){
        var t=e.offsetLeft;
        while(e=e.offsetParent)
         t+=e.offsetLeft;
        return t;
      },
      drawImage(src){
        var _this = this;
        this.pen.clearRect(0,0,800,800);
        // console.log(src)
        var img = new Image();
        img.src = src;
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function(){
          console.log('src');
          _this.pen.drawImage(img,0,0,_this.imgSize.x,_this.imgSize.y);
        }
        // console.log(img.complete)
        
      },
      createCloseBtn(left,top){
        let self = this;
        var x = document.createElement("div");
        x.innerHTML = "X";
        x.classList.add("close_x");
        // console.log("class:"+this.count);
        x.classList.add("close_x_"+this.index,"close_x_"+this.index+"_"+this.count);
        x.data_attr1 = this.index;
        x.data_attr2 = this.count-1;
        document.getElementById("canvas_con").appendChild(x);
        x.style.cssText="left:"+left+"px;top:"+top+"px;position: absolute;color: red;font-size: 14px;cursor: pointer;height: 16px;z-index: 9999;width: 16px;";
        x.addEventListener("click",function(event){
          // alert(111);
          var el = event.currentTarget;
          var msg = {};
          msg.n = el.data_attr1;
          msg.m = el.data_attr2;
          x.remove();
          // console.log("11111+++++"+el.data_attr2);
          self.reDrawImg(el.data_attr1,el.data_attr2);
          // self.$emit('deleteMes',msg);
        })
      },
      reDrawImg(attr1,attr2){
        let _this = this;
        var img = new Image();
        // console.log(attr1+"---------"+attr2)
        // console.log(this.index+"+++++++")
        img.src = this.originImg[attr1].src;
        img.name = this.originImg[attr1].name;
        this.allPaintMes[attr1][attr2] = {};
        this.pen.fillStyle = 'red';
        this.pen.font = '14px 宋体';
        console.log(this.allPaintMes)
        // this.pen.drawImage(img.src);
        this.pen.clearRect(0,0,this.imgSize.x,this.imgSize.y);
        img.onload = function(){
          console.log('src');
          _this.pen.drawImage(img,0,0,_this.imgSize.x,_this.imgSize.y);
          for(var i = 0;i<_this.allPaintMes[attr1].length;i++){
            if(_this.allPaintMes[attr1][i] && _this.allPaintMes[attr1][i]!={}){
              _this.pen.beginPath();
              _this.pen.strokeRect(_this.allPaintMes[attr1][i].x1,_this.allPaintMes[attr1][i].y1,Math.abs(_this.allPaintMes[attr1][i].x2-_this.allPaintMes[attr1][i].x1),Math.abs(_this.allPaintMes[attr1][i].y2-_this.allPaintMes[attr1][i].y1));
              _this.pen.strokeText(i+1,_this.allPaintMes[attr1][i].x2+10,_this.allPaintMes[attr1][i].y2);
              _this.pen.closePath();
            }
            
          }
        }
        // this.pen.drawImage(img,0,0,this.imgSize.x,this.imgSize.y);
        // this.pen.strokeRect(50,50,100,100)
        // this.pen.clearRect(0,0,800,800);
        // this.pen.drawImage(img, 0, 0,this.imgSize.x,this.imgSize.y);
        console.log(this.allPaintMes[attr1].length)
        
      }
  } 
}  
  
</script> 
<style scoped>
  
</style>
