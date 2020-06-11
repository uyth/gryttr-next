import React from 'react';
import { StateProvider } from '../src/store.js';
import App from 'next/app';
import 'lazysizes';

import "antd/dist/antd.css";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import TitleBar from '../components/TitleBar';
import StickySearchBar from '../components/StickyBar';
import FilterDrawer from '../components/FilterDrawer/FilterDrawer';


function FunctionalAppWrapper({ Component, pageProps }) {
  
  return (
    <StateProvider>
      <Layout style={{height: "100vh"}}>
        <Header style={{zIndex: 1, background:"blue"}}><TitleBar /></Header>
        <Content style={{background:"white"}}>
          <StickySearchBar />
          <Component  {...pageProps} />
        </Content>
        <FilterDrawer />
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
        .leaflet-container {
          position: fixed!important;
          top: 0;
          bottom:0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </StateProvider>
  )
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <FunctionalAppWrapper Component={Component} pageProps={pageProps} />
  }
}

export default MyApp;