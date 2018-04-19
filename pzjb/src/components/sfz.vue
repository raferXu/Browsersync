<template>
  <div class="jbbody">
    <bannerBox></bannerBox>
    <functionBox></functionBox>
    <tryBox></tryBox>
    <applicationBox></applicationBox>
    <priceBox></priceBox>
  </div>
</template>

<script>
import bannerBox from './bannerBox'
import functionBox from './functionBox'
import tryBox from './tryBox'
import applicationBox from './applicationBox'
import priceBox from './priceBox'
export default {
  name: '',
  data () {
    return {

    }
  },
  components: {
    bannerBox,functionBox,tryBox,applicationBox,priceBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
