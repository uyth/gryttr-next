import React, { useContext, useState } from 'react';
import { store } from '../../src/store.js';

import { Slider } from 'antd';

const gradeMarks = {
  1: "3",
  3: "4",
  5: "5",
  7: "6A",
  9: "6B",
  11: "6C",
  13: "7A",
  15: "7B",
  17: "7C",
  19: "8A",
  21: "8B",
  23: "8C"
}

const gradeMapping = {
  1: "3",
  2: "3+",
  3: "4",
  4: "4+",
  5: "5",
  6: "5+",
  7: "6A",
  8: "6A+",
  9: "6B",
  10: "6B+",
  11: "6C",
  12: "6C+",
  13: "7A",
  14: "7A+",
  15: "7B",
  16: "7B+",
  17: "7C",
  18: "7C+",
  19: "8A",
  20: "8A+",
  21: "8B",
  22: "8B+",
  23: "8C",
  24: "8C+"
};

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
      tipFormatter={(value) => gradeMapping[value]}
    />
  )
}