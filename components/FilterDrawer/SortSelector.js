import React, { useContext, useState, useEffect } from 'react';
import { store } from '../../src/store.js';

import { Radio } from "antd";

export default function SortSelector() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [sortValue, setSortValue] = useState(state.sortValue);

  const handleChange = (e) => {
    setSortValue(e.target.value);
  }

  useEffect(() => {
    dispatch({ type: "UPDATE_SORT_VALUE", value: sortValue })
  }, [sortValue])

  return (
    <Radio.Group defaultValue={sortValue} onChange={handleChange} buttonStyle="solid" size="middle">
      <Radio.Button value={0}>Avstand</Radio.Button>
      <Radio.Button value={1}>Grad</Radio.Button>
      <Radio.Button value={2}>Alfabetisk</Radio.Button>
    </Radio.Group>
  )
}