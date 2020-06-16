import React, { createContext, useReducer } from 'react';

import { distanceSteps } from '../src/distanceSteps';

const axios = require('axios').default;

const initialState = {
  sortValue: 0,
  geoLocation: { "latitude": 0, "longitude": 0, "accuracy": 0 },
  boulders: [],
  loadingBoulders: false,
  query: "",
  gradeValue: [1, 24],
  dangerValue: [1, 4],
  areas: [],
  slab: true,
  vertical: true,
  overhang: true,
  activeBoulder: null,
  distanceRadiusStep: Object.keys(distanceSteps).length,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCH_BOULDERS":
        const options = {
          url: '/api/boulders',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          params: {
            areas: action.areas.join(","),
            query: action.query
          }
        };
        axios(options).then(response => {
          dispatch({ type: "UPDATE_BOULDERS", value: response.data.boulders })
        })
        return { ...state, loadingBoulders: true };
      case "UPDATE_BOULDERS":
        return { ...state, boulders: action.value, loadingBoulders: false }
      case "UPDATE_GRADE_VALUE":
        return { ...state, gradeValue: action.value };
      case "UPDATE_AREA":
        return { ...state, areas: action.value };
      case "UPDATE_QUERY":
        return { ...state, query: action.value };
      case "UPDATE_GEO_LOCATION":
        return { ...state, geoLocation: { "longitude": action.longitude, "latitude": action.latitude, "accuracy": action.accuracy } };
      case "UPDATE_DISTANCE_RADIUS_STEP":
        return { ...state, distanceRadiusStep: action.value };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }