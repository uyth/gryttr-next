import React, { useContext, useState, useEffect, useRef } from 'react';
import { store } from '../src/store.js';

import { Map, Marker, Popup, TileLayer, ZoomControl, LayersControl, CircleMarker } from "react-leaflet";
import { LatLng, Icon } from "leaflet";

import { Typography, Row, Col, Tag } from "antd";
import Head from 'next/head';

const { Title, Text } = Typography;

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
            <PopupContent boulder={boulderInFocus}/>
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
    </>
  )
}

const distanceValueText = (distanceInKm) => {
  if (distanceInKm > 10) {
    return Number(distanceInKm).toPrecision(3) + " km"
  } else if (distanceInKm > 1) {
    return Number(distanceInKm).toPrecision(2) + " km"
  } else if (distanceInKm > 0.1) {
    return Number(distanceInKm * 1000).toPrecision(3) + " m"
  } else if (distanceInKm > 0.01) {
    return Number(distanceInKm * 1000).toPrecision(2) + " m"
  } else {
    return Number(distanceInKm * 1000).toPrecision(1) + " m"
  }
}

const PopupContent = ({ boulder }) => {
  return(
    <a className="pop-up" href={"https://www.gryttr.com/bulder/" + boulder.id}>
      <Title level={4}>{boulder.grade.title} {boulder.title}</Title>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col flex="auto">
          <div>
            <Tag>Bratthet</Tag>
            <Tag>Tørke</Tag>
            <Tag>Fare</Tag>
          </div>
          <p>
            <Text>Finnes i: Samlinger</Text>
          </p>
          <Text>{distanceValueText(boulder.distanceInKm)} unna!</Text>
        </Col>
        <Col flex="120px">
          <img
            data-sizes="auto"
            data-srcset={boulder.image["srcset"]}
            className="lazyload"
            alt={boulder.title}
            width={120}
            height={120}
          />
        </Col>
      </Row>
      <style jsx>{`
        .pop-up {
          display: block;
          width: 300px;
        }
        
      `}</style>
    </a>
  )
}
