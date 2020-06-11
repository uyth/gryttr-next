import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;
import { Container } from '@material-ui/core/';

export default function TitleBar() {
  return (
    <Container>
      <Title level={1}>GRYTTR</Title>
    </Container>
  )
};