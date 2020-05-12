<template>
  <div class="preview" :style="pageStyle">
    <component 
      v-for="item in appInfo.components" 
      :key="item.layerId" 
      :is="item.name" :models="item.models" :domId="item.layerId" :show="true" :page="appInfo.page">
    </component>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'index',
  props: {
  },
  components: {
  },
  data () {
    return {
      appInfo: {
        page: {},
        components: []
      },
    }
  },
  computed: {
    pageStyle () {
      return {
        width: `${this.appInfo.page.width}px`,
        height: `${this.appInfo.page.height}px`,
        backgroundColor: this.appInfo.page.backgroundColor
      }
    }
  },
  watch: {
  },
  methods: {
    getPage() {
      axios.post('http://localhost:3000/mock/getJson').then((response) => {
          if (response.data.data && response.data.result) {
            this.appInfo = response.data.data
          }
        }).catch((error) => {
          console.log(error)
      })
    }
  },
  mounted () {
    this.getPage()
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
}
</style>
