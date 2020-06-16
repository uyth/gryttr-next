import { AutoComplete, Input } from 'antd';
import React, { useState, useContext } from 'react';

import { store } from '../src/store.js';
const axios = require('axios').default;

export default function Search() {

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);

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

  const handleChange = async query => {
    setOptions(await getQueryOptions(query))
    dispatch({ type: "UPDATE_SEARCH_TERM", value: query });
    dispatch({ type: "FETCH_BOULDERS" });
  }

  return(
    <AutoComplete
      style={{width:"100%"}}
      dropdownMatchSelectWidth={"100%"}
      options={options}
      onChange={handleChange}
    >
      <Input.Search size="large" placeholder="Søk her" enterButton />
    </AutoComplete>
  )

}