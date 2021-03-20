import { AlertProps } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant='filled' {...props} />;

export default Alert;
