import React from 'react';
import { StateProvider } from '../src/store.js';
import App from 'next/app';
import 'lazysizes';
import Head from "next/head";

import "antd/dist/antd.css";
import "react-vis/dist/style.css";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import TitleBar from '../components/TitleBar';

function FunctionalAppWrapper({ Component, pageProps }) {
  
  return (
    <>
      <Head>
        <title>Gryttr | Når du buldrer ute</title>
      </Head>
      <StateProvider>
        <Layout style={{height: "100vh"}}>
          <Header style={{zIndex: 1, background:"#fff", padding: 0, borderBottom: "1px solid #f0f0f0"}}><TitleBar /></Header>
          <Content style={{background:"white"}}>
            <Component  {...pageProps} />
          </Content>
        </Layout>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
          @media (min-width: 900px) {
            .wrapper {
              width: 900px;
            }
          }
          .wrapper {
            width: 100%;
            padding: 0 24px;
            margin: 0 auto;
            max-width: 900px;
          }
        `}</style>
      </StateProvider>
    </>
  )
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <FunctionalAppWrapper Component={Component} pageProps={pageProps} />
  }
}

export default MyApp;