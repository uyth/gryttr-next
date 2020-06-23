const AREAS_NOR = [
  {
    "title": "Østmarka",
    "key": "ostmarka",
    "children": [
      {
        "title": "Bøler",
        "key": "boler"
      },
      {
        "title": "Grønmo",
        "key": "gronmo"
      },
      {
        "title": "Katteputten",
        "key": "katteputten"
      },
      {
        "title": "Nedre Hellerud",
        "key": "nedre-hellerud"
      },
      {
        "title": "Øvre Hellerud",
        "key": "ovre-hellerud"
      },
      {
        "title": "Østmarksetra",
        "key": "ostmarksetra"
      },
      {
        "title": "Skøyenputten",
        "key": "skoyenputten"
      },
      {
        "title": "Skullerud",
        "key": "skullerud"
      }
    ]
  },
  {
    "title": "Tokerud",
    "key": "tokerud",

    "children": [
      {
        "title": "Lysløypa",
        "key": "lysloypa"
      },
      {
        "title": "Øst og vestkanten",
        "key": "ost-og-vestkanten"
      },
      {
        "title": "Tennisbanen",
        "key": "tennisbanen"
      },
    ],
  },
  {
    "title": "Nissedal",
    "key": "nissedal",
    "children": [
      {
        "title": "Hægefjell",
        "key": "haegefjell"
      },
    ]
  }
]

const AREA_SWE = [
  {
    "title": "Häller",
    "key": "haller",
    "children": [
      {
        "title": "Blocksamlingen",
        "key": "blocksamlingen"
      },
      {
        "title": "Mellberg",
        "key": "mellberg"
      },
    ]
  }
];

const countryMapper = {
  nor: AREAS_NOR,
  swe: AREA_SWE
}

export default (req, res) => {
  let country = req.query.country;
  res.statusCode = 200
  res.json({ areas: countryMapper[country] })
}
