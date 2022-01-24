import Vue from 'vue'
import Vuex from 'vuex'
import { camisetasCollection, db, auth } from '../plugins/firebase.js';
import { getDocs, doc, getDoc } from '@firebase/firestore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    visitCount: 0,
    
    user: {
      UID: '',
      profile: {}
    },

    camisetas: [],
    camisetasFiltradas: [],
    carrinho: {
      valorTotal: 0.00,
      camisetas: [],
    },

  },
  mutations: {

    VISITCOUNT_INCREMENT(state) {
      state.visitCount += 1;
      state.camisetasFiltradas = state.camisetas;
    },

    CALC_VALOR_TOTAL(state, valorTotal) {
      state.carrinho.valorTotal = valorTotal;
    },

    PUSH_CAMISETAS(state, docCamiseta) {
      state.camisetas.push(docCamiseta);
    },

    FILTRAR_CAMISETAS(state, filtro) {
      if (filtro === 'Geral') {
        state.camisetasFiltradas = state.camisetas;
      } else {
        state.camisetasFiltradas = state.camisetas.filter(camiseta => camiseta.sexo === filtro);
      }
    },

    SAVE_PROFILE(state, doc){
      state.user.profile = doc;
    },

    SAVE_CARRINHO(state, camisetasCarrinho) {
      if (camisetasCarrinho.length === 0) {
        state.carrinho.valorTotal = 0;
      }
      state.carrinho.camisetas = camisetasCarrinho;
    }

  },
  actions: {

    async getCamisetas({ commit }) {
      const docs = await getDocs(camisetasCollection);
      docs.forEach(doc => {
        commit('PUSH_CAMISETAS', doc.data())
      })
    },

    filtrarCamisetas(context, filtro) {
      if (context.state.visitCount === 0) {
        context.commit('VISITCOUNT_INCREMENT');
      } else {
        context.commit('FILTRAR_CAMISETAS', filtro);
      }
    },

    async getProfile({ commit }, uid) {
      const docRef = doc(db, 'profiles', uid);
      const docProfile = await getDoc(docRef);
      commit('SAVE_PROFILE', docProfile.data());
    },

    async getCarrinho({commit}) {
      const uid = auth.currentUser.uid;
      const docRef = await getDoc(doc(db, 'carrinhos', uid));
      const camisetasCarrinho = docRef.data().camisetas;
      commit('SAVE_CARRINHO', camisetasCarrinho);

      let preço = 0;
      camisetasCarrinho.forEach((camiseta) => {
        preço += camiseta.preço * camiseta.quantidade;
        commit('CALC_VALOR_TOTAL', preço);
      })
    }

  },
  modules: {
  }
})
