import React, { useContext } from 'react';
import { store } from '../src/store.js';

import { Box, Container } from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import Search from "./Search";

export default function StickySearchBar() {

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const handleToggleDrawer = () => {
    dispatch({ type: "TOGGLE_DRAWER" });
  }

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="2"
      bgcolor="#ffffff"
      boxShadow={2}
    >
      <Container>
        <Box display="flex" alignItems="center" padding={1}>
          <Search />
          <IconButton onClick={handleToggleDrawer}>
            <TuneIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );

}