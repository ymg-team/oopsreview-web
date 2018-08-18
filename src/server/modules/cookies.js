const { NODE_ENV } = process.env

export function set(req, res, key, val) {
  const options = {
    path: '/',
    domain: NODE_ENV === 'development' ? 'oopsreview.local' : 'oopsreview.com',
    secure: false,
    httpOnly: true
  }
  res.setCookie(key, val, options);
}

export function get(req, res, key) {
  return {}
}

export function destroy(req, res, key, val) {
  if(req.cookies[key])
    res.clearCookie(key)
}
