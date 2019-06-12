# Sp Medical Group  

## Requisitos
O projeto precisados seguintes itens para funcionar
 - Firebase
 - Node.js
 - Bibliotecas 
	- google-maps-react - **Usar API do google**
	- react-bootstrap - **Estilização**
	- firebase - **Conectar com api firebase**
	- firebase-tools - **Publicar o site**

## Firebase  
### Criando uma conta
Para poder usar o firebase você precisará ter uma conta no google, você conseguirá logar normalmente.

### Criando um projeto 
A pagina que você sera redirecionado apos logar sera a pagina de projetos. Lá, crie um novo projeto.
Escolha um nome (não altere o ID do projeto), depoisde criado você terá varias opções mas vou focar apenas em 2 funções.    
- **Database** : Onde você armazenará seus dados .tambem tera validação de quem  podera altera-los , inserir novos dados. O Banco de dados tem limite de 50.000 visualizações , 20.000 inserções e 10.000 deleções por dia.  
- **Hosting** : Onde você hospedará seu site.   

### Criando um banco de dados  
Clique em database e selecione **Criar banco de dados**, apos isso escolha se quer ele no modo bloqueado ou de teste (é recomendado utilizar o de teste primeiro).  
#### Coleções
Crie uma coleção chamada **dados-usuario** (o nome deve ser identico ao valor da constante **localUsuario** no arquivo **/src/pages/index.js**). Quando a coleção for criada , será necessario ter um valor inicial para ela, então insira um documento com os seguinte campos*.  
- **Nome** : *string*  
- **Localizacao** : *geopoint*  
- **Medico**** : *map*
	- **Nome** : *string*
	- **Especialidade**: *string*  
- **Descricao** : *string*  
- **Idade** : *number*  

\* *Os nome dos campos devem ser identicos (aos inseridos acima)*  
\*\* *Os campos **Nome** e **Especialização** deverão ser criados dentro do campo **Medico*** 

Esse passo é opcional : Crie uma coleção chamada **especialidade** (caso você queira "limitar" quais especialidades o usuario podera inserir) com os campos
- **id** : *number*  
- **nome**: *string*  
Caso você não queria fazer este passo , o dropdown sera substituido por um campo de texto.

### Usuarios  
Va em **Authentication** e selecione **Metodo de login**. Habilite apenas o metodo **Email/Senha**.  
Então vá para **Usuarios** e crie um usuario para que você possa cadastrar dados no banco (caso não cadstre nenhum será impossivel depois já que o sistema não tem criação de conta).  
No site você podera usar este usuario para poder cadastrar dados (você pode adcionar quantos quiser)  

### Autenticação e Autorização  
Em **database**, selecione **regras** e crie a seguinte regra
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read :if true ;//permite que qualquer pessoa possa ver os dados
      allow write : if request.auth.token.email != null; // permite que apenas usuarios autenticados poderão cadastrar novos dados 
    }
  }
}
```

### Hospedando o seu projeto React
Para hospedar o site você devera primeiro iniciar o projeto. Digite os seguintes comandos no prompt de comando :
**npm install** vai instalar tudo que o projeto precisa para funcionar.  
**npm start** para testar se o projeto esta funcionando.  
Se tudo estiver funcionando, use o comando **npm run-script build** pra criar os arquivos de publicação do projeto (sera criado na pasta do projeto uma pasta chamada **build**)  
instale **firebase-tools** usando o comando **npm install -g firebase-tools**.  
Faça login no firebase usando o comando **firebase login**.  
Inicie um repositorio com o comando **firebase init**
	- Selecione o repositorio criado e continue.  
	- 
	- Selecione a opção Hosting.  
	- 
- Digite **firebase serve** caso queira testar o site.  
- Caso esteja tudo funcionando , digite **firebase deploy** e seja feliz.  
Após isso, você recebara 2 links que poderão ser usados para acessar o seu site.  

## Website  
O site tem apenas uma pagina. 
Onde você podera ver os dados inseridos e um formlario (login se estiver deslogado e cadastro de dados se estiver logado).  

## Google API  
Sera necessario ter uma chave da API do google maps (ou deixe a que esta como padrão, ela funciona).  

## Links
- [Firebase UI Login](https://www.youtube.com/watch?v=r4EsP6rovwk)  
- [Usando API do google maps com react](https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2)  
- [Claims customizadas](https://firebase.google.com/docs/auth/admin/custom-claims?hl=pt-br)
https://codelabs.developers.google.com/codelabs/firebase-admin/index.html?index=..%2F..index#0
https://firebase.google.com/docs/admin/setup/#add_firebase_to_your_app
https://firebase.google.com/docs/auth/admin/create-custom-tokens?authuser=0