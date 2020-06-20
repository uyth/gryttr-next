import React, { useState, useContext } from 'react';
import { store } from '../src/store.js';
import Router from "next/router";

import { Button, Drawer } from "antd";

import BoulderChart from "./BoulderChart";

export default function SummaryDrawer() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [openSummary, setOpenSummary] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenSummary(true)}
        type="primary" shape="round" size="large"
        style={{ bottom: "24px", left: "50vw", marginLeft: "-80px", width: "160px", position: "fixed", zIndex: 1000 }}
      >
        Vis treff ({state.boulders.length})
      </Button>
      <Drawer
        visible={openSummary}
        title="Oppsummering av treff"
        height="70vh"
        placement="bottom"
        onClose={() => setOpenSummary(false)}
      >
        <div className="wrapper">
          <Button type="primary" onClick={() => Router.push("/results")}>Vis treff i liste</Button>
          <BoulderChart boulders={state.boulders} />
        </div>
      </Drawer>
    </>
  )
}