import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <h1>Ebytr - App Tasks</h1>      
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/task">
          <Tasks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
