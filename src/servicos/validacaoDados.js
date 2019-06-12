export default function ValidarDados(dados){
    
    if(dados.Latitude < -90 || dados.Latitude > 90){
        return ({erro:true,mensagem :"Latitude invalida"});
    }
    if(dados.Localizacao.longitude < -180 || dados.Localizacao.longitude > 180){
        return ({erro:true,mensagem :"Longitude invalida"});
    }
    
    if(dados.Nome !== ""){
        if(dados.Nome.lenght > 400){
            return ({erro:true,mensagem :"Nome inserido é muito grande"});
        }
    }else{
        return ({erro:true,mensagem :"Nome não pode ser nulo"});
    }

    if(dados.Idade > 120 || dados.Idade < 0){
        return ({erro:true,mensagem :"Idade invalida"});
    }

    if(dados.Medico.Nome !== ""){
        if(dados.Medico.Nome.lenght > 400){
            return ({erro:true,mensagem :"Nome do medico é muito grande"});
        }
    }else{
        return ({erro:true,mensagem :"Nome do medico pode ser nulo"});
    }
    
    if(dados.Medico.Especialidade!== ""){
        if(dados.Medico.Especialidade.lenght > 400){
            return ({erro:true,mensagem :"A Especialidade medica inserida é muito grande"});
        }
    }else{
        return ({erro:true,mensagem :"A Especialidade medica não pode ser nulo"});
    }

    return ({erro:false,mensagem :"Dados cadastrados com sucesso"});
}