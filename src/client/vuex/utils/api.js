import Vue from 'vue'

export function request(method, url, formdata) {
  method = method.toLowerCase()
  return Vue.http[method](url, request)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}
