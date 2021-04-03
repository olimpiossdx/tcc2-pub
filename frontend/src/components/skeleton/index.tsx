import { Grid, Paper, Typography, Skeleton } from '@material-ui/core';

const NovoAgendamentoAnimatedLoading = () => (<Grid container justifyContent='center' alignItems='center' style={{ height: 'calc(100vh - 120px)', minHeight: 350 }}>
  <Grid item xs={11} sm={10} md={7} lg={4}>
    <Paper style={{ padding: 10 }}>
      <Grid container spacing={2} alignItems='center' style={{ height: '100%' }}>
        <Grid item>
          <Skeleton width={30} height={30} />
        </Grid>
        <Grid item>
          <Typography align='left'>
            <Skeleton width={124} height={24} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Skeleton animation="wave" height={56} style={{ marginBottom: 6 }} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={56} />
        </Grid>
        <Grid item xs={12} sm>
          <Skeleton height={56} />
        </Grid>
        <Grid item xs={12} sm>
          <Skeleton height={56} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Skeleton width={101} height={40} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
</Grid>);


export default NovoAgendamentoAnimatedLoading;
