import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import NewNote from '@/components/NewNote'
import GetNote from '@/components/GetNote'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/notes/new',
      name: 'NewNote',
      component: NewNote
    },
    {
      path: '/:uniqUrl',
      name: 'GetNote',
      component: GetNote
    },
    {
      path: '/:uniqUrl/:password',
      name: 'DeleteNote',
      component: GetNote
    },
    {
      path: '/:uniqUrl/:password',
      name: 'AccessNote',
      component: GetNote
    }
  ]
})
