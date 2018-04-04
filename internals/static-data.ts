const static_data = [
  {
    "index": "about",
    "title": "about",
    "text": "lorem ipsum semi dolor"
  },
  {
    "index": "privacy",
    "title": "privacy",
    "text": "lorem ipsum semi dolor"
  }
]

export function getData(index: String): Object {
  let found = false
  static_data.map((n: any) => {
    if(n.index = index) {
      found = true 
      n.status = 200
      return n
    }
  })

  return {status: 204}
}