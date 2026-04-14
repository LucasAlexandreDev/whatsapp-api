/*************************************************************************** 
* Objetivo: Arquivo responsável pela criação da documentação da API 
* Data: 13/04/2026
* Desenvolvedor: Lucas Alexandre da Silva
* Versão: 1.0
****************************************************************************/

const documentacaoAPI =
    {
        "API": {   
            "name"            : "API whatsApp clone",
            "api_description" : "API para manipular dados de mensagens (usuário, contato, conversas e palavra-chave) do whatsapp ",
            "date"            : "2026-04-13",
            "version"         : 1.0,
            "author": {
                "name"    : "Lucas Alexandre da Silva",
                "email"   : "lucasalexandre.lads13@gmail.com",
                "github"  : "https://github.com/LucasAlexandreDev",
                "linkedin": "https://www.linkedin.com/in/lucas-alexandre-7209a0386/"
            }
        },

        "default_response": {
            "success": {
                "status": true,
                "status_code": 200,
                "developer": "Lucas Alexandre da Silva",
                "data": {}
            },
            "error": {
                "status": false,
                "status_code": 404,
                "developer": "Lucas Alexandre da Silva",
                "message": " Descrição do erro da requisição"
            }
        },

        "configuration_url" : {
            "base_url"  : "http://localhost:8080",
            "render"    : ""
        },

        "endpoints": [
            {
                "name"           : "Listar usuários",
                "route"          : "/v1/whatsapp/lista/dados/usuarios", 
                "description"    : "Retorna a lista de dados de todos os usuários",
                "method"         : "GET",
                "parameter_types": {
                    "params"       : null,
                    "query_params" : null
                },
                "request_example": "/v1/whatsapp/lista/dados/usuarios"
            },

            {
                "name"           : "Perfil do usuário",
                "route"          : "/v1/whatsapp/dados/perfil/usuario/:numeroUsuario",
                "description"    : "Retorna todos os dados de perfil do usuário",
                "method"         : "GET",
                "parameter_types": {
                    "params"       : {"numeroUsuario": "string (obrigatório)"},
                    "query_params" : null
                },
                "request_example": "/v1/whatsapp/dados/perfil/usuario/40028922"
            },

            {
                "name"           : "Contatos do usuário",
                "route"          : "/v1/whatsapp/dados/contatos/usuario/:numeroUsuario",
                "description"    : "Retorna os dados do usuário e todos os seus contatos",
                "method"         : "GET",
                "parameter_types": {
                    "params"       : {"numeroUsuario": "string (obrigatório)"},
                    "query_params" : null
                },
                "request_example": "/v1/whatsapp/dados/contatos/usuario/40028922"
            },

            {
                "name"           : "Conversas com todos os contatos",
                "route"          : "/v1/whatsapp/conversas/trocadas/usuario/contatos/:numeroUsuario",
                "description"    : "Retorna os dados do usuário e todas as conversas trocadas entre seus contatos",
                "method"         : "GET",
                "parameter_types": {
                    "params"       : {"numeroUsuario": "string (obrigatório)"},
                    "query_params" : null
                },
                "request_example": "/v1/whatsapp/conversas/trocadas/usuario/contatos/40028922"
            },

            {
                "name"           : "Conversas com um contato",
                "route"          : "/v1/whatsapp/conversa/trocada/usuario/:numeroUsuario/contato",
                "description"    : "Retorna os dados do usuário e as conversas trocadas com um contato",
                "method"         : "GET",
                "parameter_types": {
                    "params"       : {"numeroUsuario": "string (obrigatório)"},
                    "query_params" : {"nomeContato"  : "string (obrigatório)"}
                },
                "request_example": "/v1/whatsapp/conversa/trocada/usuario/40028922?nomeContato=Lucas"
            },

            {
                "name"           : "Buscar mensagens por palavra-chave",
                "route"          : "/v1/palavra/chave/conversa/usuario/:numeroUsuario/contato",
                "description"    : "Retorna os dados do usuário, contato e as mensagens filtradas por palavra-chave",
                "method"         : "GET",
                "parameter_types": {
                    "params"       : {"numeroUsuario": "string (obrigatório)"},
                    "query_params" : { 
                        "nomeContato"  : "string (obrigatório)",
                        "palavraChave" : "string (obrigatório)"
                    }
                },
                "request_example": "/v1/palavra/chave/conversa/usuario/40028922/contato?nomeContato=Lucas&palavraChave=back"
            }
        ]
    }

module.exports = {
    documentacaoAPI    
}