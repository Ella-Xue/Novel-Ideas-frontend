import Api from '@/services/api'

export default {
  fetchNovels () {
    return Api().get('/novels')
  },
  postNovel (novel) {
    return Api().post('/novels', novel,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteNovel (id) {
    return Api().delete(`/novels/${id}`)
  },
  fetchNovel (id) {
    return Api().get(`/novels/${id}`)
  },
  giveGrade (id, novel) {
    console.log('REQUESTING ' + novel._id + ' ' +
      JSON.stringify(novel, null, 5))
    return Api().put(`/novels/${id}`, novel,
      { headers: {'Content-type': 'application/json'} })
  },
  giveComment (id, novel) {
    console.log('REQUESTING ' + novel._id + ' ' +
      JSON.stringify(novel, null, 5))
    return Api().put(`/novels/${id}/comment`, novel,
      { headers: {'Content-type': 'application/json'} })
  }
}
