<template>
  <div class="navigator-line">
    <div class="navigator-line-left" :style="'width:' + width + 'px'"></div>
    <div class="navigator-line-top" :style="'height:' + height + 'px'"></div>
  </div>
</template>
<script>
export default {
  name: 'NavigatorLine',
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    width () {
      const screensRect = document.querySelector('#screens').getBoundingClientRect()
      const canvasRect = document.querySelector('#canvas').getBoundingClientRect()
      return screensRect.width + canvasRect.width + 400 + this.x
    },
    height () {
      const screensRect = document.querySelector('#screens').getBoundingClientRect()
      const canvasRect = document.querySelector('#canvas').getBoundingClientRect()
      return screensRect.height + canvasRect.height + 100 + this.y
    }
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>
.navigator-line{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  box-sizing: content-box;
}
.navigator-line-left {
  position: absolute;
  border-top: 1px dashed #2483ff;
  height: 0;
  top: 0;
  transform: translateX(-100%);
}
.navigator-line-top {
  position: absolute;
  border-left: 1px dashed #2483ff;
  width: 0;
  left: 0;
  transform: translateY(-100%);
}
</style>
