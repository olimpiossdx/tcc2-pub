import React from 'react';

import { Button, Grid, Paper } from '@material-ui/core';
import LoginIMG from '../../assets/ufop2.png';

const Login: React.FC = () => {
  return (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 64px)' }}>
    <Grid item xs={11}>
      <Grid container spacing={1} justifyContent='center' alignItems='center' style={{ height: '100%' }}>
        <Paper>
          <Grid item xs={11} sm={10} md={3}>
            <Grid container spacing={1} alignItems='center'>
              <Grid item xs={12} >
                <img src={LoginIMG} alt='imagem de login' title='imagem de login' />
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Button variant='contained'>inicie com Google</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

    </Grid>
  </Grid>)
}

export default Login;
