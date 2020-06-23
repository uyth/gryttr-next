import { slugToBoulders, boulderMatchesQuery } from "../../src/searchUtils";
import { gradeValues } from '../../src/gradeValues';


function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function getBouldersFromSlugs(country, slugs, query, gradeValue) {
  return slugs.reduce((acc, slug) => {
    if (slugToBoulders[country][slug]) {
      let boulders = slugToBoulders[country][slug]
        .filter(boulder => query ? boulderMatchesQuery(boulder.title, query) : true)
        .filter((boulder) => Number(gradeValue[0]) <= swap(gradeValues)[boulder.grade.title])
        .filter((boulder) => swap(gradeValues)[boulder.grade.title] <= Number(gradeValue[1]))
      acc.push(...boulders);
    }
    return acc;
  }, [])
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
  lat1 = Number(lat1)
  lon1 = Number(lon1)
  lat2 = Number(lat2)
  lon2 = Number(lon2)
  unit = "K"
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var radlon1 = Math.PI * lon1 / 180
  var radlon2 = Math.PI * lon2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit === "K") { dist = dist * 1.609344 } // km
  if (unit === "N") { dist = dist * 0.8684 }
  return dist
}

export default (req, res) => {
  let country = req.query.country;
  let slugs = req.query.areas.split(",");
  let gradeValue = req.query.gradeValue.split(",");
  let query = req.query.query;
  let geoLocation = req.query.geoLocation.split(",");
  let distanceRadiusInKm = req.query.distanceRadiusInKm;
  let boulders = []
  if (slugs.length > 0) {
    if (slugs[0] == "") {
      slugs = Object.keys(slugToBoulders[country]);
    }
    boulders = getBouldersFromSlugs(country, slugs, query, gradeValue);
    if (geoLocation) {
      boulders = boulders
      // add distanceInKm
      .reduce((acc, boulder) => {
        acc.push({...boulder, distanceInKm: calculateDistance(boulder.latitude, boulder.longitude, geoLocation[0], geoLocation[1])})
        return acc;
      }, [])
      if (distanceRadiusInKm) {
        // filter on radius
        boulders = boulders.filter(boulder => distanceRadiusInKm >= boulder.distanceInKm)
      }
    }
  }
  res.statusCode = 200
  res.json({ boulders: boulders })
}
  