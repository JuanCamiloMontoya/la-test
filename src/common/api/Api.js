import { apiUrl } from "../config/Environments"

class Api {

  async get(endpoint, data) {
    endpoint = `${apiUrl}${endpoint}`
    if (data)
      Object.keys(data).forEach(key => endpoint.searchParams.append(key, data[key]))
    return fetch(endpoint, {
      method: 'GET'
    })
      .then(response => {
        return response.json().then(body => {
          if (response.status === 200) {
            return body
          } else {
            throw Error(body.message)
          }
        })
      })
  }
}

export default new Api()