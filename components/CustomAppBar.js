import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core/';

function CustomAppBar() {

  return (
    <AppBar position="relative">
      <Container>
        <Toolbar>
          <Typography variant="h6">GRYTTR</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default CustomAppBar;