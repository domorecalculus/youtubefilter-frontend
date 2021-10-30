import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import router from './router'
import Group from './components/Group.vue'

Vue.config.productionTip = false

let data = {
  isLoggedIn: false,
}

new Vue({
  vuetify,
  router,
  data,
  components: {
    'group': Group,
  },
  render: h => h(App)
}).$mount('#app')
