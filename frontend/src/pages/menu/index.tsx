import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Paper, Typography } from '@material-ui/core';

import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AccountCircle from '@material-ui/icons/AccountCircle';

const Menu: React.FC = () => {
  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 64px)' }}>
    <Grid item xs={11}>
      <Grid container spacing={1} justifyContent='center' style={{ height: '100%' }}>
        <Grid item xs={12} sm={6} md={5}>
          <Link to='novo-agendamento'>
            <Paper style={{ height: 60, padding: 10 }}>
              <Grid container spacing={1} alignItems='center' style={{ height: '100%' }}>
                <Grid item>
                  <InsertDriveFile />
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
                  <InsertInvitation />
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
                  <CalendarToday />
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
                  <AccountCircle />
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
  </Grid>);
}

export default Menu;
