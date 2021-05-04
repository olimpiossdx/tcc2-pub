import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ReactComponent as LogoIcon } from '../../assets/logoContent.svg';
import { useAuth } from '../hooks/authentication';

const Header: React.FC = () => {
  const { user } = useAuth();
  return (<AppBar position='static' >
    <Toolbar>
      <LogoIcon />
      <Typography variant='h6' color='inherit' component='div' noWrap style={{ flexGrow: 1, marginLeft: 5 }}>
        Universidade Federal Do Ouro Preto
        </Typography>
      <Link to='/meu-perfil'>
        <IconButton edge='end' color='inherit' aria-label='menu'>
          {user.photoURL ? <Avatar alt={user.displayName} src={user.photoURL} /> : <AccountCircleIcon />}
        </IconButton>
      </Link>
    </Toolbar>
  </AppBar>);
}

export default Header;
