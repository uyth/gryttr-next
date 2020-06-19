import React, { useContext, useState, useEffect, useRef } from 'react';
import { store } from '../src/store.js';

import { Map, Marker, Popup, TileLayer, ZoomControl, LayersControl, CircleMarker } from "react-leaflet";
import { LatLng, Icon } from "leaflet";

import { Typography } from "antd";
import Head from 'next/head';

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
  const [initialCenter, setInitialCenter] = useState([0.0, 0.0]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setInitialCenter([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </Head>
      <Map
        center={initialCenter}
        zoom={12}
        zoomControl={false} // do not include default zoom control
        maxZoom={19}
        preferCanvas={true}
      >
        <Marker position={new LatLng(state.geoLocation.latitude, state.geoLocation.longitude)} icon={markerRed}/>
        {boulders.map(boulder => (
          <CircleMarker
            key={boulder.id}
            center={new LatLng(boulder.latitude, boulder.longitude)}
            radius={10}
            onclick={() => { setFocus(boulder) }}
          />
        ))}
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
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap Mapnik">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>
          <BaseLayer name="Google Sattelite">
            <TileLayer
              url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
              attribution='Google Sattelite'
            />
          </BaseLayer>
        </LayersControl>
        <ZoomControl position="topright" />
      </Map>
      <style jsx global>{`
        .leaflet-container {
          position: relative!important;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}