import React, { useState, useContext, useEffect } from 'react';
import Router from "next/router";
import { store } from '../src/store.js';
const axios = require('axios').default;

import { AutoComplete, Input } from 'antd';

export default function Search() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [query, setQuery] = useState(state.query);
  const [options, setOptions] = useState([]);
  const [userLocation, setUserLocation] = useState([state.geoLocation.latitude, state.geoLocation.longitude, state.geoLocation.accuracy]);

  useEffect(() => {
    dispatch({ type: "UPDATE_QUERY", value: query });
    dispatch({ type: "FETCH_BOULDERS", query: query, areas: state.areas });
  }, [query])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(position => {
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