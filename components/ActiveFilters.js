import React, { useContext } from 'react';
import { store } from '../src/store.js';

import { Tag } from "antd";

import { distanceSteps } from '../src/distanceSteps';
import { gradeValues } from '../src/gradeValues';

export default function ActiveFilters () {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const MAX_GRADE = Object.keys(gradeValues).length;
  const MAX_DISTANCE = Object.keys(distanceSteps).length;

  const handleRemoveArea = (area) => {
    dispatch({ type: "UPDATE_AREA", value: state.areas.filter(a => a !== area) });
  }

  const handleResetUpperGrade = () => {
    dispatch({ type: "UPDATE_GRADE_VALUE", value: [state.gradeValue[0], MAX_GRADE] })
  }

  const handleResetLowerGrade = () => {
    dispatch({ type: "UPDATE_GRADE_VALUE", value: [1, state.gradeValue[1]] })
  }

  const handleResetDistanceRadius = () => {
    dispatch({ type: "UPDATE_DISTANCE_RADIUS_STEP", value: MAX_DISTANCE })
  }

  return (
    <>
    {state.areas.length ? state.areas.map(area => (
      <Tag color="orange" closable onClose={() => handleRemoveArea(area)}>{area}</Tag>
    ))
    : null
    }
    {state.gradeValue[0] !== 1 ? 
      <Tag color="green" closable onClose={handleResetLowerGrade}>Grad høyere eller lik {gradeValues[state.gradeValue[0]]}</Tag>
    : null
    }
    {state.gradeValue[1] !== MAX_GRADE ? 
      <Tag color="green" closable onClose={handleResetUpperGrade}>Grad mindre eller lik {gradeValues[state.gradeValue[1]]}</Tag>
    : null
    }
    {state.distanceRadiusStep != Object.keys(distanceSteps).length ? 
      <Tag color="green" closable onClose={handleResetDistanceRadius}>Avstand mindre enn {distanceSteps[state.distanceRadiusStep].distanceInKm} km</Tag>
    : null
    }
    </>
  )
}