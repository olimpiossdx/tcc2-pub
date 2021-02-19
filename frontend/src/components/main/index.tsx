import React from 'react';
import Content from '../content';
import Header from '../header';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import CalendarToday from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface IMainProps {
  isBottomNavigation?: boolean;
}

const Main: React.FC<IMainProps> = ({ children, isBottomNavigation = true }) => {
  const [value, setValue] = React.useState('NovoAgendamento');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (<>
    <Header />
    <Content>
      {children}
      {isBottomNavigation ? (
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction label="Novo agendamento" value="NovoAgendamento" icon={<InsertDriveFile />} />
          <BottomNavigationAction label="Laboratórios agendados" value="laboratoriosAgendados" icon={<InsertInvitation />} />
          <BottomNavigationAction label="Laboratórios disponíveis" value="laboratoriosDisponíveis" icon={<CalendarToday />} />
          <BottomNavigationAction label="Sair" value="sair" icon={<ExitToAppIcon />} />
        </BottomNavigation>
      ) : (null)}

    </Content>
  </>)
}

export default Main;
