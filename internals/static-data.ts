const static_data = [
  {
    "index": "about",
    "created_at": 1530193444, 
    "title": "about",
    "image": "",
    "html": "<p><strong>Oopsreview</strong> </p>"
  },
  {
    "index": "privacy",
    "created_at": 1530193444,
    "title": "privacy",
    "image": "",
    "html": "<p>lorem ipsum semi dolor</p>"
  }
]

export function getData(index: String): Object {
  let data
  static_data.map((n: any) => {
    if(n.index === index) {
      data = n
    }
  })

  return data
}
