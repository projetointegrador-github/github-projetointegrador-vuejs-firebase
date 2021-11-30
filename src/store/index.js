import Vue from 'vue'
import Vuex from 'vuex'
import { camisetasCollection, auth } from '../plugins/firebase.js';
import { getDocs } from '@firebase/firestore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      UID: '',
    },
    camisetas: [],
    camisetasFiltradas: [],
    carrinho: {
      valorTotal: 0.00,
      camisetas: [],
    },
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
      const dadosCamiseta = state.camisetasFiltradas.find(camiseta => camiseta.id === id);
      const produtoExiste = state.carrinho.camisetas.find(camiseta => camiseta.id === id);
      if (produtoExiste) {
        produtoExiste.quantidade += 1;
      } else {
        let novaCamiseta = {};
        Object.assign(novaCamiseta, dadosCamiseta);
        novaCamiseta.quantidade = 1;
        state.carrinho.camisetas.push(novaCamiseta);
      }
      state.carrinho.valorTotal += dadosCamiseta.preço ;
    },
    DIMINUIR_QUANTIDADE(state, id) {
      const camiseta = state.carrinho.camisetas.find(camiseta => camiseta.id === id);
      if (camiseta.quantidade > 1) {
        camiseta.quantidade -= 1;
        state.carrinho.valorTotal -= camiseta.preço;
        console.log(camiseta.quantidade);
      }
    },
    SAVE_UID(state, uid) {
      state.user.UID = uid;
    }
  },
  actions: {
    async getCamisetas({commit}) {
      const docs = await getDocs(camisetasCollection);
      docs.forEach(doc => {
        commit('PUSH_CAMISETAS', doc.data())
      })
    },
    filtrarCamisetas(context, filtro) {
      if (context.state.visitCount === 0) {
        context.commit('VISITCOUNT_INCREMENT')
      } else {
        context.commit('FILTRAR_CAMISETAS', filtro)
      }
    },
    addCart({commit}, id) {
      /// chamada para a firebase...
      commit('ADD_CART', id);
    },
    DiminuirQuantidade({commit}, id) {
      commit('DIMINUIR_QUANTIDADE', id);
    },
    saveUID({commit}) {
      const uid = auth.currentUser.uid;
      commit('SAVE_UID', uid);
    }
  },
  modules: {
  }
})
