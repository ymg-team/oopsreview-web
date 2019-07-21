import axios from "axios"

// ref: https://github.com/axios/axios#global-axios-defaults
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"

export default function request(
  method: any = "get",
  url: string,
  formdata: object = {}
) {
  method = method.toLowerCase()
  return new Promise((resolve, reject) => {
    let config = {
      method,
      url,
      data: {}
    }
    if (method != "get") {
      if (formdata) {
        let formdata_input = new FormData()
        const keys = Object.keys(formdata)
        keys.map(n => {
          formdata_input.set(n, formdata[n])
        })

        config.data = formdata_input
      }
      // config.config = { headers: {'Content-Type': 'multipart/form-data' }}
    }
    return axios(config)
      .then((response: any) => {
        const { status, data } = response
        resolve({ status, data })
      })
      .catch((error: any) => reject(error))
  })
}
