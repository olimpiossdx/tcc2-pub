import React from 'react';

import { Grid, Paper, Typography, Button, TextField, Avatar, CircularProgress, Divider } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { ApiServiceRequestAsync } from '../../services';

import { useAuth } from '../../components/hooks/authentication';
import Main from '../../components/main';
import MeuPerfilAnimatedLoading from '../../components/skeleton/meu-perfil';
import useStyles from './styes';
import { useNotifcation } from '../../components/hooks/notification';

const MeuPefil: React.FC = () => {
  const classes = useStyles();
  const { user, updateAccesskey } = useAuth();
  const { addNotification } = useNotifcation();
  const accessKeyRef = React.useRef<string>(user.accessKey);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve) => {
      resolve(window.setTimeout(() => {
        setLoadingData(false);
      }, 150));
    });
  }, []);

  const hanldeCancel = () => setDisabled(!disabled);

  const handleSubmitAsync = async () => {
    const response = await ApiServiceRequestAsync({ method: 'patch', url: 'usuarios/chave-acesso', data: { id: user.uid, accessKey: accessKeyRef.current } }, setLoading, addNotification);

    if (!('status' in response)) {
      updateAccesskey(accessKeyRef.current);
    };

    setLoading(false);
    hanldeCancel();
  };

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    accessKeyRef.current = event.target.value;
  };


  return (<Main>
    <Grid container justifyContent='center' alignItems='center'>
      {loadingData ? <MeuPerfilAnimatedLoading /> : <Grid item xs={11} sm={10} md={6} component={Paper}>
        <Grid container spacing={2} alignItems='center' style={{ height: '100%', padding: '2%' }} >
          <Grid item>
            {user.photoURL ? <Avatar alt={user.displayName} src={user.photoURL} /> : <AccountCircleIcon />}
          </Grid>
          <Grid item >
            <Typography align='left'>
              Meu perfil
           </Typography>
          </Grid>
        </Grid>
        <Grid container style={{ height: '100%', padding: '2% 0 2%' }} >
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems='center' style={{ height: '100%', padding: '2%' }} >
          <Grid item xs={12}>
            <TextField
              id='filled-nome'
              label='Nome'
              value={user.displayName}
              variant='outlined'
              fullWidth
              disabled />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='filled-email'
              label='E-mail'
              value={user.email}
              variant='outlined'
              fullWidth
              disabled />
          </Grid>
          {/* TODO: alterar para valor de código de acesso */}
          <Grid item xs={12}>
            <TextField
              id='filled-chave-de-acesso'
              label='Chave de acesso'
              defaultValue={user.accessKey}
              variant='outlined'
              onChange={handelChange}
              fullWidth
              disabled={disabled || loading} />
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
                  <Button variant='outlined' color='primary' disabled={loading} onClick={handleSubmitAsync}>salvar</Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </Grid>
              </Grid>)}
          </Grid>
        </Grid>
      </Grid>}
    </Grid>
  </Main >);
};

export default MeuPefil;
