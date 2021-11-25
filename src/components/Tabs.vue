<template>
  <v-tabs>
    <v-tab :to="{ name: 'Loja' }" @click.stop.prevent="tipo = 'Geral'">Todos</v-tab>
    <v-tab :to="{ name: 'Loja' }" @click.stop.prevent="tipo = 'Feminino'">Feminino</v-tab>
    <v-tab :to="{ name: 'Loja' }" @click.stop.prevent="tipo = 'Masculino'">Masculino</v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      
      tipo: '',

    }
      
  },


  watch: {
    tipo(t) {
      this.$store.dispatch('filtrarCamisetas', t)
    }
  },
}
</script>