import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LogoIMG from '../../assets/ufop4.png';

const Header: React.FC = () => {
  return (<AppBar position='static' >
    <Toolbar>
      <img alt='logo da UFOP' title='Universidadade Ferderal do Outro Preto' height='56' src={LogoIMG} />
      <Typography variant='h6' color='inherit' component='div' noWrap style={{ flexGrow: 1, marginLeft: 5 }}>
        Universidade Federal Do Ouro Preto
        </Typography>
      <Link to='perfil'>
        <IconButton edge='end' color='inherit' aria-label='menu'>
          <AccountCircleIcon />
        </IconButton>
      </Link>
    </Toolbar>
  </AppBar>);
}

export default Header;
