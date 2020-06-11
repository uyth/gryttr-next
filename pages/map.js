import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';
import dynamic from 'next/dynamic'
import Head from 'next/head';

import SummaryDrawer from '../components/SummaryDrawer';

import { distanceSteps } from '../src/distanceSteps';

const DynamicComponentWithNoSSR = dynamic(
  (boulders, useLocation) => import('../components/BoulderMap'),
  { ssr: false }
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

export default function MapView() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  
  const [userLocation, setUserLocation] = useState([0.0, 0.0]);
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        // dispatch({ type: "UPDATE_GEO_LOCATION", latitude: position.coords.latitude, longitude: position.coords.longitude });
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  })

  const [isInit, setHasInit] = useState(true);
  if (isInit) {
    setHasInit(false);
    dispatch({ type: "FETCH_BOULDERS" });
  }

  let boulders = state["boulders"]
    // add distance
    .map(boulder => ({
      ...boulder,
      distanceInKm: calculateDistance(boulder.latitude, boulder.longitude, userLocation[0], userLocation[1])
    }))
    // filter on searchterm
    .filter((boulder) => state.searchTerm ? boulder.title.toLowerCase().match(state.searchTerm.toLocaleLowerCase()) : true)
    // filer on grade
    .filter((boulder) => state.gradeValue[0] <= swap(gradeMapping)[boulder.grade.title])
    .filter((boulder) => swap(gradeMapping)[boulder.grade.title] <= state.gradeValue[1])
    // filter on radius
    .filter(boulder => distanceSteps[state.distanceRadiusStep].distanceInKm >= boulder.distanceInKm)



  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin="" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
        />
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
          integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
          crossorigin="" />
        <script src="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"></script>
      </Head>
      <DynamicComponentWithNoSSR boulders={boulders} userLocation={userLocation}/>
      <SummaryDrawer boulders={boulders}/>
    </div>
  )
}