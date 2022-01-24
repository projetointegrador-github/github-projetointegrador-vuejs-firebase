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
              v-for="(camiseta, index) of carrinho.camisetas"
              :key="index"
            >
              <div class="imgProduto">
                <img
                  :src="require(`../assets/${camiseta.url}Carrinho.png`)"
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
                <v-btn small @click.stop.prevent="aumentarQuantidade(camiseta)"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
                <v-btn
                  small
                  @click.stop.prevent="diminuirQuantidade(camiseta.id)"
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
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
              <span>R$ {{ carrinho.valorTotal }},00</span>
            </v-container>
          </v-row>
          <v-row class="btnResumo">
            <v-btn color="green" class="btnComprar" dark large @click.stop.prevent="confirmarCompra()">
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
import { mapState, mapActions } from "vuex";
import { auth, db } from "../plugins/firebase.js";
import { doc, updateDoc, getDoc} from '@firebase/firestore'
import { bus } from "../main.js";
// import { db, auth } from '../plugins/firebase.js';
 
export default {

  computed: {
    ...mapState(["carrinho", "user"]),
  },

  mounted() {
    // dentro do cliclo de vida do componente, quando ele é criado verifica se existe um usuário logado
    const user = auth.currentUser;
    if (user) { // se existe o usuário, deixa o acesso ao componente e chama o getCarrinho
      this.getCarrinho();
    } else { // se não existe, apresenta um alert de que o usuário não pode acessar, pois precisa estar logado e, redireciona o usuário para a página da loja (nunca deixando o usuário acessar o componente)
      this.$swal({
          title: 'Você precisa estar logado para acessar o carrinho',
          icon: 'info',
          iconColor: 'red',
          showConfirmButton: true,
          confirmButtonColor: 'green'
      });
      this.$router.push({ name: 'Loja'});
    }
  },

  methods: {
    ...mapActions(['getCarrinho', 'getProfile']), // para facilitar o acesso as actions do vueX, mapeia tais no componente para poderem ser acessar somente com this.NomeDaAction

    aumentarQuantidade(camiseta) {
      // chamado quando se clica no ícone de "+" dentro da camiseta do carrinho
      bus.$emit('aumentarQuantidade', camiseta) // emite um um evento que vai ser escuta dentro da loja, que a função addCamiseta2Cart() para incrementar o atributo quantidade da camiseta e atualizar na firebase
    },

    async diminuirQuantidade(idCamiseta) {
      // Função chamada quando se clica no ícone de "-" dentro da camiseta do carrinho. Diminuir 1 do atributo quantidade da camiseta e atualiza a firebase.

      const uid = auth.currentUser.uid;
      let docCamisetas = await getDoc(doc(db, "carrinhos", uid))
      let camisetas = docCamisetas.data().camisetas;
      let camiseta = camisetas.find( shirt => shirt.id == idCamiseta );
      
      if (camiseta.quantidade == 1) {
        camisetas.splice(camisetas.indexOf(camiseta), 1)
      } else {
        camiseta.quantidade -= 1;
      }

      await updateDoc(doc(db, "carrinhos", uid), { camisetas });

      this.getCarrinho();
      this.$forceUpdate();
    },

    confirmarCompra() {
      // Função que exibe um alert na tela quando se clica no botão de confirmar compra
      const uid = auth.currentUser.uid;
      this.getProfile(uid);
      if (this.user.profile.status) {
        if (this.user.profile.status == 'sem-perfil') { // se o usuário ainda não tiver logado um endereço, exibe um alerta pedindo para que ele logue isso dentro do perfil
          this.$swal({
            title: 'Vá ao perfil e cadastre um endereco antes de confirmar uma compra.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: 'green'
          });
        } else {
          this.$swal({ // se o usuário já tiver logado um endereço do perfil, exibe 1 alert de sucesso com o endereço de entrega e o preço do pedido
            title: 'Compra confirmada de valor R$ ' + this.carrinho.valorTotal + ',00 para o endereço: ' + this.user.profile.endereco,
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: 'green'
          });
        }
      } else {
        this.$swal({
            title: 'Vá ao perfil e cadastre um endereco antes de confirmar uma compra.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: 'green'
        });
      }
    }
  }

};
</script>