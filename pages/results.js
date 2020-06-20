import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';
import Router from "next/router";

import { Button, Card, Skeleton, Divider } from "antd";

import ToTop from '../components/ToTop';
import ActiveFilters from '../components/ActiveFilters';
import BoulderList from '../components/BoulderList';
import StickySearchBar from '../components/StickyBar';
import { gradeValues } from '../src/gradeValues';
import SortSelector from "../components/SortSelector";


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

export default function SearchResults() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  let boulders = state["boulders"]
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
            <SortSelector />
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