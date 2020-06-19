import React, { useState, useEffect } from 'react';

import { Tag } from 'antd';
import { Row, Col } from "antd";
import { Typography } from "antd";
const { Title, Text } = Typography;
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
 
const distanceValueText = (distanceInKm) => {
  if (distanceInKm > 10) {
    return Number(distanceInKm).toPrecision(3) + " km"
  } else if (distanceInKm > 1) {
    return Number(distanceInKm).toPrecision(2) + " km"
  } else if (distanceInKm > 0.1) {
    return Number(distanceInKm * 1000).toPrecision(3) + " m"
  } else if (distanceInKm > 0.01) {
    return Number(distanceInKm * 1000).toPrecision(2) + " m"
  } else {
    return Number(distanceInKm * 1000).toPrecision(1) + " m"
  }
}

const BoulderListItem = ({ boulder }) => {

  return (
    <a className="list-item" href={"https://www.gryttr.com/bulder/" + boulder.id}>
      <Title level={4}>{boulder.grade.title} {boulder.title}</Title>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col flex="auto">
          <div>
            <Tag>Bratthet</Tag>
            <Tag>Tørke</Tag>
            <Tag>Fare</Tag>
          </div>
          <p>
            <Text>Finnes i: Samlinger</Text>
          </p>
          <Text>{distanceValueText(boulder.distanceInKm)} unna!</Text>
        </Col>
        <Col flex="120px">
          <img
            data-sizes="auto"
            data-srcset={boulder.image["srcset"]}
            className="lazyload"
            alt={boulder.title}
            width={120}
            height={120}
          />
        </Col>
      </Row>
      <style jsx>{`
        .list-item {
          width: 100%;
          display: block;
          border-bottom: 1px solid #f0f0f0;
        }
        .list-item:hover {
          background: #f8f8f8;
        }
        `}</style>
    </a>
  )
}

export default function BoulderList({ boulders }) {
  
  const [viewAmount, setViewAmount] = useState(10);

  useBottomScrollListener(() => {
    if (viewAmount < boulders.length) {
      setViewAmount(viewAmount+10)
    }
  });

  // reset view amount
  useEffect(() => {
    setViewAmount(10)
  }, [boulders])

  return (
    <>
    {boulders.slice(0, viewAmount).map(boulder => <><BoulderListItem key={boulder.id} boulder={boulder} /></>)}
    </>
  )
}