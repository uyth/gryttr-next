import React from 'react';

import { List } from 'antd';
import { Tag } from 'antd';
import { Row, Col } from "antd";
import { Typography } from "antd";
const { Title, Text } = Typography;

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

export default function BoulderList({ boulders, loading }) {
  return (
    <List
      size="small"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 32,
      }}
      loading={loading}
      dataSource={boulders}
      renderItem={boulder => (
        <List.Item key={boulder.id} style={{}}>
          <a href={"https://www.gryttr.com/bulder/" + boulder.id} style={{ width: "100%" }}>
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
          </a>
        </List.Item>
      )}
    />
  )
}