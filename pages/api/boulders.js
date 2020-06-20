import { slugToBoulders, boulderMatchesQuery } from "../../src/searchUtils";
import { gradeValues } from '../../src/gradeValues';


function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function getBouldersFromSlugs(slugs, query, gradeValue) {
  return slugs.reduce((acc, slug) => {
    if (slugToBoulders[slug]) {
      let boulders = slugToBoulders[slug]
        .filter(boulder => query ? boulderMatchesQuery(boulder.title, query) : true)
        .filter((boulder) => Number(gradeValue[0]) <= swap(gradeValues)[boulder.grade.title])
        .filter((boulder) => swap(gradeValues)[boulder.grade.title] <= Number(gradeValue[1]))
      acc.push(...boulders);
    }
    return acc;
  }, [])
}

export default (req, res) => {
  let slugs = req.query.areas.split(",");
  let gradeValue = req.query.gradeValue.split(",");
  let query = req.query.query;
  let boulders = []
  if (slugs.length > 0) {
    if (slugs[0] == "") {
      slugs = Object.keys(slugToBoulders);
    }
    boulders = getBouldersFromSlugs(slugs, query, gradeValue);
  }
  res.statusCode = 200
  res.json({ boulders: boulders })
}
  