import React, { useContext, useState } from 'react';
import { store } from '../src/store.js';

import { Drawer } from '@material-ui/core/';

import { Box } from '@material-ui/core/';
import { Container } from '@material-ui/core/';
import { Slider } from '@material-ui/core/';
import { FormGroup } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { Select, ListSubheader, MenuItem } from '@material-ui/core/';


function gradeValuetext(value, index) {
  return gradeMapping[value];
}

const gradeMarks = [
  {
    value: 1,
    label: "3"
  },
  {
    value: 3,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 7,
    label: "6A"
  },
  {
    value: 9,
    label: "6B"
  },
  {
    value: 11,
    label: "6C"
  },
  {
    value: 13,
    label: "7A"
  },
  {
    value: 15,
    label: "7B"
  },
  {
    value: 17,
    label: "7C"
  },
  {
    value: 19,
    label: "8A"
  },
  {
    value: 21,
    label: "8B"
  },
  {
    value: 23,
    label: "8C"
  },
]

const distances = [
  {
    label: "100m",
    distanceInKm: 0.1,
    value: 1,
  },
  {
    label: "200m",
    distanceInKm: 0.2,
    value: 2,
  },
  {
    label: "500m",
    distanceInKm: 0.5,
    value: 3,
  },
  {
    label: "1km",
    distanceInKm: 1.0,
    value: 4,
  },
  {
    label: "2km",
    distanceInKm: 2.0,
    value: 5,
  },
  {
    label: "5km",
    distanceInKm: 5.0,
    value: 6,
  },
  {
    label: "10km",
    distanceInKm: 10.0,
    value: 7,
  },
  {
    label: "Alle",
    distanceInKm: 100000,
    value: 8,
  },
];

const gradeMapping = {
  "1": "3",
  "2": "3+",
  "3": "4",
  "4": "4+",
  "5": "5",
  "6": "5+",
  "7": "6A",
  "8": "6A+",
  "9": "6B",
  "10": "6B+",
  "11": "6C",
  "12": "6C+",
  "13": "7A",
  "14": "7A+",
  "15": "7B",
  "16": "7B+",
  "17": "7C",
  "18": "7C+",
  "19": "8A",
  "20": "8A+",
  "21": "8B",
  "22": "8B+",
  "23": "8C",
  "24": "8C+"
};

export default function FilterDrawer({
  distanceRadiusStep, handleDistanceRadiusStepChange,
}) {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [gradeValue, setGradeValue] = useState(state.gradeValue);

  const handleToggleDrawer = () => {
    dispatch({ type: "TOGGLE_DRAWER" })
  }
  
  const handleGradeChange = (event, newValue) => {
    setGradeValue(newValue);
  }
  
  const commitGradeValue = () => {
    dispatch({ type: "UPDATE_GRADE_VALUE", value: gradeValue })
  }

  const handleAreaChange = (event) => {
    let value = event.target.value;
    if (typeof value === "number") {
      dispatch({ type: "UPDATE_AREA", value: event.target.value })
      dispatch({ type: "FETCH_BOULDERS" })
    }
  }

  return (
    <Drawer anchor="bottom" open={state.drawerOpen} onClose={handleToggleDrawer}>
      <Container>
        <Box padding={1}>
          <Typography variant="h5">Filter</Typography>
          <Box margin={1}>
            <FormGroup>
              <Typography variant="subtitle1">Grad</Typography>
              <Slider
                value={gradeValue}
                onChange={handleGradeChange}
                onChangeCommitted={commitGradeValue}
                marks={gradeMarks}
                min={1}
                max={24}
                step={1}
                valueLabelFormat={(value) => gradeMapping[value]}
                valueLabelDisplay="auto"
                getAriaValueText={gradeValuetext}
              />
            </FormGroup>
          </Box>
          <FormGroup>
            <Typography variant="subtitle1">Velg område</Typography>
            <Select value={state.area} onChange={handleAreaChange}>
              <MenuItem value={0}>Alle områder</MenuItem>
              <ListSubheader>Oslo</ListSubheader>
              <MenuItem value={1}>Østmarka</MenuItem>
              <MenuItem value={2}>Tokerud</MenuItem>
              <ListSubheader>Nissedal</ListSubheader>
              <MenuItem value={3}>Hægefjell</MenuItem>
            </Select>
          </FormGroup>
          <FormGroup>
            <Typography variant="subtitle1">Avstand fra deg</Typography>
            <Slider
              disabled
              value={distanceRadiusStep}
              onChange={handleDistanceRadiusStepChange}
              // onChangeCommitted={handleSearch}
              marks={distances}
              min={1}
              max={distances.length}
              step={1}
            />
          </FormGroup>
        </Box>
      </Container>
    </Drawer>
  )
};