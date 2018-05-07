<template>
    <div id="canvas_con" style="">
        <canvas id="penal" width="705" height="385" style='background:#ccc;display:none;' @mousemove='mousemove' @mouseup='mouseup' @mousedown='mousedown' @mouseleave='mouseleave'></canvas>
    </div>  
</template>

<script>
// import {draw} from '@components/canvas/canvas'

export default {
  props: ['percent1','filesName','index','originImg'],
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
      let penal=this.penal=document.getElementById('penal');
      let canvasCon = document.getElementById("canvas_con");
      let pen=this.pen=penal.getContext('2d')
      pen.strokeStyle = "red";
        //第四步：绘制矩形，只有线。内容是空的
        // pen.strokeRect(1, 1, 190, 100);
        var docSize = document.body.clientWidth;
        // console.log(this.percent1);
        penal.width = docSize * this.percent1;
        this.imgSize.x = penal.width;
        this.imgSize.y = 385;
        canvasCon.style.cssText="width:"+penal.width+"px;height:385px;position:relative;margin:0 auto;";
        //this.createCloseBtn();
  },
  methods:{
    showCanvas(){
        var penal = document.getElementById("penal");
        penal.style.cssText="display:block";
      },
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
        this.pen.strokeText(this.count,e.clientX - this.penal.getBoundingClientRect().left + 10,e.clientY - this.penal.getBoundingClientRect().top);
        this.paintxy.x = e.clientX - this.penal.getBoundingClientRect().left;
        this.paintData.push(this.paintxy);
        
        
        // console.log(this.paintData[this.count-1]);
        // this.pen.fillText("X",this.paintData[this.count-1].x+10,this.paintData[this.count-1].y+10);
        this.isDraw = false;
        this.count++;
        this.paintxy = [];
        
        this.createCloseBtn(this.paintMes.x2-12,this.paintMes.y1-5);
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
        console.log(this.allPaintMes);
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
        this.pen.drawImage(img,0,0,this.imgSize.x,this.imgSize.y);
      },
      createCloseBtn(left,top){
        let self = this;
        var x = document.createElement("div");
        x.innerHTML = "X";
        x.classList.add("close_x");
        // console.log("class:"+this.count);
        x.classList.add("close_x_"+this.index,"close_x_"+this.index+"_"+this.count);
        x.data_attr1 = this.index;
        x.data_attr2 = this.count-2;
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
        var img = new Image();
        // console.log(this.index+"+++++++")
        img.src = this.originImg[attr1].src;
        img.name = this.originImg[attr1].name;
        this.allPaintMes[attr1][attr2].length = 0;
        this.pen.fillStyle = 'red';
        this.pen.font = '14px 宋体';
        // this.pen.drawImage(img.src);
        this.pen.clearRect(0,0,this.imgSize.x,this.imgSize.y);
        this.pen.drawImage(img,0,0,this.imgSize.x,this.imgSize.y);
        // this.pen.strokeRect(50,50,100,100)
        // this.pen.clearRect(0,0,800,800);
        // this.pen.drawImage(img, 0, 0,this.imgSize.x,this.imgSize.y);
        console.log(this.allPaintMes[attr1].length)
        for(var i = 0;i<this.allPaintMes[attr1].length;i++){
          if(this.allPaintMes[attr1][i] && this.allPaintMes[attr1][i].length!=0){
            this.pen.beginPath();
            this.pen.strokeRect(this.allPaintMes[attr1][i][0].x1,this.allPaintMes[attr1][i][0].y1,Math.abs(this.allPaintMes[attr1][i][0].x2-this.allPaintMes[attr1][i][0].x1),Math.abs(this.allPaintMes[attr1][i][0].y2-this.allPaintMes[attr1][i][0].y1));
            this.pen.strokeText(i+1,this.allPaintMes[attr1][i][0].x2,this.allPaintMes[attr1][i][0].y2);
            this.pen.closePath();
          }
          
        }
      }
  } 
}  
  
</script> 
<style scoped>
  
</style>
