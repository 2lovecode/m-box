import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import jsoneditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(ElementUI, { locale })
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$jsoneditor = jsoneditor
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
