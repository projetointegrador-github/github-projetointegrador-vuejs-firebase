<template>
  <v-container class="d-flex justify-center">
    <v-card id="card-sobre">
      <h1 id="sobre-title" class="pb-5 d-flex align-center">
        <v-icon size="1.5em" color="brown" class="pr-3">mdi-help-circle</v-icon
        >Quem Somos
      </h1>
      <v-row class="py-3"
        >A Milly Store é uma loja de camisetas desenvolvida para um projeto
        escolar<br />
        do IFC - Campus Araquari.<br /><br />
        O projeto faz parte do Curso Técnico em Informática, ministrado pelo
        Professor Eduardo da Silva</v-row
      >
      <v-row class="py-3">
        <ul id="lista-estudantes">
          <span class="pb-4 d-block"
            >Somos um grupo de 4 estudantes, nomeados por:</span
          >
          <li class="d-flex align-center">
            <v-icon color="brown">mdi-arrow-right-thin</v-icon>Eduardo Vitor
            Dias
          </li>
          <li class="d-flex align-center">
            <v-icon color="brown">mdi-arrow-right-thin</v-icon>Erico Juan da
            Silva Pieri
          </li>
          <li class="d-flex align-center">
            <v-icon color="brown">mdi-arrow-right-thin</v-icon>Felipe Karsten
          </li>
          <li class="d-flex align-center">
            <v-icon color="brown">mdi-arrow-right-thin</v-icon>Pedro Lucca
            Luciano
          </li>
        </ul>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
