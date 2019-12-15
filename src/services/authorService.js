import Api from '@/services/api'

export default {
  fetchAuthors () {
    return Api().get('/author')
  },
  postAuthor (author) {
    return Api().post('/author', author,
      { headers: {'Content-type': 'application/json'} })
  },
  // giveGrade (id, grade) {
  //   return Api().put(`/novels/${id}`, grade,
  //     { headers: {'Content-type': 'application/json'} })
  // },
  deleteAuthor (id) {
    return Api().delete(`/author/${id}`)
  },
  fetchAuthor (id) {
    return Api().get(`/author/${id}`)
  }

}
