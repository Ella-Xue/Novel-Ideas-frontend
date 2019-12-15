<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/images_novel_logo.jpg" height="40" width="120" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Novel-Ideas</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
         <b-nav-item-dropdown text="Novel bookcase" right>
            <b-dropdown-item to ="/novels"> <i class="fa fa-book" style="padding: 5px">Novels</i></b-dropdown-item>
            <b-dropdown-item to ="/authors"><i class="fa fa-plus-square" style="padding: 5px">Authors</i></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="My Diary" right>
            <b-dropdown-item to ="/myassets"> <i class="fa fa-book" style="padding: 5px">my assets</i></b-dropdown-item>
            <b-dropdown-item to ="/addmynovels"> <i class="fa fa-book" style="padding: 5px">add my novels</i></b-dropdown-item>
            <b-dropdown-item to ="/addmyauthor"><i class="fa fa-plus-square" style="padding: 5px">collect authors</i></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Recommend" right>
            <b-dropdown-item to ="/addnovels"> <i class="fa fa-book" style="padding: 5px">share novels</i></b-dropdown-item>
            <b-dropdown-item to ="/addauthor"><i class="fa fa-plus-square" style="padding: 5px">share authors</i></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
<!--          <b-nav-form>-->
<!--            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
<!--            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
<!--          </b-nav-form>-->
          <b-nav-item-dropdown text="User Account" right>
            <b-dropdown-item to ="/login"><i class="fa fa-user-o" style="padding: 5px"> {{this.username}} </i></b-dropdown-item>
            <b-dropdown-item to ="/Info"> <i class="fa fa-user" style="padding: 5px">User Acount</i></b-dropdown-item>
            <b-dropdown-item> <i class="fa fa-user" style="padding: 5px" @click=Signout>Sign out</i></b-dropdown-item>
<!--            <b-dropdown-item to ="/register"> <i class="fa fa-user" style="padding: 5px">Register</i></b-dropdown-item>-->
          </b-nav-item-dropdown>
<!--          <b-dropdown id="dropdown-text" text="User Account" class="m-2" right>-->

<!--            <b-dropdown-text>And this is more example text.</b-dropdown-text>-->
<!--            <b-dropdown-divider></b-dropdown-divider>-->
<!--            <b-dropdown-item-button to ="/register">User Register</b-dropdown-item-button>-->
<!--            <b-dropdown-item-button to ="/login">Sign In</b-dropdown-item-button>-->
<!--          </b-dropdown>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import UserService from '@/services/userService'
export default {
  name: 'App',
  data () {
    return {
      username: '',
      userData: '',
      user: []
    }
  },
  created () {
    this.getUser()
    this.$router.params = this.user
  },
  methods: {
    // isSign: function () {
    //   if (!document.cookie) {
    //     this.$router.push('/login')
    //     alert('You need to sign in first')
    //   }
    // },
    getUser: function () {
      if (!document.cookie) {
        this.username = 'Sign in'
      } else {
        this.userData = document.cookie.substring(3)
        UserService.fetchUser(this.userData)
          .then(response => {
            console.log(this.userData)
            this.user = response.data
            this.username = response.data[0].username
            console.log(response.data)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }
    },
    Signout: function () {
      // document.cookie = ('')
      document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      window.location.reload()
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
  body{
    background-image: url("../src/assets/background.jpg");
    background-repeat:no-repeat;
    background-size: 100% 100%;
  }
</style>
