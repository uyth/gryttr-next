import React, { useState } from 'react';

import TuneIcon from '@material-ui/icons/Tune';
import Search from "./Search";
import { Affix, Button, Space } from "antd"

import FilterDrawer from './FilterDrawer/FilterDrawer';

export default function StickySearchBar() {

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (bool) => {
    setOpenDrawer(bool);
  }

  return (
    <Affix>
      <div style={{background: "#fff", borderBottom: "1px solid #f0f0f0"}}>
        <div className="wrapper">
          <Space align="center" size="small" style={{height: "64px"}}>
            <Search />
            <Button size="large" onClick={() => toggleDrawer(true)}><TuneIcon /></Button>
          </Space>
          <FilterDrawer handleToggleDrawer={() => toggleDrawer(false)} visible={openDrawer}/>
        </div>
      </div>
    </Affix>
  );

}