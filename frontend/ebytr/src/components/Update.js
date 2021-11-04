import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';
import Header from './Header'

const Update = ({ location }) => {
  const [ task, setTask ] = React.useState({ taskTitle: '',  taskDescription: '' });
  const [ error, setError ] = React.useState(false);
  const [ redirect, setRedirect ] = React.useState(false);
  const [ status, setStatus ] = React.useState({ status: 'Em andamento' });

  React.useEffect(() => {
    setTask({ taskTitle: location.state.taskTitle, taskDescription: location.state.taskDescription});
  }, [location.state])


  function handleChange({ target }) {
    const { name, value } = target;
    setTask({ ...task, [name]: value})
  }

  async function handleSubmit (event) {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/task/${location.state.id}`, { task, status }, { headers: { Authorization: localStorage.getItem('token') }} );
      setRedirect(true)
    } catch (error) {
      console.log(error.response)
      setError(error.response.data.message)
    }
  }

  return (
    <div>
      <Header />
      <div>
        <h2>Update Task</h2>
        <div>
          { error && <p className="error">{ error }</p>}
          <form>
              <input type="text" placeholder="Digite o título" onChange={ handleChange } name='taskTitle' value={ task.taskTitle } />
              <input type="text" placeholder="Digite a descrição" onChange={ handleChange } name='taskDescription' value={ task.taskDescription } />
              <div>
              <label htmlFor="current">
                <input id="current" type="radio" name="status" value="Em andamento" onChange={ ({ target }) => setStatus(target.value) } />EM ANDAMENTO
              </label>
              <label htmlFor="pendent">
                <input id="pendent"type="radio" name="status" value="Pendente" onChange={ ({ target }) => setStatus(target.value) } />PENDENTE
              </label>
              <label htmlFor="done">
                <input id="done" type="radio" name="status" value="Concluído" onChange={ ({ target }) => setStatus(target.value) }/>CONCLUIDO
              </label>
            </div>
              <button className="updateButton" type='submit' onClick={handleSubmit}>Update</button>
          </form>
        </div>
        <div className="container">
          <p>{location.state.taskTitle}</p> 
          <p>{location.state.taskDescription}</p> 
          <p>{format(
              Date.parse(location.state.createdAt),
              "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
              { locale: pt },
            )}</p>
        </div>
        {redirect && <Redirect to="/task" /> }
      </div>
    </div>
  )
}

export default Update;