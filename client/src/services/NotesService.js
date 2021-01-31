import Api from '@/services/api'

export default {
  addNote (params) {
    return Api().post('notes', params)
  },
  getNote (params) {
    return Api().get('/' + params.uniqUrl)
  },
  deleteNote (params) {
    return Api().delete('/' + params.uniqUrl + '/' + params.password)
  },
  accessNote (params) {
    return Api().post('/' + params.uniqUrl + '/' + params.password)
  }
}
