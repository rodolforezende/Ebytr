const mongoose = require('mongoose');
const MockMongoose = require('mock-mongoose').MockMongoose;
const mockMongoose = new MockMongoose(mongoose);
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app');

chai.use(chaiHttp);
const { expect } = chai;

before(function(done) {
  mockMongoose.prepareStorage().then(function() {
      mongoose.connect('mongodb+srv://dascoxa:Coxa8905!@cluster0.gkcbz.mongodb.net/Ebytr?retryWrites=true&w=majority', function(err) {
          done(err);
      });
  });
});

describe('Criação de endpoint para cadastro de usuário', () => {
  let response;

  before(async () => {
    response = await chai.request(server).post('/register').send({ email: 'email@email.com', password: '12345678' })
  })

  it('retorna código de status "404', () => {
    expect(response).to.have.status(404);
  })

  it('retorna um objeto no body', () => {
    expect(response.body).to.be.an('object')
  })

  it('objeto de resposta possui a propriedade "message"', () => {
    expect(response.body).to.have.property(message)
  })

  it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
    expect(response.body.message).to.be.equals("Invalid entries. Try again.")
  })

  it('não retorna código de status "200"', () => {
    expect(response).not.to.have.status(200);
  })

});

describe('POST /login', () => {  
  describe('Quando não é passado pessoa usuária e senha', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users').send({})
    })

    it('retorna código de status "400', () => {
      expect(response).to.have.status(400)
    })
  
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object')
    })
  
    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message')
    })
  
    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals("Invalid entries. Try again.")
    })

    it('não retorna código de status "200"', () => {
      expect(response).not.to.have.status(200);
    })

  });
});

describe('GET /task', () => {
  
  let login;
  before(async () => {
    login = await chai.request(server).post('/login').send({ email: 'email@email.com', password: '123456'  })
    console.log(login.body)      
  })
  
  describe('Quando as tarefas são buscadas com sucesso', () => {
    
    it('retorna código de status "200', () => {
    })
  
    it('retorna um array no body', () => {
    })

    it('não retorna código de status "400"', () => {
    })

  });
});
