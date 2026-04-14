/* *********************************************************************
* Objetivo: Gerar novos retornos de dados, com base na manipulação dos dados do 'banco de dados' contatos.js
* Data: 08/04/2026  
* Desenvolvedor: Lucas Alexandre Da Silva
* Versão: 1.1
* **********************************************************************/

// Import do arquivo de 'contatos.js' referente á um falso db
const contatoDados = require("./contact.js")

// Import do arquivo de 'validacaoDados.js' referente á todas as validações necessárias do sistema
const validacaoDados = require("./validationData.js")

// Import do arquivo de 'respostaPadrao.js' referente ao retorno padrão de resposta da API
const respostaPadrao = require("./responseStandard.js")

// Crio uma variável global contendo todos os dados dos contatos
const contatos = contatoDados.contatos

// -------------- | FUNÇÕES AUXILIARES | -------------- 


// função responsável por comparar valores (string)
const compararValorIguais = function(valor1, valor2){

    if(valor1 == null || valor1 == "" || valor2 == null || valor2 == ""){
        return false
    }

    let resultado = String(valor1).trim().toLowerCase() == String(valor2).trim().toLowerCase()

    if(!resultado){
        return false
    }

    return resultado
}

// função responsável por buscar usuário pelo número
const buscarDadosUsuarioPeloNumero = function(numeroUsuario){

    let numeroValido = validacaoDados.validarNumeroTelefone(numeroUsuario)
    let resultado    = null

    if(!numeroValido){
        return false
    }

    contatos["whats-users"].forEach(function(itemUsuario){

        if(compararValorIguais(numeroValido, itemUsuario.number)){
            resultado = itemUsuario
        }
    })

    if(!resultado){
        return false
    }

    return resultado
}

// função responsável por buscar contatos do usuário pelo número
const buscarDadosContatosPeloNumero = function(numeroUsuario){

    let dadosUsuario  = buscarDadosUsuarioPeloNumero(numeroUsuario)

    if(!dadosUsuario){
        return false
    }

    let listaContatos = dadosUsuario.contacts

    if(!listaContatos || listaContatos.length == 0){
        return false
    }

    return listaContatos
}

// função responsável por retornar oss dados do Usuário de modo completo
const selecionarUsuarioPerfil = function(dadosUsuario){

    let resultado = 
    {
        usuario: {
            nome_conta  : dadosUsuario.account,
            nick        : dadosUsuario.nickname,
            numero      : dadosUsuario.number,
            foto_perfil : dadosUsuario["profile-image"],
            cor_de_fundo: dadosUsuario.background,
            criado_desde: {
                data_criacao     : dadosUsuario["created-since"].start,
                data_encerramento: dadosUsuario["created-since"].end
            }
        }
    }

    return resultado
}

// função responsável por retornar oss dados do Usuário de modo resumido
const selecionarUsuarioResumo = function(dadosUsuario){

    let resultado = 
    {
        
        id           : dadosUsuario.id,
        nome         : dadosUsuario.account,
        nickname     : dadosUsuario.nickname,
        numero       : dadosUsuario.number,
        imagem_perfil: dadosUsuario["profile-image"]
    }

    return resultado
}


// -------------- | FUNÇÕES DO PROJETO | -------------- 


/* *********************************************************************
* REQUISITO 1 - LISTAR USUÁRIOS
* função responsável por retornar uma lista de usuário 
* **********************************************************************/
const getListaDadosUsuarios = function(){

    if(!contatos){
        return respostaPadrao.erro("Todos os dados de usuário não encontrados", 404)
    }

    return respostaPadrao.sucesso({dados_usuarios: contatos["whats-users"]}, 200)
}


/* *********************************************************************
* REQUISITO 2 - PERFIL DO USUÁRIO
* função responsável por retornar uma lista de dados do perfil do usuário 
* **********************************************************************/
const getDadosPerfilUsuario = function(numeroUsuario){

    let dadosUsuario = buscarDadosUsuarioPeloNumero(numeroUsuario)

    if(!dadosUsuario){
        return respostaPadrao.erro("Nenhum usuário foi encontrado", 404)
    }

    let resultado = selecionarUsuarioPerfil(dadosUsuario)

    return respostaPadrao.sucesso(resultado, 200)
}


/* *********************************************************************
* REQUISITO 3 - CONTATOS DO USUÁRIO
* função responsável por retornar uma lista de contatos do usuário 
* **********************************************************************/
const getDadosContatosDoUsuario = function(numeroUsuario){

    let dadosUsuario  = buscarDadosUsuarioPeloNumero(numeroUsuario)
    let dadosContatos = buscarDadosContatosPeloNumero(numeroUsuario)

    let listaContatos = []

    if(!dadosUsuario || !dadosContatos){
        return respostaPadrao.erro("Nenhum usuário ou contato foi encontrado", 404)
    }

    dadosContatos.forEach(function(itemContato){

        listaContatos.push({
            nome     : itemContato.name,
            foto     : itemContato.image,
            descricao: itemContato.description
        })
    })

    let usuario   = selecionarUsuarioResumo(dadosUsuario)
    let resultado = {usuario, dados_contatos_usuario: listaContatos}

    return respostaPadrao.sucesso(resultado, 200)
}


/* *********************************************************************
* REQUISITO 4 - MENSAGENS DO USUÁRIO
* função responsável por retornar dados do usuário, contatos e todas as suas conversas 
* **********************************************************************/
const getMensagensTrocadasPeloUsuario = function(numeroUsuario){

    let dadosUsuario  = buscarDadosUsuarioPeloNumero(numeroUsuario)
    let dadosContatos = buscarDadosContatosPeloNumero(numeroUsuario)

    let listaContatos = []

    if(!dadosUsuario || !dadosContatos){
        return respostaPadrao.erro("Nenhuma das mensagens trocadas pelo usuário foi encontrada", 404)
    }

    dadosContatos.forEach(function(itemContato){

        listaContatos.push({
            nome         : itemContato.name,
            descricao    : itemContato.description,
            imagem_perfil: itemContato.image,
            conversas    : {
                quantidade_mensagens: itemContato.messages.length,
                mensagens           : itemContato.messages
            }
        })
    })

    let usuario   = selecionarUsuarioResumo(dadosUsuario)
    let resultado = {usuario, contatos: listaContatos}

    return respostaPadrao.sucesso(resultado, 200)
}


/* *********************************************************************
* REQUISITO 5 - CONVERSA ESPECÍFICA
* função responsável por retornar dados do usuário, contato e sua conversa
* **********************************************************************/
const getBuscarConversasDoUsuarioComContato = function(numeroUsuario, nomeContato){

    let nomeValido    = validacaoDados.validarNome(nomeContato)
    let dadosUsuario  = buscarDadosUsuarioPeloNumero(numeroUsuario)
    let dadosContatos = buscarDadosContatosPeloNumero(numeroUsuario)

    if(!nomeValido){
        return respostaPadrao.erro("Nome do contato inválido", 400)
    }

    if(!dadosUsuario || !dadosContatos){
        return respostaPadrao.erro("Usuário ou contatos não encontrados", 404)
    }
    
    let usuario   = selecionarUsuarioResumo(dadosUsuario)
    let resultado = {usuario}

        dadosContatos.forEach(function(itemContato){
              
            if(compararValorIguais(nomeValido, itemContato.name) && compararValorIguais(numeroUsuario, dadosUsuario.number)){

            resultado.contato = {
                    nome         : itemContato.name,
                    descricao    : itemContato.description,
                    imagem_perfil: itemContato.image
                },
            
                resultado.conversas = {
                    quantidade_mensagens: itemContato.messages.length,
                    mensagens           : itemContato.messages
                }
            }
        })

    if(!resultado.contato || !resultado.conversas){
        return respostaPadrao.erro("Lista de conversas do usuário com contato, não encontrada", 404)
    }

    return respostaPadrao.sucesso(resultado, 200)
}


/* *********************************************************************
* REQUISITO 6 - BUSCA POR PALAVRA-CHAVE
* função responsável por retornar dados do usuário, contato e as conversas que possuem a palavra-chave informada
* **********************************************************************/
const getPesquisarMensagensPorPalavraChave = function(numeroUsuario, nomeContato, palavraChave){
    
    let dadosContatos = buscarDadosContatosPeloNumero(numeroUsuario)
    let dadosUsuario  = buscarDadosUsuarioPeloNumero(numeroUsuario)
    let nomeValido    = validacaoDados.validarNome(nomeContato)
    let palavraValida = validacaoDados.validarPalavraChave(palavraChave)
    
    let listaMensagemPalavraChave = []

    if(!palavraValida){
        return respostaPadrao.erro("Palavra-chave inválida", 404)
    }

    if(!nomeValido){
        return respostaPadrao.erro("Nome do contato inválido", 400)
    }

    if(!dadosUsuario){
        return respostaPadrao.erro("Usuário não encontrado", 400)
    }

    let usuario   = selecionarUsuarioResumo(dadosUsuario)
    let resultado = {usuario}


    dadosContatos.forEach(function(itemContato){

        if(compararValorIguais(nomeValido, itemContato.name)){

            resultado.contato = {
                nome     : itemContato.name,
                foto     : itemContato.image,
                descricao: itemContato.description
            }

            itemContato.messages.forEach(function(itemMensagem){

                let content = itemMensagem.content.trim().toLowerCase()
                
                if(content.includes(palavraValida)){
                    listaMensagemPalavraChave.push(itemMensagem)
                }
            })
        }
    })

    if(listaMensagemPalavraChave.length == 0){
        return respostaPadrao.erro("Nenhuma mensagem encontrada com essa palavra-chave", 404)
    }

    resultado.conversas = {
        palavra_chave   : palavraValida,
        total_encontrado: listaMensagemPalavraChave.length,
        resultados      : listaMensagemPalavraChave
    }

    return respostaPadrao.sucesso(resultado, 200)
}

// -------------- | EXPORTS DAS FUNÇÕES DA API | -------------- 

module.exports = {
    getListaDadosUsuarios,
    getDadosPerfilUsuario,
    getDadosContatosDoUsuario,
    getMensagensTrocadasPeloUsuario,
    getBuscarConversasDoUsuarioComContato,
    getPesquisarMensagensPorPalavraChave
}