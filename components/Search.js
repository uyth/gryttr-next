import { AutoComplete, Input } from 'antd';
import React, { useState, useContext, useEffect } from 'react';

import { store } from '../src/store.js';
const axios = require('axios').default;

export default function Search() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [userLocation, setUserLocation] = useState([0.0, 0.0, 0.0]);

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

  return(
    <AutoComplete
      style={{width:"100%"}}
      dropdownMatchSelectWidth={"100%"}
      options={options}
      onChange={handleChange}
      notFoundContent="Ingen match funnet"
    >
      <Input.Search size="large" placeholder="Søk her" enterButton />
    </AutoComplete>
  )

}