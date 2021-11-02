import React from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'

const Tasks = () => {
  const [ isLocal, setLocal ] = React.useState(false);
  const [ error, setError ] = React.useState(false)
  const [ task, setTask ] = React.useState({ taskTitle: '',  taskDescription: '' })

  React.useEffect(()=> {
    if (!localStorage.getItem('token')) {
      setLocal(true);
    }    
  }, [])

  function handleChange({ target }) {
    const { name, value } = target;
    setTask({ ...task, [name]: value })
  }

  async function handleSubmit (event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/task', task);
      setTask({ taskTitle: '',  taskDescription: '' })     
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (    
    <div>
      { isLocal && <Redirect to='/' /> }
      <h1>Tasks</h1>
      <div>
        { error && <p>{ error }</p>}
        <form>
          <input type="text" placeholder="Digite o título" onChange={ handleChange } name='taskTitle' value={ task.taskTitle } />
          <input type="text" placeholder="Digite a descrição" onChange={ handleChange } name='taskDescription' value={ task.taskDescription } />
          <button type='submit' onClick={ handleSubmit }>Create</button>
        </form>
        <div>
          <h2>All tasks</h2>
        </div>
      </div>
      
    </div>
  )

}

export default Tasks;
