import { slugToBoulders, boulderMatchesQuery } from "../../src/searchUtils";

function getBoulderNames(country, slugs, query) {
  return slugs.reduce((acc, slug) => {
    if (slugToBoulders[country][slug]) {
      let boulders = slugToBoulders[country][slug];
      boulders = boulders.reduce((acc, boulder) => {
        if (boulderMatchesQuery(boulder.title, query)) {
          acc.push({value: boulder.title})
        }
        return acc;
      }, [])
      acc.push(...boulders);
    }
    return acc;
  }, [])
}

export default (req, res) => {
  let query = req.query.query;
  let country = req.query.country;
  let boulders = [];
  if (query) {
    let slugs = Object.keys(slugToBoulders[country]);
    boulders = getBoulderNames(country, slugs, query)
      .slice(0,5); 
  }
  res.statusCode = 200
  res.json({ boulders: boulders })
}