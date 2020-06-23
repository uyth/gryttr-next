import React, { useContext, useState, useEffect } from 'react';
import { store } from '../src/store.js';

import { Select, Typography } from "antd";
const { Option } = Select;
const { Text } = Typography;

export default function CountrySelector() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [country, setCountry] = useState(state.country);

  const handleChange = (value) => {
    setCountry(value);
  }

  useEffect(() => {
    dispatch({ type: "UPDATE_COUNTRY", value: country })
  }, [country])


  return(
    <>
      <Text strong>Velg land: </Text>
      <Select defaultValue={country} style={{ width: 120 }} onChange={handleChange}>
        <Option value="nor">Norge</Option>
        <Option value="swe">Sverige</Option>
      </Select>
    </>
  )
}