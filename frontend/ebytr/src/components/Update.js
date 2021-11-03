import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';

const Update = ({ location }) => {
  const [ task, setTask ] = React.useState({ taskTitle: '',  taskDescription: '' });
  const [ error, setError ] = React.useState(false);
  const [ redirect, setRedirect ] = React.useState(false)

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
      await axios.put(`http://localhost:5000/task/${location.state.id}`, task, { headers: { Authorization: localStorage.getItem('token') }} );
      setRedirect(true)
    } catch (error) {
      console.log(error.response)
      setError(error.response.data.message)
    }
  }

  return (
    <div>
      <h2>Update Task</h2>
      <div>
        { error && <p>{ error }</p>}
        <form>
            <input type="text" placeholder="Digite o título" onChange={ handleChange } name='taskTitle' value={ task.taskTitle } />
            <input type="text" placeholder="Digite a descrição" onChange={ handleChange } name='taskDescription' value={ task.taskDescription } />
            <button type='submit' onClick={handleSubmit}>Update</button>
        </form>
      </div>
      <div>
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
  )
}

export default Update;