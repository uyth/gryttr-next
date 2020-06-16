import React, { useContext, useState } from 'react';
import { store } from '../../src/store.js';

import { Container } from '@material-ui/core/';
import { Typography } from 'antd';
const { Title } = Typography;
import { Drawer } from 'antd';

import AreaCheckboxTree from "./AreaCheckboxTree";
import DistanceSlider from "./DistanceSlider";
import GradeSlider from "./GradeSlider";


export default function FilterDrawer() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const handleToggleDrawer = () => {
    dispatch({ type: "TOGGLE_DRAWER" })
  }

  return (
    <Drawer
      title="Filter"
      closable={true}
      placement="bottom"
      visible={state.drawerOpen}
      onClose={handleToggleDrawer}
      height={"50vh"}
    >
      <Container>
        <>
          <Title level={4}>Grad</Title>
          <GradeSlider />
        </>
        <>
          <Title level={4}>Velg område</Title>
          <AreaCheckboxTree />
        </>
        <>
          <Title level={4}>Avstand fra deg</Title>
          <DistanceSlider />
        </>
      </Container>
    </Drawer>
  )
};