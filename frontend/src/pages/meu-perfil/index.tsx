import React, { useState } from 'react';

import { Grid, Paper, Typography, Button, TextField, Avatar } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Main from '../../components/main';
import { useAuth } from '../../components/hooks/authentication';

const MeuPefil: React.FC = () => {
  const { user } = useAuth();
  const [disabled, setDisabled] = useState(true);

  return (<Main>
    <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
      <Grid item xs={11} sm={10} md={6}>
        <Grid component={Paper} container spacing={2} alignItems='center' style={{ height: '100%', padding: '2%' }} >
          <Grid item>
            {user.profile.picture ? <Avatar alt={user.profile.name} src={user.profile.picture} /> : <AccountCircleIcon />}
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
              value={user.profile.name}
              variant='outlined'
              fullWidth
              disabled />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='filled-email'
              label='E-mail'
              value={user.profile.email}
              variant='outlined'
              fullWidth
              disabled />
          </Grid>
          {/* TODO: alterar para valor de código de acesso */}
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
    </Grid>
  </Main>)
}

export default MeuPefil;
