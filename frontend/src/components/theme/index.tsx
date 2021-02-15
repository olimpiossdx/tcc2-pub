import { createMuiTheme } from '@material-ui/core/styles';

const DefaulTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ab4c5f',
      main: '#962038',
      dark: '#691627',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default DefaulTheme;