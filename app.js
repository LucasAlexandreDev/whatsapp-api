/*************************************************************************** 
* Objetivo: Arquivo responsável pela criação da API do projeto whatsapp 
* Data: 13/04/2026
* Desenvolvedor: Lucas Alexandre da Silva
* Versão: 1.0
****************************************************************************/

// Import das dependências para estar montando a API
const express = require('express')
const cors    = require('cors')

// Import do arquivo de 'functions.js' referente as funções da API
const whatsappFunction = require('./modulo/message/functions.js')

// Import do arquivo de 'apiDocumentation.js' referente a documentação da API
const documentacaoAPI  = require('./modulo/message/apiDocumentation.js') 

// Criando uma instância do framework Express para criar a API
const app = express()

const corsOptions = 
{
    origin        : ['*'], // acesso público para o cliente e Front-End
    methods       : 'GET',                                    
    allowedHeaders: ['Content-type', 'Authorization']         
}

// Aplica as configurações do cors no app (express)
app.use(cors(corsOptions))

// Faz o start da APi (aguardando as requisições)
app.listen(8080, function(){
    console.log('APi aguardando novas requisições ..., http://localhost:8080')
})

// Endpoint - requisito 1 | responsável por retornar os dados brutos do JSON (contendo todos os usuários)
app.get('/v1/whatsapp/lista/dados/usuarios', function(request, response){

    let listaUsuarios = whatsappFunction.getListaDadosUsuarios()

    response.status(listaUsuarios.status_code)
    response.json(listaUsuarios)
})


// Endpoint - requisito 2 | responsável por retornar os dados de perfil do usuário
app.get('/v1/whatsapp/dados/perfil/usuario/:numeroUsuario', function(request, response){

    let numero         = request.params.numeroUsuario
    let perfilUsuario  = whatsappFunction.getDadosPerfilUsuario(numero)

    response.status(perfilUsuario.status_code)
    response.json(perfilUsuario)
})


// Endpoint - requisito 3 | responsável por retornar os dados resumidos do usuário e todos os seus contatos
app.get('/v1/whatsapp/dados/contatos/usuario/:numeroUsuario', function(request, response){

    let numero           = request.params.numeroUsuario
    let contatosUsuario  = whatsappFunction.getDadosContatosDoUsuario(numero)
        
    response.status(contatosUsuario.status_code)
    response.json(contatosUsuario)
})


// Endpoint - requisito 4 | responsável por retornar os dados resumidos do usuário e todas as mensagens trocadas entre seus contatos
app.get('/v1/whatsapp/conversas/trocadas/usuario/contatos/:numeroUsuario', function(request, response){

    let numero           = request.params.numeroUsuario
    let mensagemUsuario  = whatsappFunction.getMensagensTrocadasPeloUsuario(numero)

    response.status(mensagemUsuario.status_code)
    response.json(mensagemUsuario)
    
})


// Endpoint - requisito 5 | responsável por retornar os dados resumidos do usuário e todas as mensagens trocadas com um contatos
app.get('/v1/whatsapp/conversa/trocada/usuario/:numeroUsuario/contato', function(request, response){

    let numero          = request.params.numeroUsuario
    let nome            = request.query.nomeContato
    let mensagemUsuario = whatsappFunction.getBuscarConversasDoUsuarioComContato(numero, nome)

    response.status(mensagemUsuario.status_code)
    response.json(mensagemUsuario)    
})


// Endpoint - requisito 6 | responsável por retornar os dados resumidos do usuário, contato e as mensagens que possuem a palvra-chave
app.get('/v1/whatsapp/palavra/chave/conversa/usuario/:numeroUsuario/contato', function(request, response){

    let numero               = request.params.numeroUsuario
    let nome                 = request.query.nomeContato
    let palavraChave         = request.query.palavraChave
    let conversaPalavraChave = whatsappFunction.getPesquisarMensagensPorPalavraChave(numero, nome, palavraChave)

    response.status(conversaPalavraChave.status_code)
    response.json(conversaPalavraChave)
})


// Endpoint - help (docs) | responsável por retornar toda a documentação da API + os Enpoints necessário para a sua utilização
app.get('/v1/whatsapp/help', function(request, response){
    response.json(documentacaoAPI)
})