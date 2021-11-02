import React from 'react';
import axios from 'axios'


const Login = () => {

  const [ login, setlogin ] = React.useState({ email: '', password: ''});

  function handleChange({ target }) {
    const { name, value } = target;
    console.log(login)
    setlogin({...login, [name]: value });
  }

  async function handleSubmit (event) {
    event.preventDefault();
    const token = await axios.post('http://localhost:5000/login', login);
    console.log(token.data.token)
    return token.data;
  }

  return (
    <div>
      <div className="login">        
        <h1>Login</h1>
        <form>
          <input type="email" placeholder="Digite seu email" onChange={ handleChange } name="email" value={ login.email } />
          <input type="password" placeholder="Digite sua senha" onChange={ handleChange }name="password" value={ login.password }  /> 
          <button type='submit' onClick={ handleSubmit } >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;



