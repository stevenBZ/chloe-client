import Vue from 'vue'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.scss'
import './style/reset.scss'
import App from './App'
import router from './router'
import store from './store'
import db from '../db/store'

Vue.use(Element)
Vue.prototype.$db = db

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
