import React from 'react';
import { AlertProps, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import INotification from './model';
import useStyles from './styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface IProps {
  notificaion: INotification;
  setNotification: (notification: INotification) => void;
}

const Notification: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (<div className={classes.root}>
    <Button variant="outlined" onClick={handleClick}>
      Open success snackbar
    </Button>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        This is a success message!
      </Alert>
    </Snackbar>
  </div>)
}

export default Notification;