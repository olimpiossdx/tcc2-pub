import React, { useState } from 'react';

import { Button, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';

import { ReactComponent as LoginIcon } from '../../assets/logo1.svg';
import { useAuth } from '../../components/hooks/authentication';
import { useNotifcation } from '../../components/hooks/notification';

const Login: React.FC = () => {
  const { addNotification } = useNotifcation();
  const { signInAsync } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmitAsync = async () => {
    setLoading(true);
    await signInAsync(addNotification);
    setLoading(false);
  };

  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
    <Paper component={Grid} style={{ minWidth: 350, padding: 10 }}>
      <Grid item xs={12} style={{ marginBottom: 10 }}>
        {loading && <LinearProgress />}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='center' alignItems='center' spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h6' color='textSecondary'>
              Inicie com Google
            </Typography>
          </Grid>
          <Grid item style={{ minHeight: 200 }}>
            <LoginIcon />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button variant='outlined' onClick={handleSubmitAsync} disabled={loading}>Logar</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Grid>);
};

export default Login;
