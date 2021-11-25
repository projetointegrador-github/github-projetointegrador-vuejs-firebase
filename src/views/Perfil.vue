<template>
    <div class="estrutura-perfil">
        <h1 class="h1">Página de Perfil</h1>
        <v-card outlined class="card-perfil">
            <v-card-title class="h1-perfil justify-center">Informações pessoais</v-card-title>
            <v-form class="form-perfil">
                <v-text-field prepend-inner-icon="mdi-email-outline" placeholder="E-MAIL" label="E-MAIL" outlined :value="email" disabled autocomplete="off"></v-text-field>
                <v-text-field prepend-inner-icon="mdi-file-outline" placeholder="CPFG" label="CPF" outlined :value="cpf" disabled autocomplete="off"></v-text-field>
                <v-text-field placeholder="NOME COMPLETO" label="NOME COMPLETO" outlined v-model="nomeCompleto"></v-text-field>
                <v-text-field prepend-inner-icon="mdi-phone-outline" placeholder="TELEFONE" label="TELEFONE" outlined v-model="tel"></v-text-field>
            </v-form>
            <v-card-title class="h1-perfil justify-center">Informações de endereço</v-card-title>
            <v-form class="form-perfil">
                <v-text-field prepend-inner-icon="mdi-home-outline" placeholder="ENDEREÇO" label="ENDEREÇO" outlined v-model="endEntrega"></v-text-field>
                <v-text-field placeholder="CEP" label="CEP" outlined v-model="cep"></v-text-field>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: 'teste@gmail.com',
            nomeCompleto: 'Teste da Silva Teste',
            cpf: '456.345.156-05',
            tel: '(47) 3447-1910',
            endEntrega: 'Rua Teste teste',
            cep: '89245-000'
        }
    }
}
</script>

<style>
</style>