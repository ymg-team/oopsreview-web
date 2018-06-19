import axios from 'axios'

export default function request(method: string, url: string, formdata?: object) {
  method = method.toLowerCase()
    return new Promise((resolve, reject) => {
      switch(method) {
        case 'get':
          return axios.get(url)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error))
      }
    })
}
