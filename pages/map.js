import React from 'react';
import dynamic from 'next/dynamic'

import { Spin, Row } from "antd";

import StickySearchBar from '../components/StickyBar';

const Map = dynamic(
  () => import('../components/BoulderMap'),
  { ssr: false,
    loading: () => (
      <Row justify="space-around" align="middle" style={{height:"100%", width: "100%"}}>
        <Spin />
      </Row>
    )
  }
)

export default function MapView() {

  return (
    <div className="root">
      <StickySearchBar />
      <Map />
      <style jsx>{`
        .root {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <style jsx global>{`
        .leaflet-container {
          position: relative!important;
          width: 100%;
          flex: 1 1 auto;
        }
      `}</style>
    </div>
  )
}