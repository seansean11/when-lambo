import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Container>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="dashboard"/>
        </Switch>
      </div>
    </Container>
  </BrowserRouter>
);

export default App;
