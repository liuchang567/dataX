<template>
  <div :id="domId" class="dom" :style="style"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'piechart1',
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
      return {}
    },
    legend() {
      return this.models.legend.split(',')
    },
    seriesData() {
      const newArr = []
      const arr = this.models.seriesData.split(',')
      for(let i = 0; i < arr.length; i++) {
        newArr.push({ value: arr[i], name: this.legend[i] })
      }
      return newArr
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
    'models.seriesData' () {
      const options = this.getOpt()
      this.charts.setOption(options, true)
    }
  },
  methods: {
    getOpt () {
      const options = {
        title: {
          text: 'xx',
          left: 'center',
          textStyle: {
            color: '#ddd',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.legend,
          textStyle: {
            color: '#ddd'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.seriesData
          }
        ]
      }
      return options
    },
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      const options = this.getOpt()
      this.charts.setOption(options, true)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawPie(this.domId)
    })
  }
}
</script>
