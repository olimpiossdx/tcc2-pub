import React, { useState } from 'react';
import Content from '../content';
import Header from '../header';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

const Main: React.FC = ({ children }) => {
  const { location, push } = useHistory();

  const [value, setValue] = useState(location.pathname.substr(1));
  const isBottomNavigation = !!value;

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    push(newValue);
  };

  return (<>
    <Header />
    <Content>
      {children}
      {isBottomNavigation ? (<BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction label="Novo agendamento" value="novo-agendamento" icon={<InsertDriveFile />} />
        <BottomNavigationAction label="Laboratórios agendados" value="laboratorios-agendados" icon={<InsertInvitation />} />
        <BottomNavigationAction label="Laboratórios disponíveis" value="laboratorios-disponiveis" icon={<CalendarToday />} />
        <BottomNavigationAction label="Sair" value="/" icon={<ExitToAppIcon />} />
      </BottomNavigation>) : (null)}
    </Content>
  </>)
}

export default Main;
