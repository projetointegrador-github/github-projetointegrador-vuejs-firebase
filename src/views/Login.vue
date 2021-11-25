<template>
    <div class="estrutura-login">
        <v-card class="card-login" outlined>
            <h1 class="h1">Formulário de Cadastro</h1>
            <v-img src="../assets/logoLojaCortado.png" max-width="200px" class="logoLojaLogin"></v-img>
            <v-form class="form-login">
                <v-text-field label="E-mail"></v-text-field>
                <v-text-field label="Senha" type="password" append-icon="mdi-eye"></v-text-field>
                <v-text-field label="Confirmar Senha" type="password" append-icon="mdi-eye"></v-text-field>
                <v-text-field label="Nome"></v-text-field>
                <v-text-field label="Sobrenome"></v-text-field>
                <v-text-field label="Cpf"></v-text-field>
                <v-text-field label="Endereço"></v-text-field>
                <v-text-field label="Telefone"></v-text-field>
                <v-btn color="dark" dark>Criar usuário</v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>
</style>