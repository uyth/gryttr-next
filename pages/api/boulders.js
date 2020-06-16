import { slugToBoulders, boulderMatchesQuery } from "../../src/searchUtils";

function getBouldersFromSlugs(slugs, query) {
  return slugs.reduce((acc, slug) => {
    if (slugToBoulders[slug]) {
      let boulders = slugToBoulders[slug]
        .filter(boulder => query ? boulderMatchesQuery(boulder.title, query) : true)
      acc.push(...boulders);
    }
    return acc;
  }, [])
}

export default (req, res) => {
  let slugs = req.query.areas.split(",");
  let query = req.query.query;
  let boulders = []
  if (slugs.length > 0) {
    if (slugs[0] == "") {
      slugs = Object.keys(slugToBoulders);
    }
    boulders = getBouldersFromSlugs(slugs, query);
  }
  res.statusCode = 200
  res.json({ boulders: boulders })
}
  