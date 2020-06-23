import React, { createContext, useReducer } from 'react';

import { distanceSteps } from '../src/distanceSteps';
import { gradeValues } from '../src/gradeValues';

const initialState = {
  country: "nor",
  sortValue: 0,
  geoLocation: { "latitude": 48.4078, "longitude": 2.5905, "accuracy": 0 },
  boulders: [],
  loadingBoulders: false,
  query: "",
  gradeValue: [1, Object.keys(gradeValues).length],
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
      case "UPDATE_SORT_VALUE":
        return { ...state, sortValue: action.value };
      case "UPDATE_COUNTRY":
        return { ...state, country: action.value }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }