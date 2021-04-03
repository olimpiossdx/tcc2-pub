import React from 'react';

import { Grid, Paper, Typography, Button, TextField, Avatar, CircularProgress } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Main from '../../components/main';
import { useAuth } from '../../components/hooks/authentication';
import useStyles from './styes';
import MeuPerfilAnimatedLoading from '../../components/skeleton/meu-perfil';

const MeuPefil: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState(true);

  //TODO: integrar com api para edição
  const handleSubmit = () => {
    setLoading(true);
  };

  const hanldeCancel = () => setDisabled(!disabled);

  React.useEffect(() => {
    new Promise((resolve) => {
      resolve(window.setTimeout(() => {
        setLoadingData(false);
      }, 800));
    });
  }, []);

  return (<Main>
    <Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
      {loadingData ? <MeuPerfilAnimatedLoading /> : <Grid item xs={11} sm={10} md={6}>
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
              disabled={loading} />
          </Grid>

          <Grid item xs={12}>
            {disabled ?
              (<Grid container justifyContent='flex-end'>
                <Grid item>
                  <Button variant='outlined' onClick={hanldeCancel}>Editar</Button>
                </Grid>
              </Grid>) :
              (<Grid container justifyContent='flex-end' spacing={1}>
                <Grid item>
                  <Button variant='outlined' color='secondary' onClick={hanldeCancel} >Cancelar</Button>
                </Grid>
                <Grid item className={classes.wrapper}>
                  <Button variant='outlined' color='primary' disabled={loading} onClick={handleSubmit}>salvar</Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Grid>
              </Grid>)}
          </Grid>
        </Grid>
      </Grid>}


    </Grid>
  </Main>)
}

export default MeuPefil;
