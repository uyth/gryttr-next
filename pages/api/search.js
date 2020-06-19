import { slugToBoulders, boulderMatchesQuery } from "../../src/searchUtils";

function getBoulderNames(slugs, query) {
  return slugs.reduce((acc, slug) => {
    if (slugToBoulders[slug]) {
      let boulders = slugToBoulders[slug];
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
  let slugs = Object.keys(slugToBoulders);
  let boulders = getBoulderNames(slugs, query)
    .slice(0,5);
  res.statusCode = 200
  res.json({ boulders: boulders })
}