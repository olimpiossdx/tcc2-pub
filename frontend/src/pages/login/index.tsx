import React from 'react';

import { Button, Grid, Paper } from '@material-ui/core';

import LoginIMG from '../../assets/ufop2.png';
import { useAuth } from '../../components/hooks/authentication';
import { useHistory } from 'react-router';


const Login: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    await signIn().then(() => {
      history.push('/menu');
    });
  }

  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 12.5vh)' }}>
    <Paper component={Grid} style={{ padding: 10, margin: 5 }}>
      <Grid item xs={12}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item >
            <img src={LoginIMG} alt='logo ufop' title='logo ufop' />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button variant='contained' onClick={handleSubmit}>inciar com google</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Grid>)
}

export default Login;
