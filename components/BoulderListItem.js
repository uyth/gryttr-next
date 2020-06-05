import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import { ButtonGroup } from '@material-ui/core/';
import { Box } from '@material-ui/core/';

import { Link } from 'next';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 1),
    textAlign: "left",
    display: "flex",
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  SmallImage: {
    width: 134,
    height: 134,
  },
  BigImage: {
    width: 170,
    height: 170,
  }
}));

const distanceValueText = (distanceInKm) => {
  if (distanceInKm > 10) {
    return Number(distanceInKm).toPrecision(3) + " km"
  } else if (distanceInKm > 1) {
    return Number(distanceInKm).toPrecision(2) + " km"
  } else if (distanceInKm > 0.1) {
    return Number(distanceInKm * 1000).toPrecision(3) + " m"
  } else if (distanceInKm > 0.01) {
    return Number(distanceInKm * 1000).toPrecision(2) + " m"
  } else {
    return Number(distanceInKm * 1000).toPrecision(1) + " m"
  }
}

function BoulderListItem({ image, title, grade, id, distanceInKm, steepness, timeToDry, danger, handleOpenBoulderInMap, boulder }) {
  const classes = useStyles();
  const theme = useTheme();
  const smallAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  const titleText = <Typography variant={smallAndUp ? "h5" : "h6"}><Box color="primary.main" display="inline" fontWeight="fontWeightBold">{grade}</Box> {title}</Typography>;
  const distanceText = <Typography variant="body1">{distanceValueText(distanceInKm)} unna!</Typography>;

  return (
    <Card className={classes.root}>
      <a href={"https://gryttr.com/bulder/" + id} className={smallAndUp ? classes.BigImage : classes.SmallImage}>
        <img
          data-sizes="auto"
          data-srcset={image["srcset"]}
          width={smallAndUp ? 170 : 134}
          className={"lazyload"}
          alt={title}
        />
      </a>
      <Grid container direction="column" spacing={1}>
        <Box padding={2}>
          <Grid item>
            {titleText}
          </Grid>
          <Grid item>
            {smallAndUp &&
              <Grid spacing={1} container className={classes.chipContainer}>
                <Grid item><Chip color="primary" size="small"
                  label={steepness} /></Grid>
                <Grid item><Chip color="primary" size="small"
                  label={timeToDry} /></Grid>
                <Grid item><Chip color="primary" size="small"
                  label={danger} /></Grid>
                <Grid item><Chip color="secondary" size="small"
                  label={"Land"} /></Grid>
                <Grid item><Chip color="secondary" size="small"
                  label={"By"} /></Grid>
                <Grid item><Chip color="secondary" size="small"
                  label={"Samling"} /></Grid>
              </Grid>
            }
          </Grid>
          <Grid item>
            {distanceText}
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button size="small" variant="outlined" color="primary" onClick={() => { handleOpenBoulderInMap(boulder) }} component={Link} href="/map"><MapIcon />&nbsp;Kart</Button>
              <Button size="small" variant="outlined" color="primary" href={"https://gryttr.com/bulder/" + id}>Gryttr</Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </Grid>
    </Card>
  )
}

export default React.memo(BoulderListItem);