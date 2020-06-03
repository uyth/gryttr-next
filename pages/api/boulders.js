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

export default (req, res) => {
    let area = Number(req.query.area);
    let boulders = []
    if (area === 1 || area === 0) {
        boulders.push(
          ...Boler["boulders"],
          ...Gronmo["boulders"],
          ...Katteputten["boulders"],
          ...NedreHellerud["boulders"],
          ...OvreHellerud["boulders"],
          ...Ostmarksetra["boulders"],
          ...Skoyenputten["boulders"],
          ...Skullerud["boulders"],
        )
      }
      if (area === 2 || area === 0) {
        boulders.push(
          ...Lysloypa["boulders"],
          ...OstOgVest["boulders"],
          ...Tennisbanen["boulders"],
        )
      }
      if (area === 3 || area === 0) {
        boulders.push(
          ...Haegefjell["boulders"],
        )
      }
    res.statusCode = 200
    res.json({ boulders: boulders })
  }
  