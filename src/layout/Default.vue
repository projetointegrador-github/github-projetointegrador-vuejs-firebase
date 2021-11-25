<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
      elevate-on-scroll
      elevation="2"
      id="header"
    >
      <Tabs />
      <v-img src="../assets/logoLoja.png" max-width="70px" id="logo"></v-img>
      <v-spacer></v-spacer>
      <div class="accountDiv d-flex align-center">
        <v-btn icon :to="{ name: 'Perfil' }"
          ><v-icon size="2.1em">mdi-account-circle-outline</v-icon></v-btn
        >
        <v-btn icon :to="{ name: 'Carrinho' }"
          ><v-icon size="2.1em">mdi-cart-variant</v-icon></v-btn
        >
        <v-btn icon><v-icon size="2.1em">mdi-logout</v-icon></v-btn>
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container class="conteudoPrincipal">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app color="black" dark class="d-flex justify-space-between">
      Projeto Integrador 2021 {{ $store.state.visitCount }}
      <v-btn :to="{ name: 'Sobre' }" id="btn2sobre">Sobre</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import Tabs from "../components/Tabs.vue";

export default {
  data() {
    return {
      alertAdicionado: true,
    };
  },

  components: {
    Tabs,
  },
};
</script>
