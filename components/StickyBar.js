import React, { useContext } from 'react';
import { store } from '../src/store.js';

import { Box, Container } from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/FormatListBulleted';

import { TextField, InputAdornment, } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

import { Link } from 'next';


export default function StickySearchBar() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const handleSearchTermChange = (event) => {
    dispatch({ type: "UPDATE_SEARCH_TERM", value: event.target.value });    
  };

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
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Navn på bulder"
            value={state.searchTerm}
            onChange={handleSearchTermChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <IconButton onClick={handleToggleDrawer}>
            <TuneIcon />
          </IconButton>
          <IconButton component={Link} href="/results">
            <ListIcon />
          </IconButton>
          <IconButton component={Link} href="/map">
            <MapIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );

}