import React, { useState } from 'react';

import { Typography, Card, Space, Button } from "antd";
const { Title } = Typography;
import TuneIcon from '@material-ui/icons/Tune';

import Search from "./Search";
import FilterDrawer from './FilterDrawer/FilterDrawer';

export default function SearchCard() {

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  return (
    <Card>
      <Title level={3}>Finn bulder</Title>
      <Space>
        <Search />
        <Button size="large" onClick={handleToggleDrawer}><TuneIcon /></Button>
      </Space>
      <FilterDrawer handleToggleDrawer={handleToggleDrawer} visible={openDrawer} />
    </Card>
  )
}