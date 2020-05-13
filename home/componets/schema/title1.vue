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
          <template v-if="it.name === 'value'">
            <div class="x-item">
              <input class="x-input" v-model="schemaInfo.models.value" />
            </div>
          </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "title1ma",
  props: {
    schemaInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.schemaInfo)
  },
  mounted() {},
  methods: {
  }
};
</script>
