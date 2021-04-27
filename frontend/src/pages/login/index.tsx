import React, { useState } from 'react';

import { Button, Grid, LinearProgress, Paper } from '@material-ui/core';

import LoginIMG from '../../assets/ufop2.png';
import { useAuth } from '../../components/hooks/authentication';
import { useNotifcation } from '../../components/hooks/notification';

const Login: React.FC = () => {
  const { addNotification } = useNotifcation();
  const { signInAsync } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmitAsync = async () => {
    setLoading(true);
    await signInAsync(addNotification).finally(() => {
      setLoading(false);
    });
  };

  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 13vh)' }}>
    <Paper component={Grid} style={{ padding: 10, margin: 5 }}>
      <Grid item xs={12} style={{ marginBottom: 10 }}>
        {loading && <LinearProgress />}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item >
            <img src={LoginIMG} alt='logo ufop' title='logo ufop' />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button variant='contained' onClick={handleSubmitAsync} disabled={loading}>iniciar com google</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Grid>);
};

export default Login;
