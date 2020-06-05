import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';

import { Map, Marker, Popup, TileLayer, ZoomControl, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Icon } from "leaflet";
import { Grid, Typography, Box } from '@material-ui/core/';

import { distanceSteps } from '../src/distanceSteps';

const { BaseLayer } = LayersControl;


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

const markerRed = new Icon({
  iconUrl: "/markerRed.svg",
  iconSize: [48, 48],
  shadowUrl: "/markerShadow.svg",
  shadowSize: [54, 54],
  shadowAnchor: [14, 24],
});

const markerBlue = new Icon({
  iconUrl: "/markerBlue.svg",
  iconSize: [48, 48],
  shadowUrl: "/markerShadow.svg",
  shadowSize: [54, 54],
  shadowAnchor: [14, 24],
});

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

export default function BoulderMap() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(position => {
        dispatch({ type: "UPDATE_GEO_LOCATION", latitude: position.coords.latitude, longitude: position.coords.longitude });
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  })

  // set up boulders
  const [isInit, setHasInit] = useState(true);
  if (isInit) {
    setHasInit(false);
    dispatch({ type: "FETCH_BOULDERS" });
  }

  const [userLocation, setUserLocation] = useState([state.geoLocation.latitude, state.geoLocation.longitude]);
  const [boulderInFocus, setFocus] = useState(null);

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
    .filter(boulder => distanceSteps[state.distanceRadiusStep - 1].distanceInKm >= boulder.distanceInKm)


  return (
    <Box width={"100%"} height={"100%"}>
      <Map
        center={userLocation}
        zoom={10}
        zoomControl={false} // do not include default zoom control
        maxZoom={19}
      >
        <LayersControl position="bottomright">
          <BaseLayer checked name="OpenStreetMap Mapnik">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>
          <BaseLayer name="Google Sattelite">
            <TileLayer
              url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>
          {boulderInFocus && (
            <Popup
              position={[
                boulderInFocus.latitude,
                boulderInFocus.longitude,
              ]}
              onClose={() => {
                setFocus(null);
              }}
            >
              <Grid>
                <a href={"https://www.gryttr.com/bulder/" + boulderInFocus.id}>
                  <Typography>{boulderInFocus.grade.title} {boulderInFocus.title}</Typography>
                  <img height="124" width="124" src={boulderInFocus["image"]["srcset"].split(", ")[1].split(" ")[0]} />
                </a>
              </Grid>
            </Popup>
          )}
          <Marker
            key={0}
            position={userLocation}
            icon={markerRed}
          />
          <MarkerClusterGroup>
            {boulders.map(boulder => (
              <Marker
                key={boulder.id}
                position={[
                  boulder.latitude,
                  boulder.longitude
                ]}
                // onclick={() => { setFocus(boulder) }}
                icon={markerBlue}
              />
            ))}
          </MarkerClusterGroup>
        </LayersControl>
        <ZoomControl position="bottomright" />
      </Map>
    </Box>
  )
}