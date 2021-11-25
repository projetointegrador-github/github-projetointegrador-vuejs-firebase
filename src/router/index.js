import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Default',
    component: () => import('../layout/Default.vue'),
    children: [{
      path: '',
      name: 'Loja',
      component: () => import('../views/Loja.vue')
    }, {
      path: '/perfil',
      name: 'Perfil',
      component: () => import('../views/Perfil.vue')
    }, {
      path: '/carrinho',
      name: 'Carrinho',
      component: () => import('../views/Carrinho.vue')
    }, {
      path: '/sobre',
      name: 'Sobre',
      component: () => import('../views/Sobre.vue')
    }]
  },
  {
    path: '/',
    name: 'Blank',
    component: () => import('../layout/Blank.vue'),
    children: [{
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
