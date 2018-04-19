<template>
    <div id="canvas_con" style="position:relative;">
        <canvas id="penal" width="705" height="385" style='background:#ccc' @mousemove='mousemove' @mouseup='mouseup' @mousedown='mousedown' @mouseleave='mouseleave'></canvas>
        <!-- <canvas id="penal" style='background:#ccc' @mousemove='mousemove' @mouseup='mouseup' @mousedown='mousedown' @mouseleave='mouseleave'></canvas> -->
    </div>  
</template>

<script>
// import {draw} from '@components/canvas/canvas'

export default {
  data () {
    return {
        pen:{},
        penal:{},
        isDraw:false,
        originX:null,
        originY:null,
        img:new Image(),
        list:[],
        count:1
    }
  },
  mounted() {
      let penal=this.penal=document.getElementById('penal')
      let pen=this.pen=penal.getContext('2d')
      pen.strokeStyle = "red";
        //第四步：绘制矩形，只有线。内容是空的
        // pen.strokeRect(1, 1, 190, 100);
  },
  methods:{
      mousedown(e){
        this.isDraw = true;
        this.img.src = this.penal.toDataURL('image/png');
        console.log(document.body.clientWidth);
        this.originX = (e.clientX - this.penal.getBoundingClientRect().left)*(1920/document.body.clientWidth);    //原点x坐标
        this.originY = (e.clientY - this.penal.getBoundingClientRect().top)*(1920/document.body.clientWidth);     //原点y坐标
        this.pen.moveTo(this.originX, this.originY);
        this.pen.strokeStyle = 'red';
        this.pen.lineWidth = '2px';
        this.pen.beginPath();
        console.log(e.clientX);
      },
      mousemove(e){
          let self=this
          if(self.isDraw){
            var x = (e.clientX - self.penal.getBoundingClientRect().left)*(1920/document.body.clientWidth);
            var y = (e.clientY - self.penal.getBoundingClientRect().top)*(1920/document.body.clientWidth);
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
        this.pen.strokeText(this.count,e.clientX - this.penal.getBoundingClientRect().left + 10,e.clientY - this.penal.getBoundingClientRect().top);
        
        this.isDraw = false;
        this.count++;
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
        this.pen.clearRect(0,0,800,800);
        var img = new Image();
        img.src = src;
        this.pen.drawImage(img,0,0);
      }
  } 
}  
  
</script> 
<style scoped>
  #penal {
            width: 705px;
            height: 385px;
            /* width: 100%; */
            /* height: 100%; */
        }
</style>
