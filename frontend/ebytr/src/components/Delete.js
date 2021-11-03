import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { pt } from 'date-fns/locale';
import { format } from 'date-fns';

const Delete = ({ location }) => {

  console.log(location.state.createdAt)

  const [ error, setError ] = React.useState(false);
  const [ redirect, setRedirect ] = React.useState(false)

  async function handleSubmit (event) {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/task/${location.state.id}`, { headers: { Authorization: localStorage.getItem('token') } });
      setRedirect(true)
    } catch (error) {
      console.log(error.response.data.message)
      console.log(error.response.data.message)
      setError(error.response.data.message)
    }
  }

  return (
    <div>
      <h2>Delete Task</h2>
      <div>
      { error && <p>{ error }</p>}
      <p>{location.state.taskTitle}</p> 
        <p>{location.state.taskDescription}</p> 
        <p>{format(
            Date.parse(location.state.createdAt),
            "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
            { locale: pt },
          )}</p>
      </div>
      <div>
        <h4>You sure to delete this task?</h4>
        <Link to="/task"><button onClick={ handleSubmit }>Im Sure, delete please</button></Link>
        <Link to="/task"><button>Im not sure, please go back</button></Link>
      </div>
      {redirect && <Redirect to="/task" /> }
    </div>
  )
}

export default Delete;
