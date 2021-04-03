import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '61%',
      left: '54%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export default useStyles;