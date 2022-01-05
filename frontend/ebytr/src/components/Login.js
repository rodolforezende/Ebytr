import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import Header from './Header';


const Login = () => {
  const [ login, setlogin ] = React.useState({ email: '', password: ''});
  const [ error, setError ] = React.useState(false)
  const [ isToken, setToken ] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(true)
    }
  }, [])

  function handleChange({ target }) {
    const { name, value } = target;
    setlogin({...login, [name]: value });
  }

  async function handleSubmit (event) {
    event.preventDefault();
    try {
      const token = await axios.post('http://localhost:5000/login', login);
      localStorage.setItem('token', token.data.token);
      setToken(true);
      return token.data.token;
      
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div>
      <Header />
      <div className="login">        
        <h1>Login</h1>
        { error && <p className="error">{ error }</p>}
        <form>
          <input type="email" placeholder="Digite seu email" onChange={ handleChange } name="email" value={ login.email } />
          <input type="password" placeholder="Digite sua senha" onChange={ handleChange }name="password" value={ login.password }  /> 
          <button className="loginButton" type='submit' onClick={ handleSubmit } >Login</button>
          <Link to="/register" className="userButton">Create New User</Link>
        </form>
      </div>
      <div>
        
      </div>
      {isToken && <Redirect to="/task" />}
    </div>
  )
}

export default Login;



