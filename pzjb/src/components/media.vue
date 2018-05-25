<template>
  <div class="media" :class="{'rr': mediaData.imgRight}">
      <div class="imgBox">
          <img class="mediaImg" :src="mediaData.url" alt="mediaImg">
      </div>
      <div class="txtBox">
          <h3 class="mainH3B pt40 pb40" :style="overridingStyles">{{mediaData.title}}</h3>
          <p class="mainTxtB" :style="overridingStyles">{{mediaData.txt}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
      mediaData: {
          default: {}
      },
      overridingStyles: {
          type: Object,
          default: function () {
              return {}
          }
      }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.media{
    display: flex;
}
.media .imgBox{
    margin-right: 160px;
    margin-left: 0px;
}
.imgBox{
    width: 382px;
    height: 220px;
    background: #333333;
}
.mainTxtB{
    color:#828282;
}
.mediaImg{
    width: 382px;
}
.rr{
    flex-direction: row-reverse;
}
.rr .imgBox{
    margin-left: 160px;
    margin-right: 0px;
}
.txtBox{
    flex: 1;
}
</style>
