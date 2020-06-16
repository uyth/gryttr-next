import React, { useState } from 'react';

import { Container } from '@material-ui/core/';
import TuneIcon from '@material-ui/icons/Tune';
import Search from "./Search";
import { Affix, Button, Space } from "antd"

import FilterDrawer from './FilterDrawer/FilterDrawer';

export default function StickySearchBar() {

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  return (
    <Affix>
      <div style={{background: "#fff", borderBottom: "1px solid #f0f0f0"}}>
        <Container>
          <Space align="center" size="small" style={{height: "64px"}}>
            <Search />
            <Button size="large" onClick={handleToggleDrawer}><TuneIcon /></Button>
          </Space>
        </Container>
      </div>
      <FilterDrawer handleToggleDrawer={handleToggleDrawer} visible={openDrawer}/>
    </Affix>
  );

}