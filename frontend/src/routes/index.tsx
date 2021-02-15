import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cadastro from '../pages/cadastro';
import Login from '../pages/login';


const Routes: React.FC = () => {
  return (<BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/cadastro' exact component={Cadastro} />
    </Switch>
  </BrowserRouter>)
}

export default Routes
