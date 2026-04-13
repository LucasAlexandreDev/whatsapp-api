/*************************************************************************** 
* Objetivo: Arquivo responsável pelas funções de validação de dados
* Data: 12/04/2026
* Desenvolvedor: Lucas Alexandre da Silva
* Versão: 1.0
****************************************************************************/

// função responsável por validar número de telefone
function validarNumeroTelefone(numero){

    if(numero == null || numero == ""){
        return false
    }

    let numeroTratado = String(numero).trim()

    /* 
    regex para validar números de telefone contendo apenas dígitos (0-9)
    com tamanho entre 10 e 13 caracteres:

    ^        -> início da string
    [0-9]    -> permite apenas números de 0 a 9
    {10,13}  -> mínimo de 10 e máximo de 13 dígitos
    $        -> fim da string
    */
    const regex = /^[0-9]{10,13}$/

    if(!regex.test(numeroTratado)){
        return false
    }

    return numeroTratado
}


// função responsável por validar nome (usuário ou contato)
function validarNome(nome){

    if(nome == null || nome == ""){
        return false
    }

    let nomeTratado = String(nome).trim()

    /* 
    regex para validar nomes contendo apenas letras (incluindo acentos) e espaços:

    ^         -> início da string
    [a-zà-ÿ\s]-> permite: * letras de a até z, * letras com acento (à-ÿ), * espaços (\s)
    {2,}      -> mínimo de 2 caracteres
    $         -> fim da string
    i         -> ignora maiúsculas e minúsculas
    */
    const regex = /^[a-zà-ÿ\s]{2,}$/i

    if(!regex.test(nomeTratado)){
        return false
    }

    return nomeTratado
}


// função responsável por validar palavra-chave
function validarPalavraChave(palavra){

    if(palavra == null || palavra == ''){
        return false
    }

    let palavraTratada = String(palavra).trim().toLowerCase()

    /* 
    regex para validar qualquer tipo de entrada com no mínimo 2 caracteres:

    ^      -> início da string
    .      -> qualquer caractere (letras, números, símbolos, espaços)
    {2,}   -> mínimo de 2 caracteres ou mais
    $      -> fim da string
    */
    const regex = /^.{2,}$/

    if(!regex.test(palavraTratada)){
        return false
    }

    return palavraTratada
}

// exports das funções de validação
module.exports = {
    validarNumeroTelefone,
    validarNome,
    validarPalavraChave
}