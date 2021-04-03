import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogoIMG from '../../assets/ufop4.png';
import { useAuth } from '../hooks/authentication';

const Header: React.FC = () => {
  const { user } = useAuth();
  return (<AppBar position='static' >
    <Toolbar>
      <img alt='logo da UFOP' title='Universidadade Ferderal do Outro Preto' height='56' src={LogoIMG} />
      <Typography variant='h6' color='inherit' component='div' noWrap style={{ flexGrow: 1, marginLeft: 5 }}>
        Universidade Federal Do Ouro Preto
        </Typography>
      <Link to='/meu-perfil'>
        <IconButton edge='end' color='inherit' aria-label='menu'>
          {user.profile.picture ? <Avatar alt={user.profile.name} src={user.profile.picture} /> : <AccountCircleIcon />}
        </IconButton>
      </Link>
    </Toolbar>
  </AppBar>);
}

export default Header;
