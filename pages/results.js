import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';
import Router from "next/router";

import { Button, Card, Skeleton, Divider } from "antd";

import ToTop from '../components/ToTop';
import ActiveFilters from '../components/ActiveFilters';
import BoulderList from '../components/BoulderList';
import StickySearchBar from '../components/StickyBar';
import { distanceSteps } from '../src/distanceSteps';
import { gradeValues } from '../src/gradeValues';


function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function compareName(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // names must be equal
  return 0
}

function compareDistance(distanceA, distanceB) {
  return distanceA - distanceB;
}

function compareGrade(gradeA, gradeB) {
  return swap(gradeValues)[gradeA] - swap(gradeValues)[gradeB];
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

export default function SearchResults() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  // filter boulders
  let boulders = state["boulders"]
    // add distanceInKm
    .reduce((acc, boulder) => {
      acc.push({...boulder, distanceInKm: calculateDistance(boulder.latitude, boulder.longitude, state.geoLocation.latitude, state.geoLocation.longitude)})
      return acc;
    }, [])
    .filter((boulder) => state.gradeValue[0] <= swap(gradeValues)[boulder.grade.title])
    .filter((boulder) => swap(gradeValues)[boulder.grade.title] <= state.gradeValue[1])
    // filter on radius
    .filter(boulder => distanceSteps[state.distanceRadiusStep].distanceInKm >= boulder.distanceInKm)
    .sort((a, b) => {
      if (state.sortValue == 0) {
        return compareDistance(a.distanceInKm, b.distanceInKm);
      } else if (state.sortValue == 1) {
        return compareGrade(a.grade.title, b.grade.title);
      } else if (state.sortValue == 2) {
        return compareName(a.title.toUpperCase(), b.title.toUpperCase());
      }
    })

  return (
    <div>
      <ToTop />
      <StickySearchBar />
      <div className="wrapper">
        <div className="info-card">
          <Card>
            <p><b>Detaljer:</b></p>
            <p><b>Debugging:</b> Position: ({state.geoLocation.latitude}, {state.geoLocation.longitude}), Accuracy: {state.geoLocation.accuracy}m</p>
            <ActiveFilters />
            <p> Antall treff: {boulders.length}</p>
            <Button type="primary" onClick={() => Router.push("/map")}>Vis treff i kart</Button>
          </Card>
        </div>
        <div className="list">
        {state.loadingBoulders ?
          <><Skeleton active /><Divider /><Skeleton active /></> : <BoulderList boulders={boulders} />
        }
        </div>
      </div>
      <style jsx>{`
        .info-card {
          margin: 1em 0;
        }
        .list {
          max-height: 100vh;
        }
      `}</style>
    </div>
  )
}