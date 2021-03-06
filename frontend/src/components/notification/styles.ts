import { makeStyles, Theme } from "@material-ui/core";

const UseStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': { marginTop: theme.spacing(2) }
  }
}));

export default UseStyles;