import Routes from './routes';

import './globalStyles.css';
import { ThemeProvider } from '@material-ui/core';
import DefaulTheme from './components/theme';

const App: React.FC = () =>
(<ThemeProvider theme={DefaulTheme}>
  <Routes />
</ThemeProvider>);

export default App;
