import React, { useContext, useState, useEffect, useRef } from 'react';
import { store } from '../src/store.js';

import { Map, Marker, Popup, TileLayer, ZoomControl, LayersControl, CircleMarker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { LatLng, Icon } from "leaflet";

import { Typography } from "antd";
const { Title } = Typography;

const { BaseLayer } = LayersControl;

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

export default function BoulderMap({ boulders }) {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [boulderInFocus, setFocus] = useState(null);
  
  let initialCenter = [0.0, 0.0];
  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(position => {
      initialCenter = [position.coords.latitude, position.coords.longitude];
    });
  }

  return (
      <Map
        center={initialCenter}
        zoom={12}
        zoomControl={false} // do not include default zoom control
        maxZoom={19}
        preferCanvas={true}
      >
        <Marker position={new LatLng(state.geoLocation.latitude, state.geoLocation.longitude)} icon={markerRed}/>
        {/* <MarkerClusterGroup> */}
          {boulders
            .map(boulder => (
              <CircleMarker
                key={boulder.id}
                center={new LatLng(boulder.latitude, boulder.longitude)}
                radius={10}
                onclick={() => { setFocus(boulder) }}
              />
          ))}
        {/* </MarkerClusterGroup> */}
        {boulderInFocus && (
          <Popup
            position={new LatLng(boulderInFocus.latitude, boulderInFocus.longitude)}
            onClose={() => {
              setFocus(null);
            }}
          >
            <a href={"https://www.gryttr.com/bulder/" + boulderInFocus.id}>
              <Title level={4}>{boulderInFocus.grade.title} {boulderInFocus.title}</Title>
              <img height="124" width="124" src={boulderInFocus["image"]["srcset"].split(", ")[1].split(" ")[0]} />
            </a>
          </Popup>
        )}
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
        </LayersControl>
        <ZoomControl position="bottomright" />
      </Map>
  )
}