const { NODE_ENV } = process.env

export function set(req, res, key, val) {
  // {
  //   path: '/',
  //   domain: NODE_ENV === 'development' ? 'http://localhost:19090' : 'https://oopsreview.com',
  //   secure: true,
  //   httpOnly: true
  // }
  res.setCookie(key, val);
}

export function get(req, res, key) {
  return {}
}

export function destroy(req, res, key, val) {
  if(req.cookies[key])
    res.clearCookie(key)
}
