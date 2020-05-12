<template>
  <div class="wrapper" ref="wrapper">
    <SketchRule
      :lang="lang"
      :thick="thick"
      :scale="scale"
      :width="width"
      :height="height"
      :startX="startX"
      :startY="startY"
      :shadow="shadow"
      :horLineArr="lines.h"
      :verLineArr="lines.v"
      :cornerActive="true"
      @handleLine="handleLine"
      @onCornerClick="handleCornerClick"
      :palette="palette"
    >
    </SketchRule>
    <div ref='screensRef' id="screens" @wheel="handleWheel" @scroll="handleScroll">
      <div ref="containerRef" class="screen-container" :style="scrollDivStyle">
        <div id="canvas" :style="canvasStyle">
           <slot name="context"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SketchRule from 'vue-sketch-ruler'
export default {
  name: 'Ruler',
  components: {
    SketchRule
  },
  props: {
    page: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      scale: 0.5,
      startX: 0,
      startY: 0,
      lines: {
        h: [],
        v: []
      },
      thick: 20,
      lang: 'zh-CN',
      isShowRuler: false,
      isShowReferLine: false,
      palette: {
        bgColor: 'rgba(225,225,225, 0)',
        longfgColor: '#BABBBC',
        shortfgColor: '#C8CDD0',
        fontColor: '#7D8694',
        shadowColor: '#E8E8E8',
        lineColor: '#2196F3',
        borderColor: '#DADADC',
        cornerActiveColor: 'rgb(235, 86, 72, 0.6)'
      }
    }
  },
  computed: {
    shadow () {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    },
    scrollDivStyle () {
      return {
        width: `${this.page.width}px`,
        height: `${this.page.height}px`
      }
    },
    canvasStyle () {
      return {
        width: `${this.page.width}px`,
        height: `${this.page.height}px`,
        transform: `scale(${this.scale})`,
        background: this.page.backgroundColor
      }
    }
  },
  watch: {
  },
  methods: {
    handleLine (lines) {
      this.lines = lines
    },
    handleCornerClick () {

    },
    handleScroll () {
      const screensRect = document.querySelector('#screens').getBoundingClientRect()
      const canvasRect = document.querySelector('#canvas').getBoundingClientRect()
      // 标尺开始的刻度
      const startX = (screensRect.left + this.thick - canvasRect.left) / this.scale
      const startY = (screensRect.top + this.thick - canvasRect.top) / this.scale

      this.startX = startX
      this.startY = startY
    },
    // 控制缩放值
    handleWheel (e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        )
        this.scale = nextScale
      }
      this.$nextTick(() => {
        this.handleScroll()
      })
    }
  },
  mounted () {
    // 获取容器宽高
    this.$nextTick(() => {
      this.height = this.$refs.wrapper.clientHeight
      this.width = this.$refs.wrapper.clientWidth
    })
    // 滚动居中
    this.$refs.screensRef.scrollLeft = 400
    this.$refs.screensRef.scrollTop = 100
  }
}
</script>
<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.screen-container {
  position: absolute;
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
<style>
.indicator .value{
  background: #424040!important;
}
</style>
