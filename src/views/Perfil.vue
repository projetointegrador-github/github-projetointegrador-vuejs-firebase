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

        nomeCompleto() { // computed que retona o nome completo
            return this.user.profile.nome + ' ' + this.user.profile.sobrenome
        }

    },

    methods: {

        ...mapActions(['getProfile']), // para um melhor acesso, mapeia as actions do vueX dentro do componente para ser acessado com this.NomeDaAction

        async saveEndereco() { // função chamada quando em salvar dentro do formulário de perfil
            const uid = auth.currentUser.uid;
            const docReft = doc(db, 'profiles', uid);
            await updateDoc(docReft, { // atualiza o firebase com novos atributos de endereço e agora o usuário já pode confimar a compra dentro do carrinho sem ser barrado
                status: 'tem-endereco',
                endereco: this.endereco,
                cep: this.cep
            });
            this.getProfile(uid);
            console.log(this.user)
        }

    },

    mounted() { // demtro do clico de vida do componente, quando ele é montado verifica se existe usuário
        const user = auth.currentUser;
        if (user) { // se exite, deixa o usuário entrar no componente e chama a função getprofile dentro do vuex
            const uid = user.uid;
            this.getProfile(uid);
        } else { // se não existe, exibe um alert pedindo para que logue antes de tentar acssar o componente e direciona para a página principal novamente (loja), nunca deixando ele acessar o perfil antes de logar
            this.$swal({
                title: 'Você precisa cadastrar um usuário para acessar o perfil',
                icon: 'info',
                iconColor: 'red',
                showConfirmButton: true,
                confirmButtonColor: 'green'
            });
            this.$router.push({name: 'Loja'});
        }
    }

}
</script>

<style>
</style>