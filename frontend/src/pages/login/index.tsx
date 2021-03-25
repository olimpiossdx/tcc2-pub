import React from 'react';

import { Button, Grid, Paper } from '@material-ui/core';
import LoginIMG from '../../assets/ufop2.png';
import { useHistory } from 'react-router';
import firebase from '../../config/firebase';

const Login: React.FC = () => {
  const history = useHistory();
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
                {/* TODO: alterar para rota  */}
                <Button variant='contained' onClick={() => {
                  const provider = new firebase.auth.GoogleAuthProvider();
                  firebase.auth().signInWithPopup(provider).then(response => {
                    console.log('response', response);
                  });

                }}>inciar com google</Button>
                {/* <Button variant='contained' onClick={() => history.push('/menu')}>inciar com google</Button> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Grid>)
}

export default Login;
