import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';

const Tasks = () => {
  const [ isLocal, setLocal ] = React.useState(false);
  const [ error, setError ] = React.useState(false)
  const [ task, setTask ] = React.useState({ taskTitle: '',  taskDescription: '' })
  const [ allTask, setAllTasks ] = React.useState([]);

  React.useEffect(()=> {
    if (!localStorage.getItem('token')) {
      setLocal(true);
    }    
  }, []);

  React.useEffect(() => {
    async function getAllTasks() {
      try {
        const getAllTask = await axios.get('http://localhost:5000/task', { headers: { Authorization: localStorage.getItem('token') } })
        return getAllTask;
        
      } catch (error) {
        setError(error.response.data.message)
      }
    }
    getAllTasks().then(res => setAllTasks(res.data));
  }, [task])

  function handleChange({ target }) {
    const { name, value } = target;
    setTask({ ...task, [name]: value })
  }

  async function handleSubmit (event) {
    event.preventDefault();
    try {
      const taskCreated = await axios.post('http://localhost:5000/task', task, { headers: { Authorization: localStorage.getItem('token') } });
      setTask({ taskTitle: '',  taskDescription: '' })
      setError(false);
      return taskCreated.data
    } catch (error) {
      console.log(error.response.data.message)
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
          { allTask && allTask.map(({_id: id, taskTitle, taskDescription, createdAt}, index) => (
            <div key={index}>           
              
              <p>{taskTitle}</p> 
              <p>{taskDescription}</p> 
              <p>{format(
                  Date.parse(createdAt),
                  "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                  { locale: pt },
                )}</p>
              <Link to={ {
                pathname: '/task/update',
                state: { id, taskTitle, taskDescription, createdAt },
              } }
              >
                <button>Update</button>
              </Link>
              <Link to={ {
                pathname: '/task/delete',
                state: { id, taskTitle, taskDescription, createdAt },
              } }
              > 
                <button>Delete</button>
              </Link>
            </div>  
          )) }
        </div>
      </div>
      
    </div>
  )

}

export default Tasks;
