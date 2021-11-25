import Vue from 'vue'
import Vuex from 'vuex'
import { camisetasCollection } from '../plugins/firebase.js';
import { getDocs } from '@firebase/firestore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    camisetas: [],
    camisetasFiltradas: [],
    camisetasCarrinho: [],
    visitCount: 0
  },
  mutations: {
    PUSH_CAMISETAS(state, camiseta) {
      state.camisetas.push(camiseta);
    },
    FILTRAR_CAMISETAS(state, filtro) {
      if (filtro === 'Geral') {
        state.camisetasFiltradas = state.camisetas;
      } else {
        state.camisetasFiltradas = state.camisetas.filter(camiseta => camiseta.sexo === filtro);
      }
    },
    VISITCOUNT_INCREMENT(state) {
      state.visitCount += 1;
      state.camisetasFiltradas = state.camisetas;
    },
    ADD_CART(state, id) {
      const produtoExiste = state.camisetasCarrinho.find(camiseta => camiseta.id === id);
      if (produtoExiste) {
        produtoExiste.quantidade += 1;
      } else {
        const camiseta = state.camisetasFiltradas.find(camiseta => camiseta.id === id);
        camiseta.quantidade = 1;
        state.camisetasCarrinho.push(camiseta);
      }
    },
    ADICIONAR_DIMINUIR_QUANTIDADE(state, props) {
      const camiseta = state.camisetasCarrinho.find(camiseta => camiseta.id === props.id);
      if (props.tipo === 'adicionar') {
        camiseta.quantidade += 1;
      } else {
        camiseta.quantidade -= 1;
      }
      console.log(camiseta.quantidade);
    }
  },
  actions: {
    async getCamisetas() {
      const docs = await getDocs(camisetasCollection);
      docs.forEach(doc => {
        this.commit('PUSH_CAMISETAS', doc.data())
      })
    },
    filtrarCamisetas(context, filtro) {
      if (context.state.visitCount === 0) {
        context.commit('VISITCOUNT_INCREMENT')
      } else {
        context.commit('FILTRAR_CAMISETAS', filtro)
      }
    },
    addCart(context, id) {
      context.commit('ADD_CART', id);
    },
    adicionarDiminuirQuantidade(context, props) {
      context.commit('ADICIONAR_DIMINUIR_QUANTIDADE', props);
    }
  },
  modules: {
  }
})
