<template>
    <div class="estrutura-login">
        <v-card class="card-login" outlined>
            <h1 class="h1">Formulário de Cadastro</h1>
            <v-img src="../assets/logoLojaCortado.png" max-width="200px" class="logoLojaLogin"></v-img>
            <v-form class="form-login">
                <v-text-field label="E-mail" v-model="user.email"></v-text-field>
                <v-text-field label="Senha" v-model="user.senha" type="password" append-icon="mdi-eye"></v-text-field>
                <v-text-field label="Confirmar Senha" type="password" append-icon="mdi-eye"></v-text-field>
                <v-text-field label="Nome" v-model="nome"></v-text-field>
                <v-text-field label="Sobrenome" v-model="sobrenome"></v-text-field>
                <v-text-field label="Cpf" v-model="cpf"></v-text-field>
                <v-text-field label="Endereço" v-model="endereco"></v-text-field>
                <v-text-field label="Telefone" v-model="tel"></v-text-field>
                <v-btn 
                    @click.stop.prevent="createUser()"
                    color="dark" dark>Criar usuário</v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { setDoc, doc } from '@firebase/firestore';
import { auth, db } from '../plugins/firebase.js';

export default {   

    data() {
        return {
            user: {
                email: '',
                senha: '',
            },
            nome: '',
            sobrenome: '',
            cpf: '',
            endereco: '',
            tel: ''
        }
    },

    methods: {
        
        async createUser() {
            await createUserWithEmailAndPassword(auth, this.user.email, this.user.senha);
            this.createProfileAndCartDoc();
            this.$router.push({ name: 'Loja' });
        },

        async createProfileAndCartDoc() {
            const uid = auth.currentUser.uid;
            const profile = {
                email: this.user.email,
                nome: this.nome,
                sobrenome: this.sobrenome,
                cpf: this.cpf,
                tel: this.tel,
                endereco: this.endereco,
            };
            const carrinho = {
                camisetas: []
            };
            await setDoc(doc(db, 'profiles', uid), profile);
            await setDoc(doc(db, 'carrinhos', uid), carrinho);
        }
    }

}
</script>

<style>
</style>