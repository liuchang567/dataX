<template>
  <div class="color-wrapper">
    <div class="color" @click.stop="selectColor" :style="'background-color:' + hex8"></div>
    <chrome-picker id="colorpicker" class="color-picker" :value="hex8" @input="updateValue" v-if="show"></chrome-picker>
  </div>
</template>
<script>
import { Chrome } from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    'chrome-picker': Chrome
  },
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      hex8: ''
    }
  },
  methods: {
    updateValue (e) {
      this.hex8 = e.hex8
      this.$emit('oncolor', this.hex8)
    },
    selectColor () {
      this.show = !this.show
    }
  },
  mounted () {
    this.hex8 = this.color
  },
  created () {
    document.addEventListener('click', e => {
      if (e.target.className.indexOf('vc') < 0 && this.show) {
        this.show = false
      }
    })
  }
}
</script>
<style scoped>
.color-wrapper{
  position: relative;
}
.color-picker {
  position: absolute;
  z-index: 2;
  top: 30px;
  left: -35px;
}
.color {
  width: 190px;
  display: block;
  height: 26px;
}
</style>
