import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h1>Ebytr - App Tasks</h1>      
      <Switch>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
