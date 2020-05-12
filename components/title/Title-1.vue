<template>
  <div :id="domId" class="dom" :style="style" >
      {{models.value}}
  </div>
</template>
<script>
export default {
  name: 'title1',
  props: {
    models: {
      type: Object,
      default: () => {}
    },
    page: {
      type: Object,
      default: () => {}
    },
    domId: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    style () {
      if (this.show) {
        return {
          width: `${this.models.width / this.page.width * 100}%`,
          height: `${this.models.height / this.page.height * 100}%`,
          left: `${this.models.x / this.page.width * 100}%`,
          top: `${this.models.y / this.page.height * 100}%`
        }
      } else {
        return {
          width: `${this.models.width}px`,
          height: `${this.models.height}px`
        }
      }
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
