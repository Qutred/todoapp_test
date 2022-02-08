import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="relative" sx={{ marginBottom: '8rem' }}>
      <Toolbar>
        <Container>
          <Typography align="center" variant="h4" color="inherit" noWrap>
            Тестовое задание Todo App
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
