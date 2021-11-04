# Ebytr

Esse é um projeto proposto pela Trybe no dia de BLITZ de Carreira. 
O objetivo desse projeto é colocar em prática, sem roteiro, nossos aprendizado no curso até então.

Nesse projeto foi inserido a arquitetura MERN, sigla para utilização de Mongo, Express, React e Node.JS.

#Project 

##Backend

* Node.JS
* Express
* Email Validator - [Email Validator](https://www.npmjs.com/package/email-validator)
* Joi - [Joi](https://www.npmjs.com/package/joi)
* cors - [cors](https://www.npmjs.com/package/cors)
* JWT - [JWT](https://www.npmjs.com/package/jwt)
* bcrypt - [bcrypt](https://www.npmjs.com/package/bcrypt)

Para teste, utilizamos os seguintes pacotes:

* Chai
* Mocha
* Sinon
* NYC
* Chai-http

##Frontend

* Axios
* React-Router-Dom
* date-fns

#Como utilizar?

```
* Primeiro, clone o repositório no link
* $ git clone git@github.com:rodolforezende/Ebytr.git
```

###Iniciando servidor
Esse projeto está vincula ao uma conta do ATLAS do mongodb de meu acesso, para utilizar um banco próprio se fazer necessário criar uma conta no link do ATLAS e no arquivo .env disponível na pasta backend, adicionar a URL do acesso ao seu banco.

Após fazer isso, entre no diretório "backend" e sigo os passos:

```
*Instalando as dependencias
$ npm i

*Rodando nodemon para iniciar o servidor
$ npm run dev

```

###Iniciando frontend
Após iniciar o servidor no backend, faz necessário iniciar o React na pasta de frontend, seguindo os seguintes passos:

__OBS__
Abrindo um novo terminal, no diretório principal do app.

```
*Instalando as dependencias
$ npm i

*Rodando o app
$ npm start

```






