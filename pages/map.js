import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';
import dynamic from 'next/dynamic'

import { Spin, Row } from "antd";

import SummaryDrawer from '../components/SummaryDrawer';
import StickySearchBar from '../components/StickyBar';

import { distanceSteps } from '../src/distanceSteps';
import { gradeValues } from '../src/gradeValues';

const DynamicComponentWithNoSSR = dynamic(
  (boulders) => import('../components/BoulderMap'),
  { ssr: false,
    loading: () => (
      <Row justify="space-around" align="middle" style={{height:"100%", width: "100%"}}>
        <Spin />
      </Row>
    )
  }
)

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  lat1 = Number(lat1)
  lon1 = Number(lon1)
  lat2 = Number(lat2)
  lon2 = Number(lon2)
  unit = "K"
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var radlon1 = Math.PI * lon1 / 180
  var radlon2 = Math.PI * lon2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit === "K") { dist = dist * 1.609344 } // km
  if (unit === "N") { dist = dist * 0.8684 }
  return dist
}

export default function MapView() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  let boulders = state["boulders"]
    // add distanceInKm
    .reduce((acc, boulder) => {
      acc.push({...boulder, distanceInKm: calculateDistance(boulder.latitude, boulder.longitude, state.geoLocation.latitude, state.geoLocation.longitude)})
      return acc;
    }, [])
    // filer on grade
    .filter((boulder) => state.gradeValue[0] <= swap(gradeValues)[boulder.grade.title])
    .filter((boulder) => swap(gradeValues)[boulder.grade.title] <= state.gradeValue[1])
    // filter on radius
    .filter(boulder => distanceSteps[state.distanceRadiusStep].distanceInKm >= boulder.distanceInKm)


  return (
    <div className="root">
      <StickySearchBar />
      <DynamicComponentWithNoSSR boulders={boulders} />
      <SummaryDrawer boulders={boulders}/>
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