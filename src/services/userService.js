import Api from '@/services/api'

export default {
  userRegister (user) {
    return Api().post('/user', user,
      { headers: {'Content-type': 'application/json'} })
  },
  signIn (user) {
    return Api().post('/user/login', user,
      { headers: {'Content-type': 'application/json'} })
  },
  fetchUser (id) {
    return Api().get(`/user/${id}`)
  },
  editInfo (id, user) {
    console.log('REQUESTING ' + user._id + ' ' +
      JSON.stringify(user, null, 5))
    return Api().put(`/user/${id}/info`, user,
      { headers: {'Content-type': 'application/json'} })
  },
  postusernovels (id, user) {
    console.log('REQUESTING ' + user._id + ' ' +
      JSON.stringify(user, null, 5))
    return Api().put(`/user/${id}/novels`, user,
      { headers: {'Content-type': 'application/json'} })
  },
  postuserauthors (id, user) {
    console.log('REQUESTING ' + user._id + ' ' +
      JSON.stringify(user, null, 5))
    return Api().put(`/user/${id}/authors`, user,
      { headers: {'Content-type': 'application/json'} })
  },
  editPassword (id, user) {
    console.log('REQUESTING ' + user._id + ' ' +
      JSON.stringify(user, null, 5))
    return Api().put(`/user/${id}`, user,
      { headers: {'Content-type': 'application/json'} })
  }
}
