<template>
    <div class="estrutura-login">
    <v-card class="card-login" outlined>
        <h1 class="h1">Autenticação</h1>
        <v-img src="../assets/logoLojaCortado.png" max-width="200px" class="logoLojaLogin"></v-img>
        <v-form class="form-login">
            <v-text-field label="E-mail" v-model="user.email"></v-text-field>
            <v-text-field label="Senha" v-model="user.senha" type="password" append-icon="mdi-eye"></v-text-field>
            <v-btn 
                @click.stop.prevent="Login()"
                color="dark" dark>LOGIN</v-btn>
        </v-form>
    </v-card>
</div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../plugins/firebase.js'

export default {

    data() {
        return {
            user: {
                email: '',
                senha: ''
            }
        }
    },

    methods: {
        async Login() { // função que loga na firebase o usuário com as informações logadas e redireciona o usuário para a página principal (loja)
            await signInWithEmailAndPassword(auth, this.user.email, this.user.senha);
            this.$router.push({name: 'Loja'});
        }
    }
    
}
</script>

<style>

</style>