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
      { error && <p className="error">{ error }</p>}
      <div className="container">
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
        <Link to="/task"><button className="deleteButton" onClick={ handleSubmit }>Im Sure, delete please</button></Link>
        <Link to="/task"><button >Im not sure, please go back</button></Link>
      </div>
      {redirect && <Redirect to="/task" /> }
    </div>
  )
}

export default Delete;
