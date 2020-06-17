import React, { useContext, useState, useEffect } from 'react';
import { store } from '../../src/store.js';

import { Slider } from 'antd';

import { gradeValues, gradeMarks } from "../../src/gradeValues";

export default function GradeSlider() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [gradeValue, setGradeValue] = useState(state.gradeValue);

  const handleGradeChange = (newValue) => {
    setGradeValue(newValue);
  }

  const commitGradeValue = () => {
    dispatch({ type: "UPDATE_GRADE_VALUE", value: gradeValue })
  }

  useEffect(() => {
    setGradeValue(state.gradeValue);
  }, [state.gradeValue])

  return (
    <Slider
      range
      value={gradeValue}
      onChange={handleGradeChange}
      onAfterChange={commitGradeValue}
      marks={gradeMarks}
      min={1}
      max={24}
      defaultValue={[1, 24]}
      tipFormatter={(value) => gradeValues[value]}
    />
  )
}