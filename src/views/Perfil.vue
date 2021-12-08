<template>
    <div class="estrutura-perfil">
        <h1 class="h1">Página de Perfil</h1>
        <v-card outlined class="card-perfil">
            <v-card-title class="h1-perfil justify-center">Informações pessoais</v-card-title>
            <v-form class="form-perfil">
                <v-text-field prepend-inner-icon="mdi-email-outline" placeholder="E-MAIL" label="E-MAIL" outlined :value="user.profile.email" disabled autocomplete="off"></v-text-field>
                <v-text-field prepend-inner-icon="mdi-file-outline" placeholder="CPFG" label="CPF" outlined :value="user.profile.cpf" disabled autocomplete="off"></v-text-field>
                <v-text-field placeholder="NOME COMPLETO" label="NOME COMPLETO" disabled outlined :value="nomeCompleto"></v-text-field>
                <v-text-field prepend-inner-icon="mdi-phone-outline" placeholder="TELEFONE" label="TELEFONE" disabled outlined :value="user.profile.tel"></v-text-field>
            </v-form>
            <v-card-title class="h1-perfil justify-center" v-if="user.profile.status === 'sem-perfil'">Informações de endereço</v-card-title>
            <v-form class="form-perfil" v-if="user.profile.status === 'sem-perfil'">
                <v-text-field prepend-inner-icon="mdi-home-outline" v-model="endereco" placeholder="ENDEREÇO" label="ENDEREÇO" outlined></v-text-field>
                <v-text-field placeholder="CEP" label="CEP" :value="user.profile.cep" v-mask="'#####-000'" outlined v-model="cep"></v-text-field>
                <v-btn class="mb-4" color="black" dark @click.stop.prevent="saveEndereco()">SALVAR</v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { auth, db } from '../plugins/firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

export default {

    data() {
        return {
            endereco: '',
            cep: ''
        }
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

        ...mapActions(['getProfile']),

        async saveEndereco() {
            const uid = auth.currentUser.uid;
            const docReft = doc(db, 'profiles', uid);
            await updateDoc(docReft, {
                status: 'tem-endereco',
                endereco: this.endereco,
                cep: this.cep
            });
            this.getProfile(uid);
            console.log(this.user)
        }

    },

    mounted() {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
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