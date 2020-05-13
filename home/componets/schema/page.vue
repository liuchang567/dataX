<template>
  <div class="page-info">
    <div class="x-title">页面设置</div>
    <div class="infos">
      <div class="infos-wrapper">
        <div class="label">屏幕大小</div>
        <div class="context">
          <div class="x-item">
            <input class="x-input x-number" v-model="pageInfo.width" type="number" step="1" min="1" max="2560" />
          </div>
          <div class="x-item">
            <input class="x-input x-number" v-model="pageInfo.height" type="number" step="1"  min="1" max="1440" />
          </div>
        </div>
      </div>
      <div class="infos-wrapper">
        <div class="label">背景颜色</div>
        <div class="context">
          <div class="x-item">
            <ColorPicker :color="pageInfo.backgroundColor" @oncolor="selectColor"></ColorPicker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ColorPicker from '../ColorPicker.vue'
export default {
  name: 'pageSchema',
  props: {
    pageInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ColorPicker
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    // 选择背景颜色
    selectColor (color) {
      this.pageInfo.backgroundColor = color
    },
  }
}
</script>
<style scoped>
</style>
