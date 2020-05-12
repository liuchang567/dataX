import Vue from "vue"
import router from '../router'
import store from '../store'
import '../assets/dataX.scss'
import App from "./App.vue"

import Title1 from '../components/title/Title-1.vue'
import Piechart1 from '../components/chart/PieChart-1.vue'
Vue.component('title1', Title1)
Vue.component('piechart1', Piechart1)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
