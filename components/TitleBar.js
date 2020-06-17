import React from 'react';
import Router from "next/router";

import { Container } from '@material-ui/core/';

export default function TitleBar() {
  return (
    <Container>
      <a onClick={() => Router.push("/")}><img src="/logo.svg" height="20em" alt="Logo"/></a>
    </Container>
  )
};