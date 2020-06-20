import React, { useState, useContext } from 'react';
import { store } from '../src/store.js';
import Router from "next/router";

import { Button, Drawer } from "antd";

import BoulderChart from "./BoulderChart";

export default function SummaryDrawer({open, handleClose}) {

  const globalState = useContext(store);
  const { state } = globalState;

  return (
    <Drawer
      visible={open}
      title="Oppsummering av treff"
      height="70vh"
      placement="bottom"
      onClose={handleClose}
    >
      <div className="wrapper">
        <Button type="primary" onClick={() => Router.push("/results")}>Vis treff i liste</Button>
        <BoulderChart boulders={state.boulders} />
      </div>
    </Drawer>
  )
}