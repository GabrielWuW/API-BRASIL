/*******************************************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API de estados e cidades
 * Data: 15/09/2025
 * Autor: Gabriel José
 * Versão: 1.0
 * 
 * ****************************************************************************************/

const MESSAGE_ERRO = { status: false, status_code: 500, development: 'Gabriel José' };
const dados = require('./estados_cidades.js');

//Retorna todos os estados
const getAllEstados = function () {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Gabriel José', uf: [] };

    //Loop
    dados.listaDeEstados.estados.forEach(function (item) {
        message.uf.push(item.sigla.toUpperCase());
    });

    //Para adicionar um elemento novo no JSON
    message.quantidade = message.uf.length;

    if (message.uf.length > 0) {
        return message; //Saida verdadeira (200)
    } else {
        return MESSAGE_ERRO; //Saida falsa (500)
    }

}

//Retorna um estado pesquisando pela sigla (UF)
const getEstadoBySigla = function (sigla) {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Gabriel José' }

    //Loop
    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.sigla.toLowerCase() === sigla.toLowerCase()) {
            message.uf = item.sigla.toUpperCase();
            message.descricao = item.nome;
            message.capital = item.capital;
            message.regiao = item.regiao;
        }
    });

    //Retornos
    if (message.uf.length > 0 && message.descricao.length > 0 && message.capital.length > 0 && message.regiao.length > 0) {
        return message; //Saida verdadeira (200)
    } else {
        return MESSAGE_ERRO; //Saida falsa (500)
    }
}

//Retorna a capital referente a um estado pesquisando pela sigla (UF)
const getCapitalBySigla = function (sigla) {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Gabriel José' };

    //Loop
    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.sigla.toLowerCase() === sigla.toLowerCase()) {
            message.uf = item.sigla.toUpperCase();
            message.descricao = item.nome;
            message.capital = item.capital;
        }
    });

    //Retornos
    if (message.uf.length > 0 && message.descricao.length > 0 && message.capital.length > 0) {
        return message; //Saida verdadeira (200)
    } else {
        return MESSAGE_ERRO; //Saida falsa (500)
    }
}

//Retorna uma lista de estados pesquisando pela região
const getEstadosByRegiao = function (regiao) {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Gabriel José', regiao: '', estados: [] };

    //Loop
    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.regiao.toLowerCase() === regiao.toLocaleLowerCase()) {
            message.regiao = item.regiao.toUpperCase();
            message.estados.push({ uf: item.sigla, descricao: item.nome });
        }
    });

    //Retornos
    if (message.estados.length > 0) {
        return message; //Saida verdadeira (200)
    } else {
        return MESSAGE_ERRO; //Saida falsa (500)
    }
}

//Retorna uma lista de estados referente as capitais do país
const getVerifyCapitaisDoPais = function () {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Gabriel José', capitais: [] };

    //Loop
    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.capital_pais) {
            message.capitais.push({
                capital_atual: item.capital_pais.capital,
                uf: item.sigla.toUpperCase(),
                descricao: item.nome,
                capital: item.capital,
                regiao: item.regiao,
                capital_pais_ano_inicio: item.capital_pais.ano_inicio,
                capital_pais_ano_termino: item.capital_pais.ano_fim
            });
        }
    });

    //Retornos
    if (message.capitais.length > 0) {
        return message; //Saida verdadeira (200)
    } else {
        return MESSAGE_ERRO; //Saida falsa (500)
    }
}

//Retorna uma lista de cidades pesquisando pela sigla do estado
const getCidadesBySigla = function (sigla) {
    //Variavel de base para o cabeçalho da API
    let message = { status: true, status_code: 200, development: 'Gabriel José', uf: '', descricao: '', quantidade_cidades: 0, cidades: [] };

    //Loop
    dados.listaDeEstados.estados.forEach(function (item) {
        if (item.sigla.toLowerCase() === sigla.toLowerCase()) {
            message.uf = item.sigla.toUpperCase();
            message.descricao = item.nome;

            item.cidades.forEach(function (cidade) {
                message.cidades.push(cidade.nome);
            });

            message.quantidade_cidades = item.cidades.length;
        }
    });

    //Retornos
    if (message.uf.length > 0 && message.descricao.length > 0 && message.quantidade_cidades > 0 && message.cidades.length) {
        return message; //Saida verdadeira (200)
    } else {
        return MESSAGE_ERRO; //Saida falsa (500)
    }
}

//Exportando as funções
module.exports = {
    getAllEstados,
    getEstadoBySigla,
    getCapitalBySigla,
    getEstadosByRegiao,
    getVerifyCapitaisDoPais,
    getCidadesBySigla
}