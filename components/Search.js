import React, { useState, useContext, useEffect } from 'react';
import Router from "next/router";
import { store } from '../src/store.js';
const axios = require('axios').default;

import { AutoComplete, Input } from 'antd';

import { distanceSteps } from '../src/distanceSteps';

export default function Search() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [query, setQuery] = useState(state.query);
  const [options, setOptions] = useState([]);
  const [userLocation, setUserLocation] = useState([state.geoLocation.latitude, state.geoLocation.longitude, state.geoLocation.accuracy]);

  useEffect(() => {
    dispatch({ type: "UPDATE_QUERY", value: query });
  }, [query])

  useEffect(() => {
    dispatch({ type: "FETCH_BOULDERS", query: state.query, areas: state.areas });
    const fetchBoulders = async () => {
      const options = {
        url: '/api/boulders',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        params: {
          areas: state.areas.join(","),
          query: state.query,
          gradeValue: state.gradeValue.join(","),
          geoLocation: state.geoLocation.latitude + "," + state.geoLocation.longitude,
          distanceRadiusInKm: (state.distanceRadiusStep != Object.keys(distanceSteps).length) ? distanceSteps[state.distanceRadiusStep].distanceInKm : null
        }
      };
      const { data } = await axios(options);
      dispatch({ type: "UPDATE_BOULDERS", value: data.boulders })
    }
    fetchBoulders();
  }, [state.query, state.areas, state.gradeValue, state.geoLocation, state.distanceRadiusStep])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLocation([position.coords.latitude, position.coords.longitude, position.coords.accuracy]);
      });
    }
  }, [])

  useEffect(() => {
    dispatch({ type: "UPDATE_GEO_LOCATION", latitude: userLocation[0], longitude: userLocation[1], accuracy: userLocation[2] })
  }, [userLocation])

  const handleChange = async query => {
    getQueryOptions(query);
    setQuery(query);
  }

  const getQueryOptions = async query => {
    const options = {
      url: '/api/search',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      params: {
        query: query
      }
    };
    axios(options).then(response => {
      setOptions(response.data.boulders);
    })
  }

  const handleSearch = () => {
    Router.push("/results");
  }

  return(
    <AutoComplete
      value={state.query}
      style={{width:"100%"}}
      dropdownMatchSelectWidth={"100%"}
      options={options}
      onChange={handleChange}
      notFoundContent="Ingen match funnet"
    >
      <Input.Search
        size="large" placeholder="Søk her" enterButton
        onSearch={handleSearch}
      />
    </AutoComplete>
  )

}