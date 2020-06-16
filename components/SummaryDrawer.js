import React, { useState } from 'react';
import { store } from '../src/store.js';

import { Button, Drawer, Typography } from "antd";
const { Title } = Typography;
import { Link } from 'next';

export default function SummaryDrawer({ boulders }) {

  const [openSummary, setOpenSummary] = useState(false);

  let boulderCountPerGrade = {
    "3": 0,
    "3+": 0,
    "4": 0,
    "4+": 0,
    "5": 0,
    "5+": 0,
    "6A": 0,
    "6A+": 0,
    "6B": 0,
    "6B+": 0,
    "6C": 0,
    "6C+": 0,
    "7A": 0,
    "7A+": 0,
    "7B": 0,
    "7B+": 0,
    "7C": 0,
    "7C+": 0,
    "8A": 0,
    "8A+": 0,
    "8B": 0,
    "8B+": 0,
    "8C": 0,
    "8C+": 0,
  }

  boulderCountPerGrade = boulders.reduce((counter, boulder) => {
    counter[boulder.grade.title]++;
    return counter;
  }, boulderCountPerGrade)

  return (
    <>
      <Button onClick={() => setOpenSummary(true)}
        type="primary" shape="round" size="large"
        style={{ bottom: "24px", left: "50vw", marginLeft: "-125px", width: "250px", position: "fixed" }}
      >
        Oppsummering ({boulders.length})
      </Button>
      <Drawer
        visible={openSummary}
        title="Oppsummering av treff"
        height="50vh"
        placement="bottom"
        onClose={() => setOpenSummary(false)}
      >
        <Button type="primary" component={Link} href="/results">Vis treff i liste</Button>
        {Object.keys(boulderCountPerGrade).map(key => <p key={key}>{key}: {boulderCountPerGrade[key]}</p>)}
      </Drawer>
    </>
  )
}