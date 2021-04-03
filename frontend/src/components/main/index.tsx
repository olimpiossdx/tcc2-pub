import React from 'react';
import Header from '../header';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import EventNoteIcon from '@material-ui/icons/EventNote';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/authentication';

const Main: React.FC = ({ children }) => {
  const { location, push } = useHistory();
  const { signOut } = useAuth();

  const [value, setValue] = React.useState(location.pathname.substr(1));
  const isBottomNavigation = value !== 'menu';

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    push(newValue);
  };

  return (<>
    <Header />
    {children}
    {isBottomNavigation ? (<BottomNavigation showLabels value={value} onChange={handleChange}>
      <BottomNavigationAction label="Novo agendamento" value="novo-agendamento" icon={<EventNoteIcon />} />
      <BottomNavigationAction label="Laboratórios agendados" value="laboratorios-agendados" icon={<InsertInvitation />} />
      <BottomNavigationAction label="Laboratórios disponíveis" value="laboratorios-disponiveis" icon={<CalendarToday />} />
      <BottomNavigationAction label="Sair" value="/" icon={<ExitToAppIcon />} onClick={signOut} />
    </BottomNavigation>) : (null)}
  </>)
}

export default Main;
