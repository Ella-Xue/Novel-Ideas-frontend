import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Novels from '@/components/Novels'
import Authors from '@/components/Authors'
import Userassets from '@/components/userassets'
import Addnovels from '@/components/addnovels'
import Addusernovels from '@/components/addusernovels'
import Addauthor from '@/components/addAuthors'
import Adduserauthor from '@/components/adduserauthors'
import Comment from '@/components/Comment'
import giveGrades from '@/components/giveGrades'
import Register from '@/components/Register'
import Login from '@/components/Login'
import UserInfo from '@/components/UserInfo'
import EditInfo from '@/components/editInfo'
import ChangePsd from '@/components/changePsd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/novels',
      name: 'Novel',
      component: Novels
    },
    {
      path: '/addnovels',
      name: 'recommendation',
      component: Addnovels
    },
    {
      path: '/myassets',
      name: 'myassets',
      component: Userassets
    },
    {
      path: '/addmynovels',
      name: 'addmynovels',
      component: Addusernovels
    },
    {
      path: '/authors',
      name: 'Author',
      component: Authors
    },
    {
      path: '/addauthor',
      name: 'collect',
      component: Addauthor
    },
    {
      path: '/addmyauthor',
      name: 'addmyauthor',
      component: Adduserauthor
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'SignIn',
      component: Login,
      props: true
    },
    {
      path: '/comment',
      name: 'Comments',
      component: Comment
    },
    {
      path: '/giveGrade',
      name: 'grade',
      component: giveGrades,
      props: true
    },
    {
      path: '/Info',
      name: 'userInfo',
      component: UserInfo,
      props: true
    },
    {
      path: '/editInfo',
      name: 'editInfo',
      component: EditInfo,
      props: true
    },
    {
      path: '/changePsd',
      name: 'changePsd',
      component: ChangePsd
    }
  ]
})
