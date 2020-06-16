import { AutoComplete, Input } from 'antd';
import React, { useState, useContext, useEffect } from 'react';

import { store } from '../src/store.js';
const axios = require('axios').default;

export default function Search() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_BOULDERS", query: query, areas: state.areas });
  }, [query])


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