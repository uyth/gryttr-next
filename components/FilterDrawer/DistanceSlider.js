import React, { useContext, useState, useEffect } from 'react';
import { store } from '../../src/store.js';
import { distanceSteps } from '../../src/distanceSteps';

import { Slider } from 'antd';

export default function DistanceSlider() {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [distanceRadiusStep, setDistanceRadiusStep] = useState(state.distanceRadiusStep);

  const handleDistanceRadiusStepChange = (newValue) => {
    setDistanceRadiusStep(newValue);
  }

  const commitDistanceRadiusStep = () => {
    dispatch({ type: "UPDATE_DISTANCE_RADIUS_STEP", value: distanceRadiusStep })
  }

  useEffect(() => {
    setDistanceRadiusStep(state.distanceRadiusStep);
  }, [state.distanceRadiusStep])

  return (
    <Slider
      value={distanceRadiusStep}
      onChange={handleDistanceRadiusStepChange}
      onAfterChange={commitDistanceRadiusStep}
      marks={distanceSteps}
      min={1}
      max={Object.keys(distanceSteps).length}
      step={1}
      tipFormatter={(value) => distanceSteps[value].label}
    />
  )
}