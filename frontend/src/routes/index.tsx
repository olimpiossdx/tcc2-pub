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


const Routes: React.FC = () => {
  return (<BrowserRouter>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/cadastro' component={Cadastro} />

      <Main>
        <Route path='/menu' component={Menu} />
        <Route path='/novo-agendamento' component={NovoAgendamento} />
        <Route path='/laboratorio-agendados' component={LaboratoriosAgendados} />
        <Route path='/laboratorio-disponiveis' component={LaboratorioDisponiveis} />
        <Route path='/meu-perfil' component={MeuPerfil} />
      </Main>

    </Switch>
  </BrowserRouter>);
}

export default Routes
