import React from 'react';

import { Grid, Paper, Typography, Button, TextField } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

const MeuPefil: React.FC = () => {

  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 64px)' }}>
    <Grid item xs={11} sm={10} md={6}>
      <Paper style={{ padding: 10 }}>
        <Grid container spacing={2} alignItems='center' style={{ height: '100%' }} >
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item >
            <Typography align='left'>
              Meu perfil
           </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="filled-disabled"
              label="Nome"
              defaultValue="Teste teste teste"
              variant="outlined"
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="filled-disabled"
              label="E-mail"
              defaultValue="teste@example.com.br"
              variant="outlined"
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="filled-disabled"
              label="Chave de acesso"
              defaultValue="76 3B 39 07"
              variant="outlined"
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button variant='outlined'>Agendar</Button>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>)
}

export default MeuPefil;
