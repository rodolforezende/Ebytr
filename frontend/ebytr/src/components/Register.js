import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Register = () => {

  const [ register, setRegister ] = React.useState({ name: '', email: '', password: ''});
  const [ error, setError ] = React.useState(false);
  const [ sucess, setSucess ] = React.useState(false);

  function handleChange({ target }) {
    const { name, value } = target;
    setRegister({...register, [name]: value });
  }

  async function handleSubmit (event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', register);
      setSucess(true);      
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className="container">
      <h4>Preecha os dados:</h4>
      { error && <p>{ error }</p>}
      <div>
        <form className="form">
          <input type="text" placeholder="Digite o seu nome" onChange={ handleChange } name="name" value={ register.name } />
          <input type="email" placeholder="Digite o seu email" onChange={ handleChange } name="email" value={ register.email } />
          <input type="password" placeholder="Digite sua senha" onChange={ handleChange } name="password" value={ register.password } />
          <button className="registerButton" type='submit' onClick={ handleSubmit } >Create</button>
        </form>
      </div>
      { sucess && <Redirect to="/" />}
    </div>
  )
}

export default Register;
