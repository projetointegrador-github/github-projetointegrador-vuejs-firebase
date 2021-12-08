<template>
    <div class="estrutura-login">
        <v-card class="card-login" outlined>
            <h1 class="h1">Formulário de Cadastro</h1>
            <v-img src="../assets/logoLojaCortado.png" max-width="200px" class="logoLojaLogin"></v-img>
            <v-form class="form-login">
                <v-text-field label="E-mail" v-model="user.email"></v-text-field>
                <v-text-field label="Senha" v-model="user.senha" type="password" append-icon="mdi-eye"></v-text-field>
                <v-text-field label="Confirmar Senha" v-model="user.senhaconfirm" type="password" append-icon="mdi-eye"></v-text-field>
                <v-text-field label="Nome" v-model="nome"></v-text-field>
                <v-text-field label="Sobrenome" v-model="sobrenome"></v-text-field>
                <v-text-field label="Cpf" v-model="cpf" v-mask="'###.###.###-##'"></v-text-field>
                <v-text-field label="Telefone" v-model="tel" v-mask="'(##) 9####-####'"></v-text-field>
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
                senhaconfirm: ''
            },
            nome: '',
            sobrenome: '',
            cpf: '',
            tel: ''
        }
    },

    methods: {
        
        async createUser() {
            if (this.user.senha === this.user.senhaconfirm) {
                await createUserWithEmailAndPassword(auth, this.user.email, this.user.senha);
                this.$router.push({ name: 'Loja' });
                this.createProfileAndCartDoc();
            } else {
                window.alert('O campo "Confirmar Senha" precisa ser identico ao campo "Senha"')
            }
        },

        async createProfileAndCartDoc() {
            const uid = auth.currentUser.uid;
            const profile = {
                status: 'sem-perfil',
                email: this.user.email,
                nome: this.nome,
                sobrenome: this.sobrenome,
                cpf: this.cpf,
                tel: this.tel
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