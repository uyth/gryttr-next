import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';

import { Map, Marker, Popup, TileLayer, ZoomControl, LayersControl, CircleMarker, Circle } from "react-leaflet";
const { BaseLayer } = LayersControl;
import { LatLng, Icon } from "leaflet";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Typography, Row, Col, Tag, Button, Space } from "antd";
import Head from 'next/head';
const { Title, Text, Paragraph } = Typography;

import SummaryDrawer from '../components/SummaryDrawer';
import { distanceSteps } from '../src/distanceSteps';

const markerRed = new Icon({
  iconUrl: "/markerRed.svg",
  iconSize: [48, 48],
  shadowUrl: "/markerShadow.svg",
  shadowSize: [54, 54],
  shadowAnchor: [14, 24],
});

export default function BoulderMap() {
  
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [boulderInFocus, setFocus] = useState(null);
  const [initialCenter, setInitialCenter] = useState([0.0, 0.0]);
  const [boulderIndex, setBoulderIndex] = useState(null);

  let boulders = state["boulders"]

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
  }, [state.boulders])

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
            <PopupContent index={boulderIndex} boulder={boulders[boulderIndex]} size={boulders.length}/>
          </Popup>
        )}
        {state.distanceRadiusStep == Object.keys(distanceSteps).length &&
          <Marker position={new LatLng(state.geoLocation.latitude, state.geoLocation.longitude)} icon={markerRed}/>
        }
        {state.distanceRadiusStep != Object.keys(distanceSteps).length &&
          <Circle color="#262626" center={new LatLng(state.geoLocation.latitude, state.geoLocation.longitude)}
            radius={distanceSteps[state.distanceRadiusStep].distanceInKm*1000}/>
        }
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
          <Button style={{position: "fixed", zIndex: 1000, bottom: 24, left: 24}}
            shape="round" size="large"
            disabled={boulderIndex==0 || boulderIndex==null}
            onClick={handlePrev}
          >
            <NavigateBeforeIcon />
          </Button>
          <Button style={{position: "fixed", zIndex: 1000, bottom: 24, right: 24}}
            shape="round" size="large"
            disabled={boulderIndex==boulders.length-1 || boulderIndex==null}
            onClick={handleNext}
          >
            <NavigateNextIcon />
          </Button>
        </div>
        <SummaryDrawer/>
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

const PopupContent = ({ boulder, index, size }) => {
  return(
    <a className="pop-up" href={"https://www.gryttr.com/bulder/" + boulder.id}>
      <Title level={4}>{boulder.grade.title} | {boulder.title}</Title>
      <Paragraph><Text type="secondary">{index+1} av {size}</Text></Paragraph>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col flex="auto">
          <Paragraph>
            <Tag>Bratthet</Tag>
            <Tag>Tørke</Tag>
            <Tag>Fare</Tag>
          </Paragraph>
          <Paragraph>Finnes i (Samlinger)</Paragraph>
          <Paragraph>{distanceValueText(boulder.distanceInKm)} unna!</Paragraph>
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
