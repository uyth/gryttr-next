import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';

import { Container } from '@material-ui/core/';
import { Button } from "antd";
import BoulderList from '../components/BoulderList';
import { Link } from 'next';

import { distanceSteps } from '../src/distanceSteps';

const gradeMapping = {
  "1": "3",
  "2": "3+",
  "3": "4",
  "4": "4+",
  "5": "5",
  "6": "5+",
  "7": "6A",
  "8": "6A+",
  "9": "6B",
  "10": "6B+",
  "11": "6C",
  "12": "6C+",
  "13": "7A",
  "14": "7A+",
  "15": "7B",
  "16": "7B+",
  "17": "7C",
  "18": "7C+",
  "19": "8A",
  "20": "8A+",
  "21": "8B",
  "22": "8B+",
  "23": "8C",
  "24": "8C+"
};

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
  return swap(gradeMapping)[gradeA] - swap(gradeMapping)[gradeB];
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

  // set up boulders
  const [isInit, setHasInit] = useState(true);
  if (isInit) {
    setHasInit(false);
    dispatch({ type: "FETCH_BOULDERS" });
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(position => {
        dispatch({ type: "UPDATE_GEO_LOCATION", latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy })
      });
    }
  })

  // filter boulders
  let boulders = state["boulders"]
    // add distance
    .map(boulder => ({
      ...boulder,
      distanceInKm: calculateDistance(boulder.latitude, boulder.longitude, state.geoLocation.latitude, state.geoLocation.longitude)
    }))
    .filter((boulder) => state.gradeValue[0] <= swap(gradeMapping)[boulder.grade.title])
    .filter((boulder) => swap(gradeMapping)[boulder.grade.title] <= state.gradeValue[1])
    // filter on radius
    .filter(boulder => distanceSteps[state.distanceRadiusStep].distanceInKm >= boulder.distanceInKm)
    .sort((a, b) => {
      if (state.sortValue == 0) {
        return compareDistance(a.distanceInKm, b.distanceInKm);
      } else if (sortValue == 1) {
        return compareGrade(a.grade.title, b.grade.title);
      } else if (sortValue == 2) {
        return compareName(a.title.toUpperCase(), b.title.toUpperCase());
      }
    })

  return (
    <Container>
      <div>
        <p><b>Debugging:</b></p>
        <p>Position: {state.geoLocation.latitude}, {state.geoLocation.longitude}</p>
        <p>Accuracy: {state.geoLocation.accuracy}</p>
      </div>
      <p> Antall treff: {boulders.length}</p>
      <Button type="primary" component={Link} href="/map">Vis treff i kart</Button>
      <BoulderList boulders={boulders}/>
      <br/>
    </Container>
  )
}