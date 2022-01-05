import React from 'react';
import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/react'; 

describe('Register', () => {
  it('Quando abrir pagina de login o input "Email" exista na tela', async () => {
    const { getByRole, getByPlaceholderText, history, findByPlaceholderText } = renderWithRouter(<App/>, {route: '/'});

    const email = getByPlaceholderText("Digite seu email");
    const senha = getByPlaceholderText("Digite sua senha");
    const botao = getByRole('button', { type: 'submit' });

    userEvent.type( email, 'teste@teste.com');
    userEvent.type(senha, '123456');
    fireEvent.click(botao);
    const inputTitle = await findByPlaceholderText('Digite o título');
    expect(inputTitle).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/task')
    
  });
});