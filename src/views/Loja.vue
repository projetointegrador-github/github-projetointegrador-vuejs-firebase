<template>
  <div class="estruturaCamisetas d-flex py-5 flex-wrap">
    <v-card
      class="mx-auto card-camiseta"
      max-width="400"
      v-for="(camiseta, index) of camisetasFiltradas"
      :key="index"
    >
      <v-img v-if="camiseta.url" class="white--text align-end" height="200px">
        <img
          :src="require(`../assets/${camiseta.url}.png`)"
          alt="Dale"
        />
      </v-img>

      <v-img v-else class="white--text align-end" height="200px">
        <img
          src="../assets/semimagem.png"
          alt="Dale"
        />
      </v-img>

      <v-card-subtitle class="pb-0">R$ {{ camiseta.preço }},00</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ camiseta.tipo }}, {{ camiseta.tamanho }}</div>
        <div>{{ camiseta.marca }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="green" @click.stop.prevent="add2cart(camiseta)" dark>
          COMPRAR
          <v-icon right>mdi-cart-plus</v-icon>
        </v-btn>
        <!-- <v-btn text outlined @click.stop.prevent="addCart(camiseta.id)">
          ADICIONAR AO CARRINHO
          <v-icon right>mdi-cart-plus</v-icon>
        </v-btn> -->
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="dialogAdicionado"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          PRODUTO ADICIONADO AO CARRINHO
        </v-card-title>

        <v-card-text>
          Vá ao carrinho para ver seus produtos.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click.stop.prevent="dialogAdicionado = false"
          >
            FECHAR
          </v-btn>
          <v-btn
            dense
            color="green darken-1"
            text
            @click.stop.prevent="dialogAdicionado = false"
            :to="{ name: 'Carrinho' }"
          >
            IR AO CARRINHO
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogNoUser"
      max-width="700"
    >
      <v-card>
        <v-card-title class="text-h5">
          VOCÊ AINDA NÃO TEM UM USUÁRIO CRIADO
        </v-card-title>

        <v-card-text>
          Clique em CRIAR USUÁRIO para ir à página de criar usuários
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click.stop.prevent="dialogNoUser = false"
          >
            FECHAR
          </v-btn>
          <v-btn
            dense
            color="green darken-1"
            text
            @click.stop.prevent="dialogNoUser = false"
            :to="{ name: 'Login' }"
          >
            LOGIN
          </v-btn>
          <v-btn
            dense
            color="green darken-1"
            text
            @click.stop.prevent="dialogNoUser = false"
            :to="{ name: 'Signup' }"
          >
            CRIAR USUÁRIO
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { auth, db } from '../plugins/firebase.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { bus } from '../main.js';

export default {

  data() {
    return {
      dialogAdicionado: false,
      dialogCart: false,
      dialogNoUser: false,
    }
  },

  computed: {
    ...mapState({
    camisetasFiltradas: state => state.camisetasFiltradas,
    camisetasCarrinho: state => state.camisetasCarrinho
  }),
  },

  created(){
    bus.$on('aumentarQuantidade', (camiseta) => {
      this.addCamiseta2cart(camiseta);
    })
  },

  methods: {

    ...mapActions(['getCarrinho', 'calcValorTotal']),

    async add2cart(camiseta) {
      const user = auth.currentUser;
      if (user) {
        this.callDialogAdicionado();
        let novaCamiseta = {};
        Object.assign(novaCamiseta, camiseta);
        novaCamiseta.quantidade = 1;
        this.addCamiseta2cart(novaCamiseta);
      } else {
        this.dialogNoUser = true;
      }
    },

    async addCamiseta2cart(novaCamiseta) {
      const uid = auth.currentUser.uid;
      let camisetas = [];
      const docCamisetas = await getDoc(doc(db, 'carrinhos', uid));
      camisetas = docCamisetas.data().camisetas;

      const camisetaExiste = camisetas.find(camiseta => camiseta.id === novaCamiseta.id);

      if (camisetaExiste) {
        if (camisetaExiste.quantidade > 0) {
          camisetaExiste.quantidade += 1;
        await updateDoc(doc(db, 'carrinhos', uid), {camisetas});
        }
      } else {
        camisetas.push(novaCamiseta);
        await updateDoc(doc(db, 'carrinhos', uid), {camisetas});
      }
      this.getCarrinho();
    },

    callDialogAdicionado() {
      this.dialogAdicionado = true;
      setTimeout(() => this.dialogAdicionado = false, 2500)
    },

  }

};
</script>

<style>
</style>