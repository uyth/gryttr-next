import React from 'react';
import Router from "next/router";

export default function TitleBar() {
  return (
    <div className="wrapper">
      <a onClick={() => Router.push("/")}><img src="/logo.svg" height="20em" alt="Logo"/></a>
    </div>
  )
};