import Vue from 'vue'
import App from './App.vue'
import 'mdb-vue-ui-kit/css/mdb.min.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
