import { Grid, Paper, Typography, Skeleton } from '@material-ui/core';

const MeuPerfilAnimatedLoading = () =>
(<Grid item xs={11} sm={10} md={6}>
  <Grid component={Paper} container spacing={2} alignItems='center' style={{ height: '100%', padding: '2%' }} >
    <Grid item>
      <Skeleton variant='circular' width={40} height={40} />
    </Grid>
    <Grid item >
      <Typography align='left'>
        <Skeleton variant='text' width={73} height={34} />
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Skeleton variant='rectangular' height={56} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton variant='rectangular' height={56} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton variant='rectangular' height={56} />
    </Grid>
    <Grid item xs={12}>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Skeleton variant='rectangular' width={85} height={37} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>);

export default MeuPerfilAnimatedLoading
