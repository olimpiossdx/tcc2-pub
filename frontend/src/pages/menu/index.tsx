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
        <Grid container spacing={1} justifyContent='center' style={{ height: '100%' }}>
          <Grid item xs={12} sm={6} md={5}>
            <Link to='novo-agendamento'>
              <Paper style={{ height: 60, padding: 10 }}>
                <Grid container spacing={1} alignItems='center' style={{ height: '100%' }}>
                  <Grid item>
                    <EventNoteIcon />
                  </Grid>
                  <Grid item >
                    <Typography align='left'>
                      Novo agendamento
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Link to='laboratorios-agendados'>
              <Paper style={{ height: 60, padding: 10 }}>
                <Grid container spacing={1} alignItems='center' style={{ height: '100%' }}>
                  <Grid item>
                    <InsertInvitationIcon />
                  </Grid>
                  <Grid item >
                    <Typography align='left'>
                      Laboratórios agendados
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Link to='laboratorios-disponiveis'>
              <Paper style={{ height: 60, padding: 10 }}>
                <Grid container spacing={1} alignItems='center' style={{ height: '100%' }}>
                  <Grid item>
                    <CalendarTodayIcon />
                  </Grid>
                  <Grid item >
                    <Typography align='left'>
                      Laboratórios disponíveis
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Link to='meu-perfil'>
              <Paper style={{ height: 60, padding: 10 }}>
                <Grid container spacing={1} alignItems='center' style={{ height: '100%' }}>
                  <Grid item>
                    <AccountCircleIcon />
                  </Grid>
                  <Grid item >
                    <Typography align='left'>
                      Meu perfil
                  </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  </Main>);
};

export default Menu;
