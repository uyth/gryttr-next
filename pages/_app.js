import React from 'react';
import { StateProvider } from '../src/store.js';
import App from 'next/app';
import 'lazysizes';

import "antd/dist/antd.css";

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core/';


import CustomAppBar from '../components/CustomAppBar';
import StickySearchBar from '../components/StickyBar';
import FilterDrawer from '../components/FilterDrawer/FilterDrawer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#ffc107',
    },
  },
});

function FunctionalAppWrapper({ Component, pageProps }) {
  
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <Box height={"100%"}>
          <CustomAppBar />
          <StickySearchBar />
          <Component  {...pageProps} />
          <FilterDrawer />
        </Box>
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
      </ThemeProvider>
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