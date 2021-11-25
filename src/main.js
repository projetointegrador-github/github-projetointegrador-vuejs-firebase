import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from './plugins/firebase'
import './assets/geral.css'
import store from './store'

Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  store,
  firebase,
  render: h => h(App)
}).$mount('#app')
