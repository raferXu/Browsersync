<!-- rafer -->
<template>
  <div class="listBox" :style="listStyle">
      <img v-if="obj.src" :src="obj.src" alt="">
      <h4 class="p30">{{obj.title}}</h4>
      <p class="plr30">{{obj.text}}</p>
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
      obj: {
          type: Object,
          default: () => {}
      },
      listStyle: {
          type: Object,
          default: () => { return {
                width: '565px',
                height: '382px',
                background: '#ffffff'
            }
          }
      }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted(){},

  created(){},

  methods: {}
}

</script>
<style scoped>
.listBox{
    width: 100%;
}
.listBox img{
    width: 100%;
}
.listBox h4{
    padding: 20px;
    font-size: 24px;
    color: #323232;
    text-align: center;
    line-height: 1;
}
.listBox p{
    padding: 0 20px;
    font-size: 14px;
    color: #828282;
    text-align: left;
    line-height: 24px;
}
</style>