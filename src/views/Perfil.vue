<template>
    <div class="estrutura-perfil">
        <h1 class="h1">Página de Perfil</h1>
        <v-card outlined class="card-perfil">
            <v-card-title class="h1-perfil justify-center">Informações pessoais</v-card-title>
            <v-form class="form-perfil">
                <v-text-field prepend-inner-icon="mdi-email-outline" placeholder="E-MAIL" label="E-MAIL" outlined :value="user.profile.email" disabled autocomplete="off"></v-text-field>
                <v-text-field prepend-inner-icon="mdi-file-outline" placeholder="CPFG" label="CPF" outlined :value="user.profile.cpf" disabled autocomplete="off"></v-text-field>
                <v-text-field placeholder="NOME COMPLETO" label="NOME COMPLETO" outlined :value="nomeCompleto"></v-text-field>
                <v-text-field prepend-inner-icon="mdi-phone-outline" placeholder="TELEFONE" label="TELEFONE" outlined :value="user.profile.tel"></v-text-field>
            </v-form>
            <v-card-title class="h1-perfil justify-center">Informações de endereço</v-card-title>
            <v-form class="form-perfil">
                <v-text-field prepend-inner-icon="mdi-home-outline" :value="user.profile.endereco" placeholder="ENDEREÇO" label="ENDEREÇO" outlined></v-text-field>
                <v-text-field placeholder="CEP" label="CEP" outlined></v-text-field>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '../plugins/firebase.js';
import { mapActions } from 'vuex';

export default {

    data() {
        return {}
    },

    computed: {

        ...mapState({
            user: state => state.user
        }),

        nomeCompleto() {
            return this.user.profile.nome + ' ' + this.user.profile.sobrenome
        }

    },

    methods: {

        ...mapActions(['getProfile'])

    },

    mounted() {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            console.log(uid);
            this.getProfile(uid);
        } else {
            window.alert('Você precisa cadastrar um usuário para acessar o perfil');
            this.$router.push({name: 'Loja'});
        }
    }

}
</script>

<style>
</style>