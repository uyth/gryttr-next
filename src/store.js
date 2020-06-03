// store.js
import React, { createContext, useReducer } from 'react';

import { distanceSteps } from '../src/distanceSteps';

const axios = require('axios').default;

const initialState = {
  searchTerm: "",
  sortValue: 0,
  viewAmount: 10,
  geoLocation: { "latitude": 0, "longitude": 0 },
  boulders: [],
  gradeValue: [1, 24],
  dangerValue: [1, 4],
  area: 0,
  slab: true,
  vertical: true,
  overhang: true,
  activeBoulder: null,
  drawerOpen: false,
  distanceRadiusStep: distanceSteps.length,
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
            area: state.area
          }
        };
        axios(options)
          .then(response => {
            dispatch({ type: "UPDATE_BOULDERS", value: response.data.boulders })
          })
        return state;
      case "UPDATE_BOULDERS":
        return { ...state, boulders: action.value }
      case "UPDATE_SEARCH_TERM":
        return { ...state, searchTerm: action.value };
      case "UPDATE_GRADE_VALUE":
        return { ...state, gradeValue: action.value };
      case "TOGGLE_DRAWER":
        return { ...state, drawerOpen: !state.drawerOpen };
      case "UPDATE_AREA":
        return { ...state, area: action.value };
      case "SHOW_MORE_BOULDERS":
        return { ...state, viewAmount: state.viewAmount + 20 };
      case "UPDATE_GEO_LOCATION":
        return { ...state, geoLocation: { "longitude": action.longitude, "latitude": action.latitude } };
      case "UPDATE_DISTANCE_RADIUS_STEP":
        return { ...state, distanceRadiusStep: action.value };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }