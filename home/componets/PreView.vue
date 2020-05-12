<template>
  <div class="preview" :style="pageStyle">
    <div class="back" @click="back">关闭预览</div>
    <component 
      v-for="item in appInfos.components" 
      :key="item.layerId" 
      :is="item.name" :models="item.models" :domId="item.layerId" :show="true" :page="page">
    </component>
  </div>
</template>
<script>
export default {
  name: 'preView',
  props: {
  },
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    appInfos () {
      return this.$store.state.appInfos
    },
    page() {
      return this.appInfos.page
    },
    pageStyle () {
      return {
        width: `${this.page.width}px`,
        height: `${this.page.height}px`,
        backgroundColor: this.page.backgroundColor
      }
    }
  },
  watch: {
  },
  methods: {
    back() {
      this.$emit('back', 'back')
    }
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
.preview{
  position: relative;
  overflow: hidden;
  .dom{
    position: absolute;
  }
  .back{
    position: fixed;
    left: 30px;
    bottom: 30px;
    z-index: 2;
    cursor: pointer;
  }
}
</style>
