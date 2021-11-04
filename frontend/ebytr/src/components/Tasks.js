import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';
import Header from './Header';

const Tasks = () => {
  const [ isLocal, setLocal ] = React.useState(false);
  const [ error, setError ] = React.useState(false)
  const [ task, setTask ] = React.useState({ taskTitle: '',  taskDescription: '' })
  const [ allTask, setAllTasks ] = React.useState([]);
  const [ sortByTitle, setSortByTitle ] = React.useState(false)

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
      setError(error.response.data.message)
    }
  }

  function alphabeticalOrder () {
    const test = allTask.sort((a,b) => (a.taskTitle > b.taskTitle) ? 1 : ((b.taskTitle > a.taskTitle) ? -1 : 0));
    console.log(test)
    setAllTasks(test)
  }

  function descriptionOrder () {
    const test = allTask.sort((a,b) => (a.taskDescription > b.taskDescription) ? 1 : ((b.taskDescription > a.taskDescription) ? -1 : 0));
    console.log(test)
    setAllTasks(test)
  }

  function createAtOrder () {
    const test = allTask.sort((a,b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
    console.log(test)
    setAllTasks(test)
  }


  return (   
    <div>
      <Header />
      <div>
        { isLocal && <Redirect to='/' /> }
        <h1>Tasks</h1>
        <div>
          { error && <p className="error">{ error }</p>}
          
          <form>
            <input type="text" placeholder="Digite o título" onChange={ handleChange } name='taskTitle' value={ task.taskTitle } />
            <input type="text" placeholder="Digite a descrição" onChange={ handleChange } name='taskDescription' value={ task.taskDescription } />
            <button className="taskButton" type='submit' onClick={ handleSubmit }>Create</button>
          </form>
          <div>
            <h2>All tasks</h2>
            <div>
            <button onClick={ () => {
              alphabeticalOrder();
              setSortByTitle(!sortByTitle) 
            }
              } >alphabeticalOrder</button>
            <button onClick={ () => {
              createAtOrder();
              setSortByTitle(!sortByTitle) 
            } }
            >createAtOrder</button>
            <button onClick={ () => {
              descriptionOrder();
              setSortByTitle(!sortByTitle) 
            } }
            >descriptionOrder</button>
          </div>
            { allTask && allTask.map(({_id: id, taskTitle, taskDescription, createdAt}, index) => (
              <div className="container"key={index}>           
                
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
                  <button className="updateButton">Update</button>
                </Link>
                <Link to={ {
                  pathname: '/task/delete',
                  state: { id, taskTitle, taskDescription, createdAt },
                } }
                > 
                  <button className="deleteButton">Delete</button>
                </Link>
              </div>  
            )) }
          </div>
        </div>
        
      </div>
    </div> 
  )

}

export default Tasks;
