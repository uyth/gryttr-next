import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
  chipContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  CardActions: {
    justifyContent: "flex-end",
  },
  Card: {
    margin: theme.spacing(1, 1),
    textAlign: "left"
  },
  CardImage: {
    height: 375,
  },
  CardImageMedium: {
    height: 200,
  },
  CardImageSmall: {
    height: 140,
  },
  List: {
    margin: theme.spacing(1, 1),
    textAlign: "left",
    display: "flex",
  },
  ListContent: {
    display: "flex",
    flexDirection: "column",
  },
  ListImage: {
    width: 134,
    height: 134,
  },
  ListBigImage: {
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
  const mediumAndUp = useMediaQuery(theme.breakpoints.up('md'));

  const chipContainer = <Grid spacing={1} container className={classes.chipContainer}>
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

  const buttons = <div>
    <ButtonGroup>
      <Button size="small" variant="outlined" color="primary" onClick={() => { handleOpenBoulderInMap(boulder) }} component={Link} href="/map"><MapIcon />&nbsp;Kart</Button>
      <Button size="small" variant="outlined" color="primary" href={"https://gryttr.com/bulder/" + id}>Gryttr</Button>
    </ButtonGroup>
  </div>

  const titleText = <Typography variant={smallAndUp ? "h5" : "h6"}><Box color="primary.main" display="inline" fontWeight="fontWeightBold">{grade}</Box> {title}</Typography>;
  const distanceText = <Typography variant="body1">{distanceValueText(distanceInKm)} unna!</Typography>;

  return (
    <Card className={classes.List}>
      <CardActionArea className={smallAndUp ? classes.ListBigImage : classes.ListImage} href={"https://gryttr.com/bulder/" + id}>
        <CardMedia image={image["srcset"].split(", ")[2].split(" ")[0]} className={smallAndUp ? classes.ListBigImage : classes.ListImage} />
      </CardActionArea>
      <CardContent className={classes.ListContent}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            {titleText}
          </Grid>
          <Grid item>
            {smallAndUp && chipContainer}
          </Grid>
          <Grid item>
            {distanceText}
          </Grid>
          <Grid item>
            {buttons}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default React.memo(BoulderListItem);