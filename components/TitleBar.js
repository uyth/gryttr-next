import React from 'react';
import { Container } from '@material-ui/core/';

export default function TitleBar() {
  return (
    <Container>
      <a href="/"><img src="/logo.svg" height="20em" alt="Logo"/></a>
    </Container>
  )
};