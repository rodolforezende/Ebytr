import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Update from './components/Update'
import Delete from './components/Delete';
import Register from './components/Register';

function App() {

  return (
    <div >
      <Switch>      
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/task">
          <Tasks />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route path="/task/update" render={ (props) => <Update {...props } /> } />
        <Route path="/task/delete" render={ (props) => <Delete {...props } /> } />
      </Switch>
      
    </div>
  );
}

export default App;
