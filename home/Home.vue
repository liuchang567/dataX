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
        <div class="page-info" v-if="activeComId === ''">
          <div class="x-title">页面设置</div>
          <div class="infos">
            <div class="infos-wrapper">
              <div class="label">屏幕大小</div>
              <div class="context">
                <div class="x-item">
                  <input class="x-input x-number" v-model="page.width" type="number" step="1" min="1" max="2560" />
                </div>
                <div class="x-item">
                  <input class="x-input x-number" v-model="page.height" type="number" step="1"  min="1" max="1440" />
                </div>
              </div>
            </div>
            <div class="infos-wrapper">
              <div class="label">背景颜色</div>
              <div class="context">
                <div class="x-item">
                  <ColorPicker :color="page.backgroundColor" @oncolor="selectColor"></ColorPicker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="components-info" v-else>
          <div class="x-title">组件配置</div>
          <div class="infos" v-for="(item,index) in layers.filter((i) => i.layerId === activeComId)" :key="index">
            <div class="infos-wrapper" v-for="it in item.files" :key="it.name">
              <div class="label">{{it.title}}</div>
              <div class="context">
                <!--大小-->
                <template v-if="it.type === 'size'">
                  <div class="x-item" >
                    <input class="x-input x-number" v-model="item.models.width"  />
                  </div>
                   <div class="x-item" >
                    <input class="x-input x-number" v-model="item.models.height" />
                  </div>
                </template>
                <!--位置-->
                <template v-if="it.type === 'position'">
                  <div class="x-item" >
                    <input class="x-input x-number" v-model="item.models.x"  />
                  </div>
                   <div class="x-item" >
                    <input class="x-input x-number" v-model="item.models.y" />
                  </div>
                </template>
                <div class="x-item" v-if="it.type === 'color'">
                  <ColorPicker v-model="item.models[it.name]" :color="item.models[it.name]" @oncolor="selectColor"></ColorPicker>
                </div>
                <div class="x-item" v-if="it.type === 'number'">
                  <input class="x-input" v-model="item.models[it.name]" />
                </div>
                <div class="x-item" v-if="it.type === 'string'">
                  <input class="x-input" v-model="item.models[it.name]" />
                </div>
                <div class="x-item" v-if="it.type === 'array'">
                  <textarea class="x-textarea" v-model="item.models[it.name]" ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import ColorPicker from './componets/ColorPicker.vue'
import { Schema } from './config/index.js'
import axios from 'axios'
export default {
  name: 'home',
  props: {
  },
  components: {
    NavigatorLine, ColorPicker, Ruler, VueDraggableResizable, PreView
  },
  data () {
    return {
      showPreView: false,
      layers: [],
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
      idIndex: 0,
      page: {
        width: 1920,
        height: 1080,
        backgroundColor: '#404753'
      },
      // 选中组件id
      activeComId: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
     // 选择背景颜色
    selectColor (color) {
      this.page.backgroundColor = color
    },
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
