import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';

import dynamic from 'next/dynamic'

import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core/';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import BoulderListItem from '../components/BoulderListItem';
import Position from '../components/Position';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Position'),
  { ssr: false }
)

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

export default function SearchResults({ boulderData, hasSearched, longitude, latitude, sortValue, viewAmount, viewType, handleOpenBoulderInMap, sortValues }) {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  useEffect(() => {
    // if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(position => {
      console.log("FROM NAVIGATOR")
      console.log(position.coords)
      console.log("FROM STATE")
      console.log(state.geoLocation)
      // dispatch({ type: "UPDATE_GEO_LOCATION", latitude: position.coords.latitude, longitude: position.longitude })
      dispatch({ type: "UPDATE_GEO_LOCATION" })
    });
    // }
  })

  // set up boulders
  const [isInit, setHasInit] = useState(true);
  if (isInit) {
    setHasInit(false);
    dispatch({ type: "FETCH_BOULDERS" });
  }

  // scrolling logic
  const showMoreBoulders = () => {
    dispatch({ type: "SHOW_MORE_BOULDERS" });
  }

  useBottomScrollListener(showMoreBoulders);

  // filter boulders

  let boulders = state["boulders"]
    // add distance
    .map(boulder => ({
      ...boulder,
      distanceInKm: calculateDistance(boulder.latitude, boulder.longitude, state.geoLocation.latitude, state.geoLocation.longitude)
    }))
    .filter((boulder) => state.searchTerm ? boulder.title.toLowerCase().match(state.searchTerm.toLocaleLowerCase()) : true)
    .filter((boulder) => state.gradeValue[0] <= swap(gradeMapping)[boulder.grade.title])
    .filter((boulder) => swap(gradeMapping)[boulder.grade.title] <= state.gradeValue[1])
  // filter on radius
  // .filter(boulder => distances[state.distanceRadiusStep - 1].distanceInKm >= boulder.distanceInKm)

  return (
    <Container>
      <DynamicComponentWithNoSSR />
      <p>STATE: {state.geoLocation.longitude}, {state.geoLocation.latitude}</p>
      <Grid container>
        <Grid item>
          Antall treff: {boulders.length}
        </Grid>
        {boulders
          .slice(0, state.viewAmount)
          .map(boulder =>
            <Grid item xs={12} key={boulder.id}>
              <BoulderListItem
                image={boulder["image"]}
                title={boulder.title}
                grade={boulder.grade.title}
                id={boulder.id}
                distanceInKm={boulder.distanceInKm}
                steepness={"Bratthet"}
                timeToDry={"Tørketid"}
                danger={"Utsatthet"}
                handleOpenBoulderInMap={null}
                boulder={boulder}
              />
            </Grid>
          )}
      </Grid>
    </Container>
  )
}