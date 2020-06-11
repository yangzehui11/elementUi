// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import config from '../config/sysConfig'
axios.defaults.withCredentials=true //让ajax携带cookie
// // 统一设置请求路径
 axios.defaults.baseURL = config.manageUrl
// // 挂载到 vue 的原型中
 Vue.prototype.$http = axios
Vue.use(axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
