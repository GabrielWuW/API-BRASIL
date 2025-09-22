/*******************************************************************************************
 * Objetivo: endpoints referente a API de estados e cidades
 * Data: 15/09/2025
 * Autor: Gabriel José
 * Versão: 1.0
 *  
 * *****************************************************************************************
 * Observações: Instalação do Express, Cors, Body-Parser
 * -----------------------------------------
 * npm install express     --save         
 * npm install cors        --save         
 * npm install body-parser --save         
 * -----------------------------------------
 * 
 * ****************************************************************************************/

//Importando as dependencias da API
const express = require('express');     //Responsavel pela API
const cors = require('cors');        //Responsavel pelas permissões da API (APP)
const bodyParser = require('body-parser'); //Responsavel por gerenciar a chegada dos dados da API com o front

const dados = require('./modulo/funcoes.js'); //import do arquivo de funções


//Retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080;

//Criando uma instancia de uma classe do express
const app = express();

//Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');    //Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET'); //Verbos permitidos na API

    app.use(cors()); //Carrega as configurções no CORS da API 
    next(); // Próximo, carregar os próximos endpoints
});

//request  -> Chegada de dados na API
//response -> Retorno de dados da API

//ENDPOINTS
app.get('/v1/estados', function (request, response) {
    //Pesquisa na função de estados
    let estados = dados.getAllEstados();

    response.status(estados.status_code);   //Retorna o status code 
    response.json(estados); //Retorna o JSON
});

app.get('/v1/estado/:uf', function (request, response) {
    let sigla = request.params.uf;
    let estado = dados.getEstadoBySigla(sigla);

    response.status(estado.status_code);
    response.json(estado);
});

app.get('/v1/estado/capital/:sigla', function (request, response) {
    let sigla = request.params.sigla;
    let capital = dados.getCapitalBySigla(sigla);

    response.status(capital.status_code);
    response.json(capital);
})

app.get('/v1/estados/regiao/:regiao', function (request, response) {
    let sigla = request.params.regiao;
    let regiao = dados.getEstadosByRegiao(sigla);

    response.status(regiao.status_code);
    response.json(regiao);
});

app.get('/v1/pais/capitais', function (request, response) {
    let capitais = dados.getVerifyCapitaisDoPais();
    response.status(capitais.status_code);
    response.json(capitais);
});

app.get('/v1/cidades/:sigla', function (request, response) {
    let sigla = request.params.sigla;
    let cidades = dados.getCidadesBySigla(sigla);

    response.status(cidades.status_code);
    response.json(cidades);
});

//Start na API
app.listen(PORT, function () {
    console.log('API rodando em http://localhost:8080');
});