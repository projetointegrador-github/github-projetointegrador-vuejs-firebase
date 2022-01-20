<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'App',


  created() {
    this.$store.dispatch('getCamisetas'); // toda vez que o aplicativo é carregado, chama duas funções do vueX que buscam as camisetas da firebase e jogam em 1 array.
    this.$store.dispatch('filtrarCamisetas')
  }


};
</script>