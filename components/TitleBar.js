import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;
import { Container } from '@material-ui/core/';

export default function TitleBar() {
  return (
    <Container>
      <img src="/logo.svg" height="20em" alt="Logo"/>
    </Container>
  )
};