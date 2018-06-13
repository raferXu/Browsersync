<!--  -->
<template>
  <div class="sectionBox" :style="jbSectionStyle">
    <slot name="sectionHeaderImg"></slot>
    <slot name="sectionHeaderTitle"></slot>
    <div class="contentBox">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted(){},

  created(){},

  methods: {},

  props: {
    jbSectionStyle: {
      default: ()=>{}
    }
  }
}

</script>
<style scoped>
.sectionBox{
  width: 100%;
  min-width: 1170px;
}
.contentBox{
  width: 1170px;
  margin: 0 auto;
}
</style>