import React, { useContext, useState, useEffect, useRef } from 'react';
import { store } from '../src/store.js';

import { Map, Marker, Popup, TileLayer, ZoomControl, LayersControl, CircleMarker } from "react-leaflet";
import { LatLng, Icon } from "leaflet";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Typography, Row, Col, Tag, Button, Space } from "antd";
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
  const [boulderIndex, setBoulderIndex] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setInitialCenter([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, [])

  // reset index upon new set of boulders
  useEffect(() => {
    setBoulderIndex(null);
  }, [boulders])

  const handlePrev = () => {
    if (boulderIndex != null && boulderIndex != 0) {
      setBoulderIndex(boulderIndex-1);
      setFocus(true);
    }
  }

  const handleNext = () => {
    if (boulderIndex != null && boulderIndex != boulders.length -1 ) {
      setBoulderIndex(boulderIndex+1);
      setFocus(true);
    }
  }

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
        {boulders.map((boulder, index) => (
          <CircleMarker
            key={boulder.id}
            center={new LatLng(boulder.latitude, boulder.longitude)}
            radius={10}
            color={boulderIndex == index ? "#f5222d" : "#096dd9"}
            onclick={() => {
              setBoulderIndex(index);
              setFocus(true);
            }}
          />
        ))}
        {boulderInFocus && boulderIndex != null && (
          <Popup
            position={new LatLng(boulders[boulderIndex].latitude, boulders[boulderIndex].longitude)}
            onClose={() => {
              setFocus(false);
            }}
          >
            <PopupContent boulder={boulders[boulderIndex]}/>
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
        <div>
          <Button style={{position: "fixed", zIndex: 1000, bottom: 24, left: 24, borderRadius:24}}
            type="primary" shape="round" size="large"
            disabled={boulderIndex==0 || boulderIndex==null}
            onClick={handlePrev}
          >
            <NavigateBeforeIcon />
          </Button>
          <Button style={{position: "fixed", zIndex: 1000, bottom: 24, right: 24, borderRadius:24}}
            type="primary" shape="round" size="large"
            disabled={boulderIndex==boulders.length-1 || boulderIndex==null}
            onClick={handleNext}
          >
            <NavigateNextIcon />
          </Button>
        </div>
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
