import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: 'http://localhost:3000/'
    baseURL: 'https://novelideas-api.herokuapp.com/'
    // baseURL: 'https://novelideas-prod.herokuapp.com/'
  })
}
