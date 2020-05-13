<template>
  <div class="components-info">
    <div class="x-title">组件配置</div>
    <div class="infos">
      <div class="infos-wrapper" v-for="it in schemaInfo.files" :key="it.name">
        <div class="label">{{ it.title }}</div>
        <div class="context">
          <template v-if="it.name === 'size'">
            <div class="x-item">
              <input class="x-input x-number" v-model="schemaInfo.models.width"/>
            </div>
            <div class="x-item">
              <input class="x-input x-number" v-model="schemaInfo.models.height"/>
            </div>
          </template>
          <template v-if="it.name === 'position'">
            <div class="x-item">
              <input class="x-input x-number" v-model="schemaInfo.models.x" />
            </div>
            <div class="x-item">
              <input class="x-input x-number" v-model="schemaInfo.models.y" />
            </div>
          </template>
          <template v-if="it.name === 'titleText'">
            <div class="x-item">
              <input class="x-input" v-model="schemaInfo.models.title.text" />
            </div>
          </template>
          <template v-if="it.name === 'titleStyle'">
            <div class="x-item">
              <ColorPicker
                @oncolor="selectColor"
                :color="schemaInfo.models.title.textStyle.color"
              ></ColorPicker>
            </div>
            <div class="x-item">
              <input class="x-input" v-model="schemaInfo.models.title.textStyle.fontSize"/>
            </div>
            <div class="x-item">
              <input class="x-input" v-model="schemaInfo.models.title.left" />
            </div>
          </template>
          <template v-if="it.name === 'legendPosition'">
            <div class="x-item">
              <input class="x-input" v-model="schemaInfo.models.legend.left" />
            </div>
            <div class="x-item">
              <input class="x-input" v-model="schemaInfo.models.legend.top" />
            </div>
            <div class="x-item">
              <div class="x-orient" @click="changOrient">
                <div :class="[schemaInfo.models.legend.orient === 'horizontal' ? 'orient-hor' : 'orient-ver' ]"></div>
              </div>
            </div>
          </template>
          <template v-if="it.name === 'legendData'">
            <div class="x-item">
              <textarea class="x-textarea"  v-model="schemaInfo.models.legend.data"></textarea>
            </div>
          </template>

          <div class="x-item" v-if="it.name === 'seriesData'">
            <textarea
              class="x-textarea"
              v-model="schemaInfo.models.seriesData"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ColorPicker from "../ColorPicker.vue";
export default {
  name: "piechart1ma",
  props: {
    schemaInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ColorPicker
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.schemaInfo)
  },
  mounted() {},
  methods: {
    selectColor(color) {
      this.schemaInfo.models.title.textStyle.color = color;
    },
    changOrient() {
      let orient = this.schemaInfo.models.legend.orient
      this.schemaInfo.models.legend.orient = orient === 'horizontal' ? 'vertical' : 'horizontal'
    }
  }
};
</script>
<style scoped>
.x-orient{
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.orient-ver{
  width: 80%;
  height: 10px;
  background-color: #444141;
}
.orient-hor{
  width: 10px;
  height: 80%;
  background-color: #444141;
}
</style>
