import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../components/main';
import Cadastro from '../pages/cadastro';
import LaboratoriosAgendados from '../pages/laboratorio-agendados';
import LaboratorioDisponiveis from '../pages/laboratorio-disponiveis';
import Login from '../pages/login';
import Menu from '../pages/menu';
import MeuPerfil from '../pages/meu-perfil';
import NovoAgendamento from '../pages/novo-agendamento';
import PrivateRoute from './private-route';


const Routes: React.FC = () => {
  return (<BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/cadastro' component={Cadastro} />

      <Main>
        <PrivateRoute isPrivate path='/menu' component={Menu} />
        <PrivateRoute isPrivate path='/novo-agendamento' component={NovoAgendamento} />
        <PrivateRoute isPrivate path='/laboratorios-agendados' component={LaboratoriosAgendados} />
        <PrivateRoute isPrivate path='/laboratorios-disponiveis' component={LaboratorioDisponiveis} />
        <PrivateRoute isPrivate path='/meu-perfil' component={MeuPerfil} />
      </Main>
      <Route component={() => (<h5>Pagina não encontrada</h5>)} />
    </Switch>
  </BrowserRouter>);
}

export default Routes
