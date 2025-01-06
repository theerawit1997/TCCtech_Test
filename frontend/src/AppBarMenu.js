import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function AppBarMenu() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TCCtech Quiz
        </Typography>
        <Button color="inherit" component={Link} to="/test">
          Test
        </Button>
        <Button color="inherit" component={Link} to="/score">
          Score
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarMenu;
