/* *********************************************************************
* Objetivo: Gerar novos retornos de dados, com base na manipulação dos dados do 'banco de dados' contatos.js
* Data: 08/04/2026  
* Desenvolvedor: Lucas Alexandre Da Silva
* Versão: 1.0
* **********************************************************************/

// Import do arquivo de 'contatos.js' referente á um falso db
const contatoDados = require("./contatos.js")

// Crio uma variável global contendo todos os dados dos contatos
const contatos = contatoDados.contatos

// função responsável retornar uma Lista de Todos os Dados de todos os Usuários
const getListaDadosUsuario = function(){
    
    let resultado = {dados_usuario: contatos}

    if(!resultado || !contatos){
        return false
    }

    return resultado
}

//console.dir(getListaDadosUsuario(), { depth: null, colors: true });
