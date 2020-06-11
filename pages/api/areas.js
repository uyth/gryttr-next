export default (req, res) => {
  let areas = [
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
          "key": "tennisbanenn"
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
  res.statusCode = 200
  res.json({ areas: areas })
}
