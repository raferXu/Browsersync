<template>
  <div class="proIntroduceBox">
    <h3 class="sectionTitle">{{itrdObj.title}}</h3>
    <p>{{itrdObj.txt}}</p>
    <img :src="itrdObj.img" alt="proIntroduce">
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['itrdObj']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.proIntroduceBox{
  padding: 0 415px 160px;
}
.proIntroduceBox h3{
  margin-bottom: 40px;
}
.proIntroduceBox p{
  color: #666666;
  font-size: 24px;
  margin-bottom: 80px;
  text-align: left;
}
.proIntroduceBox img{
  width: 100%;
}
</style>
