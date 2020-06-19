import React, { useContext, useState, useEffect, useRef } from 'react';
import { store } from '../src/store.js';

import { Map, Marker, Popup, TileLayer, ZoomControl, LayersControl, CircleMarker } from "react-leaflet";
const { BaseLayer } = LayersControl;
import { LatLng, Icon } from "leaflet";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Typography, Row, Col, Tag, Button, Space } from "antd";
import Head from 'next/head';
const { Title, Text } = Typography;

import SummaryDrawer from '../components/SummaryDrawer';
import { distanceSteps } from '../src/distanceSteps';
import { gradeValues } from '../src/gradeValues';


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

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

export default function BoulderMap() {
  
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [boulderInFocus, setFocus] = useState(null);
  const [initialCenter, setInitialCenter] = useState([0.0, 0.0]);
  const [boulderIndex, setBoulderIndex] = useState(null);

  let boulders = state["boulders"]
  // filter on grade
  .filter((boulder) => state.gradeValue[0] <= swap(gradeValues)[boulder.grade.title])
  .filter((boulder) => swap(gradeValues)[boulder.grade.title] <= state.gradeValue[1])
  // add distanceInKm
  .reduce((acc, boulder) => {
    acc.push({...boulder, distanceInKm: calculateDistance(boulder.latitude, boulder.longitude, state.geoLocation.latitude, state.geoLocation.longitude)})
    return acc;
  }, [])
  // filter on radius
  .filter(boulder => distanceSteps[state.distanceRadiusStep].distanceInKm >= boulder.distanceInKm)

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
        <SummaryDrawer boulders={boulders}/>
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
