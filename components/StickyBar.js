import React, { useContext } from 'react';
import { store } from '../src/store.js';

import { Container } from '@material-ui/core/';
import TuneIcon from '@material-ui/icons/Tune';
import Search from "./Search";
import { Affix, Button, Space } from "antd"

export default function StickySearchBar() {

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const handleToggleDrawer = () => {
    dispatch({ type: "TOGGLE_DRAWER" });
  }

  return (
    <Affix>
      <div style={{background: "#fff", boxShadow: "2px 2px 4px 4px #ccc"}}>
        <Container>
          <Space align="center" size="small" style={{height: "64px"}}>
            <Search />
            <Button size="large" onClick={handleToggleDrawer}><TuneIcon /></Button>
          </Space>
        </Container>
      </div>
    </Affix>
  );

}