import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Paper, Typography } from '@material-ui/core';

import EventNoteIcon from '@material-ui/icons/EventNote';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Main from '../../components/main';

const Menu: React.FC = () => {
  return (<Main>
    <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
      <Grid item xs={11}>
        <Grid container justifyContent='center' spacing={2}>
          <Grid item xs={12} sm={6} md={5} component={Link} to='novo-agendamento'>
            <Grid container spacing={1} alignItems='center' component={Paper} style={{ height: 80 }}>
              <Grid item>
                <EventNoteIcon />
              </Grid>
              <Grid item >
                <Typography align='left'>
                  Novo agendamento
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={5} component={Link} to='laboratorios-agendados'>
            <Grid container spacing={1} alignItems='center' component={Paper} style={{ height: 80 }}>
              <Grid item>
                <InsertInvitationIcon />
              </Grid>
              <Grid item >
                <Typography align='left'>
                  Laboratórios agendados
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={5} component={Link} to='laboratorios-disponiveis'>
            <Grid container spacing={1} alignItems='center' component={Paper} style={{ height: 80 }}>
              <Grid item>
                <CalendarTodayIcon />
              </Grid>
              <Grid item >
                <Typography align='left'>
                  Laboratórios disponíveis
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={5} component={Link} to='meu-perfil'>
            <Grid container spacing={1} alignItems='center' component={Paper} style={{ height: 80 }} >
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid item >
                <Typography align='left'>
                  Meu perfil
                </Typography>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid >
  </Main >);
};

export default Menu;
