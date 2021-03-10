import React, { useState } from 'react';

import { Grid, Paper, Typography, Button, TextField } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

const MeuPefil: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 12.5vh)' }}>
    <Grid item xs={11} sm={10} md={6}>
      <Grid component={Paper} container spacing={2} alignItems='center' style={{ height: '100%', padding: '2%' }} >
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
            id='filled-nome'
            label='Nome'
            defaultValue='Teste teste teste'
            variant='outlined'
            fullWidth
            disabled />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id='filled-email'
            label='E-mail'
            defaultValue='teste@example.com.br'
            variant='outlined'
            fullWidth
            disabled />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id='filled-chave-de-acesso'
            label='Chave de acesso'
            defaultValue='76 3B 39 07'
            variant='outlined'
            fullWidth
            disabled={disabled} />
        </Grid>

        <Grid item xs={12}>
          {disabled ?
            (<Grid container justifyContent='flex-end'>
              <Grid item>
                <Button variant='outlined' onClick={() => setDisabled(false)}>Editar</Button>
              </Grid>
            </Grid>) :
            (<Grid container justifyContent='flex-end' spacing={1}>
              <Grid item>
                <Button variant='outlined' color='secondary' onClick={() => setDisabled(true)} >Cancelar</Button>
              </Grid>
              <Grid item>
                <Button variant='outlined' color='primary' >salvar</Button>
              </Grid>
            </Grid>)}
        </Grid>
      </Grid>
    </Grid>
  </Grid>)
}

export default MeuPefil;
