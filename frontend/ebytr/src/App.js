import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h1>Ebytr - App Tasks</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
