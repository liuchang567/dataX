<template>
  <div :id="domId" class="dom" :style="style"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'piechart2',
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
    },
    title() {
      return this.models.title
    },
    legend() {
      let legend = Object.assign({}, this.models.legend)
      let data = legend.data.split(',')
      legend.data = data
      return legend
    },
    radius() {
      return `${this.models.radius}%`
    },
    roseType() {
      return `${this.models.roseType}`
    },
    seriesData() {
      const newArr = []
      const arr = this.models.seriesData.split(',')
      for(let i = 0; i < arr.length; i++) {
        newArr.push({ value: arr[i], name: this.legend.data[i] })
      }
      return newArr
    },
    options() {
      return {
        title: JSON.parse(JSON.stringify(this.title)),
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        visualMap: {
          show: false,
          min: 0,
          max: 300,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        legend: JSON.parse(JSON.stringify(this.legend)),
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: this.radius,
            roseType: this.roseType,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            data: this.seriesData
          }
        ]
      }
    }
  },
  data () {
    return {
      charts: {}
    }
  },
  watch: {
    'models.width' () {
      this.charts.resize()
    },
    'models.height' () {
      this.charts.resize()
    },
    options () {
      this.charts.setOption(this.options, true)
    }
  },
  methods: {
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption(this.options, true)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawPie(this.domId)
    })
  }
}
</script>
