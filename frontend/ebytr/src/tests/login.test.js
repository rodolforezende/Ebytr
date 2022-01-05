import React from 'react';
import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Login', () => {
  it('Quando abrir pagina de login o input "Email" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<App/>, {route: '/'});

    const email = getByPlaceholderText("Digite seu email");

    expect(email).toBeInTheDocument()
  });

  it('Quando abrir pagina de login o input "Senha" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<App/>, {route: '/'});

    const senha = getByPlaceholderText("Digite sua senha");

    expect(senha).toBeInTheDocument()
  });

  it('Quando abrir pagina ter um botão do tipo Submit', () => {
    const { getByRole } = renderWithRouter(<App/>, {route: '/'});

    const botao = getByRole('button', { type: 'submit' });

    expect(botao).toBeInTheDocument()
  });
});
