import axios from 'axios'

export const request = function ({method, url, data}) {
  return axios({
    method,
    url,
    data
  })
}
