import React, { useState } from 'react';
import Router from "next/router";

import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeriesCanvas } from 'react-vis';
import { Button, Drawer, Typography } from "antd";
const { Title } = Typography;


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

  let data = Object.keys(boulderCountPerGrade).sort().reduce((data, grade) => {
    let countX = boulderCountPerGrade[grade];
    data.push({"x": grade, "y": countX})
    console.log(grade, countX)
    return data;
  }, [])

  console.log(data)
  return (
    <>
      <Button onClick={() => setOpenSummary(true)}
        type="primary" shape="round" size="large"
        style={{ bottom: "24px", left: "50vw", marginLeft: "-80px", width: "160px", position: "fixed", zIndex: 1000 }}
      >
        Vis treff ({boulders.length})
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
          <div className="chart-wrapper">
            <Title level={4}>Fordeling av grader</Title>
            <XYPlot width={900} height={200} xType="ordinal">
              <HorizontalGridLines />
              <VerticalBarSeriesCanvas
                color="#1890ff"
                data={data}
              />
              <YAxis />
              <XAxis />
            </XYPlot>
          </div>
        </div>
      </Drawer>
      <style jsx>{`
        .chart-wrapper {
          overflow-x: auto;
          overflow-y: hidden;
          margin-top: 1em;
        }
      `}</style>
    </>
  )
}