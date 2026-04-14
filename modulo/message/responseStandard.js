/***************************************************************************
* Objetivo: Arquivo responsável por padronizar respostas da API (sucesso e erro)
* Data: 12/04/2026
* Desenvolvedor: Lucas Alexandre da Silva
* Versão: 1.0
****************************************************************************/

const desenvolvedor = "Lucas Alexandre da Silva"

// função responsável por retornar a resposta de sucesso da API
const sucesso = function(dados, statusCode){
    
    let respostaPadraoSucesso =
    {
        status: true,
        status_code: statusCode,
        desenvolvedor,
        dados
    }

    return respostaPadraoSucesso
}

//  função responsável por retornar a resposta de erro da API
const erro = function(mensagem, statusCode) {
    
    let respostaPadraoErro = 
    {
        status: false,
        status_code: statusCode,
        desenvolvedor,
        erro: mensagem
    }

    return respostaPadraoErro
}

module.exports = {
    sucesso,
    erro
}