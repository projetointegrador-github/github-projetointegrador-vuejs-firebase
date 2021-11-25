<template>
  <v-container id="carrinhoMain" class="d-flex justify-center py-5">
    <v-row class="rowCarrinho">
      <v-col class="colCarrinho1" align-self="start">
        <v-container id="estruturaCarrinho1">
          <v-row class="d-flex align-center tituloCarrinho">
            <h1>Produtos</h1>
          </v-row>
          <v-row class="produtosEstrutura d-flex flex-column">
            <div
              class="produtos d-flex align-center"
              v-for="(camiseta, index) of camisetasCarrinho"
              :key="index"
            >
              <div class="imgProduto">
                <img
                  src="../assets/camiseta1.png"
                  alt="Camiseta"
                  class="imgCamisetaProduto"
                />
              </div>
              <div class="produtoContent">
                {{ camiseta.tipo }} <br />
                Quantidade: {{ camiseta.quantidade }} <br />
                Preço: R$ {{ camiseta.preço }},00
              </div>
              <div class="btnAdicionarDiminuir">
                <v-btn small @click.stop.prevent="adicionarDiminuirQuantidade({tipo: 'adicionar', id: camiseta.id})"><v-icon>mdi-plus</v-icon></v-btn>
                <v-btn small @click.stop.prevent="adicionarDiminuirQuantidade({tipo: 'diminuir', id: camiseta.id})"><v-icon>mdi-minus</v-icon></v-btn>
              </div>
            </div>
          </v-row>
        </v-container>
      </v-col>
      <v-col class="colCarrinho2" cols="4" align-self="start">
        <v-container id="estruturaCarrinho2">
          <v-row class="tituloCarrinho2 align-center">
            <h1>Resumo</h1>
          </v-row>
          <v-row class="resumoContent d-flex flex-column" id="total">
            <v-container class="d-flex total justify-space-between">
              <span>Total:</span>
              <span>R$ {{ preçoTotal }},00</span>
            </v-container>
          </v-row>
          <v-row class="btnResumo">
            <v-btn color="green" class="btnComprar" dark large>
              Confirmar compra
              <v-icon right>mdi-check-bold</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState({
      camisetasCarrinho: state => state.camisetasCarrinho
    }),
    preçoTotal() {
      var preço = 0;
      this.camisetasCarrinho.forEach(camiseta => {
        preço += camiseta.preço * camiseta.quantidade
      })
      return preço
    }
  },


  methods: {
    adicionarDiminuirQuantidade(props) {
      this.$store.dispatch('adicionarDiminuirQuantidade', props)
    },
  }

};
</script>

<style></style>
