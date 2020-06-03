// store.js
import React, { createContext, useReducer } from 'react';

const axios = require('axios').default;

// tokerud
import Lysloypa from '../src/tokerud/lysloypa.json';
import OstOgVest from '../src/tokerud/ost-og-vestkanten.json';
import Tennisbanen from '../src/tokerud/tennisbanen.json';

// ostmarka
import Boler from '../src/ostmarka/boler.json';
import Gronmo from '../src/ostmarka/gronmo.json';
import Katteputten from '../src/ostmarka/katteputten.json';
import NedreHellerud from '../src/ostmarka/nedre-hellerud.json';
import OvreHellerud from '../src/ostmarka/ovre-hellerud.json';
import Ostmarksetra from '../src/ostmarka/ostmarksetra.json';
import Skoyenputten from '../src/ostmarka/skoyenputten.json';
import Skullerud from '../src/ostmarka/skullerud.json';

// nissedal
import Haegefjell from '../src/nissedal/haegefjell.json';


const initialState = {
  searchTerm: "",
  sortValue: 0,
  viewAmount: 10,
  geoLocation: {"latitude": 0, "longitude": 0},
  boulders: [],
  gradeValue: [1, 24],
  dangerValue: [1, 4],
  area: 0,
  slab: true,
  vertical: true,
  overhang: true,
  activeBoulder: null,
  drawerOpen: false,
  // distanceRadiusStep: distances.length,
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
        return { ...state, boulders: action.value}
      case "UPDATE_SEARCH_TERM":
        return { ...state, searchTerm: action.value };
      case "UPDATE_GRADE_VALUE":
        return { ...state, gradeValue: action.value };
      case "UPDATE_GEO_LOCATION":
        return { ...state, longitude: action.longitude, latitude: action.latitude }
      case "TOGGLE_DRAWER":
        return { ...state, drawerOpen: !state.drawerOpen };
      case "UPDATE_AREA":
        return { ...state, area: action.value };
      case "SHOW_MORE_BOULDERS":
        return { ...state, viewAmount: state.viewAmount + 20 };
      case "UPDATE_GEO_LOCATION":
        return { ...state, geoLocation: {"latitude": 59.82167599999999, "longitude":  10.8524466}};
        return { ...state, geoLocation: {"longitude": action.longitude, "latitude": action.latitude} };
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }