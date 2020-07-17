import Vue from "vue"
import router from '../router'
import store from '../store'
import '../assets/dataX.scss'
import App from "./App.vue"

import Title1 from '../components/title/Title-1.vue'
import Piechart1 from '../components/chart/PieChart-1.vue'
import Piechart2 from '../components/chart/PieChart-2.vue'
Vue.component('title1', Title1)
Vue.component('piechart1', Piechart1)
Vue.component('piechart2', Piechart2)

// 配置
import title1ma from './componets/schema/title1.vue'
import piechart1ma from './componets/schema/piechart1.vue'
import piechart2ma from './componets/schema/piechart2.vue'
Vue.component('piechart1ma', piechart1ma)
Vue.component('piechart2ma', piechart2ma)
Vue.component('title1ma', title1ma)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
