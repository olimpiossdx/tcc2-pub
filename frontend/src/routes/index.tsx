import React from 'react'
import { Switch } from 'react-router-dom';

import Cadastro from '../pages/cadastro';
import LaboratoriosAgendados from '../pages/laboratorio-agendados';
import LaboratorioDisponiveis from '../pages/laboratorio-disponiveis';
import Login from '../pages/login';
import Menu from '../pages/menu';
import MeuPerfil from '../pages/meu-perfil';
import NovoAgendamento from '../pages/novo-agendamento';
import PrivateRoute from './private-route';
import NotFound from '../pages/404-not-found';

const Routes: React.FC = () => {
  return (<Switch>
    <PrivateRoute path='/' exact component={Login} />
    <PrivateRoute path='/cadastro' component={Cadastro} />
    <PrivateRoute path='/menu' component={Menu} isPrivate />

    <PrivateRoute isPrivate path='/novo-agendamento' component={NovoAgendamento} />
    <PrivateRoute isPrivate path='/laboratorios-agendados' component={LaboratoriosAgendados} />
    <PrivateRoute isPrivate path='/laboratorios-disponiveis' component={LaboratorioDisponiveis} />
    <PrivateRoute isPrivate path='/meu-perfil' component={MeuPerfil} />
    <PrivateRoute component={NotFound} />
  </Switch>);
}

export default Routes
