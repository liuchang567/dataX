<template>
  <div class="wrapper">
    <div class="x-wrapper" v-if="!showPreView">
      <div class="x-layers">
        <div class="x-title">图层</div>
        <div class="x-action">
          <i class="x-icon top" title="置顶"></i>
          <i class="x-icon top1" title="上一层"></i>
          <i class="x-icon bot1" title="下一层"></i>
          <i class="x-icon bot" title="置底"></i>
        </div>
        <div class="layers-list">
          <div class="list-item"
          @click="selectLayer(item.layerId)"
          :class="[item.layerId === activeComId ? 'active' : '']"
          v-for="item in layers" :key="item.layerId">图层{{item.layerId}}</div>
        </div>
        <div class="x-action">
          <div class="x-icon del" title="删除图层" @click="delLayers"></div>
          <div class="x-icon save" title="保存" @click="save"></div>
          <div class="x-icon prev" title="预览" @click="toPreview"></div>
        </div>
      </div>
      <div class="x-components">
        <div class="x-title">组件</div>
        <div class="components-list">
          <div @click="selectCom(item)" class="list-item" v-for="(item,index) in compons" :key="index">{{item.title}}</div>
        </div>
      </div>
      <div class="x-view">
        <div class="canvas-div" @dblclick="onDblclick">
          <Ruler :page="page">
            <template slot="context">
                <div :class="['data-com', item.layerId === activeComId ? 'data-com-active' : '']"
                  v-for="item in layers"
                  :key="item.layerId">
                  <vue-draggable-resizable
                    :w="item.models.width"
                    :h="item.models.height"
                    :x="item.models.x"
                    :y="item.models.y"
                    :active="item.layerId === activeComId"
                    :prevent-deactivation="true"
                    @dragging="onDrag"
                    @resizing="onResize"
                    @activated="() => { onCompActivated(item.layerId) }"
                  >
                    <NavigatorLine :x="item.models.x" :y="item.models.y" v-if="item.layerId === activeComId"></NavigatorLine>
                    <component :is="item.name" :models="item.models" :domId="item.layerId"></component>
                  </vue-draggable-resizable>
                </div>
            </template>
          </Ruler>
        </div>
      </div>
      <div class="x-schema">
        <PageSchema :pageInfo="page" v-if="activeComId === ''"></PageSchema>
        <component :is="activeLayer.schemaName" :schemaInfo="activeLayer" v-else></component>
      </div>
    </div>
    <div class="x-wrapper" v-else>
      <PreView @back="noPreView"></PreView>
    </div>
  </div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import NavigatorLine from './componets/NavigatorLine.vue'
import Ruler from './componets/Ruler.vue'
import PreView from './componets/PreView.vue'
import PageSchema from './componets/schema/page.vue'
import { Schema } from './config/index.js'
import axios from 'axios'
export default {
  name: 'home',
  props: {
  },
  components: {
    NavigatorLine, Ruler, VueDraggableResizable, PreView, PageSchema
  },
  data () {
    return {
      compons: [
        {
          title: '标题',
          type: 'title',
          name: 'title1'
        },
        {
          title: '饼状图',
          type: 'piechart',
          name: 'piechart1'
        }
      ],
      page: {
        width: 1920,
        height: 1080,
        backgroundColor: '#404753'
      },
      showPreView: false,
      layers: [],
      idIndex: 0,
      // 选中组件id
      activeComId: ''
    }
  },
  computed: {
    activeLayer() {
      return this.layers.filter((i) => i.layerId === this.activeComId)[0]
    }
  },
  watch: {
    // activeLayer() {
    //   console.log(this.activeLayer)
    // }
  },
  methods: {
    // 选择图层
    selectLayer (id) {
      this.onCompActivated(id)
    },
    // 删除图层
    delLayers () {
      for (let i = 0; i < this.layers.length; i++) {
        if (this.layers[i].layerId === this.activeComId) {
          this.layers.splice(i, 1)
        }
      }
      this.activeComId = ''
    },
    // 选择组件
    selectCom (item) {
      let schema
      if (item.type === 'title') {
        schema = Schema.titleSchema
      } else {
        schema = Schema.chartSchema
      }
      const id = `${item.type + this.idIndex++}`
      this.layers.push(Object.assign({
        layerId: id,
        schemaName: item.name + 'ma',
        files: [...schema[item.name].files],
        models: { ...schema[item.name].models }
      }, item))
      this.onCompActivated(id)
    },
    // 组件拖放
    onDrag (x, y) {
      this.layers.forEach((item) => {
        if (item.layerId === this.activeComId) {
          item.models.x = x
          item.models.y = y
        }
      })
    },
    // 组件改变大小
    onResize (x, y, width, height) {
      this.layers.forEach((item) => {
        if (item.layerId === this.activeComId) {
          item.models.x = x
          item.models.y = y
          item.models.width = width
          item.models.height = height
        }
      })
    },
    // 点击组件
    onCompActivated (layerId) {
      this.activeComId = layerId
    },
    // 双点击组件外的的区域
    onDblclick (e) {
      this.activeComId = ''
    },
    // 预览
    toPreview() {
      const appInfos = {
        page: this.page,
        components: this.layers
      }
      this.$store.dispatch('updateAppInfos', appInfos)
      this.showPreView = true
      this.activeComId = ''
      this.requestFullScreen('body')
    },
    noPreView() {
      this.showPreView = false
      this.exitFullscreen()
    },
    // 全屏
    requestFullScreen(element) {
      const de = document.querySelector(element) || document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      }
    },
    exitFullscreen(element) {
      document.exitFullscreen()
    },
    // 保存
    save() {
      const appInfos = {
        page: this.page,
        components: this.layers
      }
      const param = {
        schema: appInfos
      }
      axios.post('http://localhost:3000/mock/saveJson', param).then((response) => {
          console.log(response)
        }).catch( (error) => {
          console.log(error)
      })
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  position: relative;
}
.data-com{
  cursor: move;
}
</style>
