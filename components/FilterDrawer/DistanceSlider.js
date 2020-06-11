import React, { useContext, useState } from 'react';
import { store } from '../../src/store.js';

import { Slider } from 'antd';

const distances = {
  1: { label: "50m", value: 0.050 },
  2: { label: "100m", value: 0.100 },
  3: { label: "250m", value: 0.250 },
  4: { label: "500m", value: 0.500 },
  5: { label: "1km", value: 1.0 },
  6: { label: "Alle", value: 100000 },
}

export default function DistanceSlider() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  // distance radius step
  const [distanceRadiusStep, setDistanceRadiusStep] = useState(state.distanceRadiusStep);

  const handleDistanceRadiusStepChange = (newValue) => {
    setDistanceRadiusStep(newValue);
  }

  const commitDistanceRadiusStep = () => {
    dispatch({ type: "UPDATE_DISTANCE_RADIUS_STEP", value: distanceRadiusStep })
  }

  return (
    <Slider
      value={distanceRadiusStep}
      onChange={handleDistanceRadiusStepChange}
      onAfterChange={commitDistanceRadiusStep}
      marks={distances}
      min={1}
      max={Object.keys(distances).length}
      step={1}
      tipFormatter={(value) => distances[value].label}
    />
  )
}