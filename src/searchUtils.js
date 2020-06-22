// tokerud
import Lysloypa from './tokerud/lysloypa.json';
import OstOgVest from './tokerud/ost-og-vestkanten.json';
import Tennisbanen from './tokerud/tennisbanen.json';

// ostmarka
import Boler from './ostmarka/boler.json';
import Gronmo from './ostmarka/gronmo.json';
import Katteputten from './ostmarka/katteputten.json';
import NedreHellerud from './ostmarka/nedre-hellerud.json';
import OvreHellerud from './ostmarka/ovre-hellerud.json';
import Ostmarksetra from './ostmarka/ostmarksetra.json';
import Skoyenputten from './ostmarka/skoyenputten.json';
import Skullerud from './ostmarka/skullerud.json';

// nissedal
import Haegefjell from './nissedal/haegefjell.json';

export const slugToBoulders = {
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
  "tennisbanen": [...Tennisbanen["boulders"]],
  "haegefjell": [...Haegefjell["boulders"]],
}

export function boulderMatchesQuery(title, query) {
  let r = new RegExp(`\\b${query}`, "i")
  return r.exec(title);
}

import axios from 'axios';

const makeRequestCreator = () => {
  let source;

  return async (options) => {
    // Check if we made a request
    if(source){
      // Cancel the previous request before making a new request
      source.cancel()
    }
    // Create a new CancelToken
    source = axios.CancelToken.source()
    try{
      const result = await axios({...options, cancelToken: source.token})
      return result.data
    } catch(error) {
        if(axios.isCancel(error)) {
          // Handle if request was cancelled
          console.log('Request canceled', error.message);
        } else {
          // Handle usual errors
          console.log('Something went wrong: ', error.message)
        }
    }
  }
}

export const fetchBoulders = makeRequestCreator()

export const fetchAutocomplete = makeRequestCreator()