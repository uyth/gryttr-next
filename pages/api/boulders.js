// tokerud
import Lysloypa from '../../src/tokerud/lysloypa.json';
import OstOgVest from '../../src/tokerud/ost-og-vestkanten.json';
import Tennisbanen from '../../src/tokerud/tennisbanen.json';

// ostmarka
import Boler from '../../src/ostmarka/boler.json';
import Gronmo from '../../src/ostmarka/gronmo.json';
import Katteputten from '../../src/ostmarka/katteputten.json';
import NedreHellerud from '../../src/ostmarka/nedre-hellerud.json';
import OvreHellerud from '../../src/ostmarka/ovre-hellerud.json';
import Ostmarksetra from '../../src/ostmarka/ostmarksetra.json';
import Skoyenputten from '../../src/ostmarka/skoyenputten.json';
import Skullerud from '../../src/ostmarka/skullerud.json';

// nissedal
import Haegefjell from '../../src/nissedal/haegefjell.json';


const slugToBoulders = {
  "boler": [...Boler["boulders"]],
  "gronmo": [...Gronmo["boulders"]],
  "katteputten": [...Katteputten["boulders"]],
  "nedre-hellerud": [...NedreHellerud["boulders"]],
  "ovre-hellerud": [...OvreHellerud["boulders"]],
  "ostmarksetra": [...Ostmarksetra["boulders"]],
  "skoyenputten": [...Skoyenputten["boulders"]],
  "skullerud": [...Skullerud["boulders"]],
  "lysloypa": [...Lysloypa["boulders"]],
  "ost-og-vestkanten": [...OstOgVest["boulders"]],
  "tennisbanne": [...Tennisbanen["boulders"]],
  "haegefjell": [...Haegefjell["boulders"]],
}

export default (req, res) => {
    let areas = req.query.areas.split(",");
    let boulders = []
    if (areas.length > 0) {
      areas.map(area => {
        if (slugToBoulders[area]) {
          boulders.push(...slugToBoulders[area])
        }
      })
    }
    res.statusCode = 200
    res.json({ boulders: boulders })
  }
  