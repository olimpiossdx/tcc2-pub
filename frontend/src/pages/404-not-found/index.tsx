import { Paper, Grid, Typography, Button } from '@material-ui/core';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Link } from 'react-router-dom';

import { ReactComponent as NotFoundIcon } from '../../assets/notfound.svg';

const NotFound = () => {
  return (<Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }} spacing={1}>
    <Grid item xs={11} sm={11} md={5} lg={7} component={Paper} style={{ maxWidth: 753 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item sm={4}>
          <NotFoundIcon />
        </Grid>
        <Grid item sm >
          <Grid container alignItems='center' justifyContent='center'>
            <Grid item xs={11}>
              <Typography variant='h1' style={{ color: '#962038', textShadow: '1px solid rgba(51, 52, 53, .87)' }}>
                404
              </Typography>
            </Grid>
            <Grid item xs={11} >
              <Typography variant='body1'>
                Parece que você está perdido
              </Typography>
              <Typography variant='subtitle1' style={{ color: '#ABB1BF' }}>
                A página que esta procurando não está disponível !
              </Typography>
            </Grid>
            <Grid item xs={11} >
              <Button endIcon={<ArrowRightAltIcon />} component={Link} to='/'>
                <Typography variant='body1'>
                  Voltar para login
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid >);
};

export default NotFound;
