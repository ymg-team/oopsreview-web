import { decString } from "./password"
const { NODE_ENV } = process.env

export function set(req, res, key, val) {
  const options = {
    path: "/",
    domain: NODE_ENV === "development" ? "localhost" : "oopsreview.com",
    secure: false,
    httpOnly: true
  }
  res.setCookie(key, val, options)
}

export function get(req, res, key) {
  const cookies = req.cookies[key]
  if (cookies) {
    let sessiondata = decString(cookies)
    return JSON.parse(sessiondata)
  } else {
    return {}
  }
}

export function destroy(req, res, key, val) {
  if (req.cookies[key]) res.clearCookie(key)
}
