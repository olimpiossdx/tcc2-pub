import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../components/main';
import Cadastro from '../pages/cadastro';
import Login from '../pages/login';
import Menu from '../pages/menu';


const Routes: React.FC = () => {
  return (<BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/cadastro' exact component={Cadastro} />

      <Main>
        <Route path='/menu' exact component={Menu} />
      </Main>

    </Switch>
  </BrowserRouter>);
}

export default Routes
