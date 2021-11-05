import React from 'react';
import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Registro de usuário', () => {
  it('Quando abrir pagina de register o input "Nome" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<App/>, {route: '/register'});

    const nome = getByPlaceholderText("Digite o seu nome");

    expect(nome).toBeInTheDocument()
  });

  it('Quando abrir pagina de register o input "Email" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<App/>, {route: '/register'});

    const email = getByPlaceholderText("Digite o seu email");

    expect(email).toBeInTheDocument()
  });

  it('Quando abrir pagina de register o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<App/>, {route: '/register'});

    const senha = getByPlaceholderText("Digite sua senha");

    expect(senha).toBeInTheDocument()
  });

  it('Quando abrir pagina ter um botão do tipo Submit', () => {
    const { getByRole } = renderWithRouter(<App/>, {route: '/register'});

    const botao = getByRole('button', { type: 'submit' });

    expect(botao).toBeInTheDocument()
  });

});