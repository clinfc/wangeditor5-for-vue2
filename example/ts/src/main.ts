import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@wangeditor/editor/dist/css/style.css'
import { WeEditable, WeEditor, WeToolbar } from 'wangeditor5-for-vue2'

Vue.config.productionTip = false

Vue.use(WeToolbar)
Vue.use(WeEditable)
Vue.use(WeEditor)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
