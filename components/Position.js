import React, { useContext, useState } from 'react';
import { store } from '../src/store.js';

export default function Position() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [geoLocation, setGeoLocation] = useState(state.geoLocation);

  const updatePosition = (longitude, latitude) => {
    setGeoLocation({
      longitude: longitude,
      latitude: latitude,
    });
    dispatch({ type: "UPDATE_GEO_LOCATION", latitude: latitude, longitude: longitude });
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(position => {
      updatePosition(position.coords.longitude, position.coords.latitude);
    });
  }

  return <div>
    <div>Latitude: {state.geoLocation.latitude}, Longitude: {state.geoLocation.longitude}</div>
    <div>Latitude: {geoLocation.latitude}, Longitude: {geoLocation.longitude}</div>
  </div>;
}
