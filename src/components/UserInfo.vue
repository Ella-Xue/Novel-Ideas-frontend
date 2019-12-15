<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-comments" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="mt-4">
      <b-card img-src="../assets/card.jpg" img-left title="About Me" border-variant="success">
        <b-row>
          <b-col class="bg-light">
            <br/>
            <b-row>
              <b-col><h5 class="toast-header">Username</h5></b-col>
              <b-col id = "u1">{{this.username}}</b-col>
            </b-row>
            <br/>
            <b-row>
              <b-col><h5 class="toast-header">Age</h5></b-col>
              <b-col id = "u2">{{this.age}}</b-col>
            </b-row>
            <br/>
            <b-row>
              <b-col><h5 class="toast-header">Gender</h5></b-col>
              <b-col id = "u3">{{this.gender}}</b-col>
            </b-row>
            <br/>
            <b-row>
              <b-col><h5 class="toast-header">Email</h5></b-col>
              <b-col id = "u4">{{this.email}}</b-col>
            </b-row>
            <br/>
          </b-col>
          <b-col>
            <br/>
            <h1><i style="color: lightslategrey">Share your secret</i></h1>
            <br/>
            <h1><i style="color: darkcyan">ideals here</i></h1>
            <b-row>
              <b-col><b-button to="/editInfo" variant="outline-info" >Edit Info</b-button></b-col>
              <b-col ><b-button to="/changePsd" variant="outline-secondary" >Change Password</b-button></b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/userService'
export default {
  name: 'UserInfo',
  data () {
    return {
      messagetitle: ' User Card',
      userData: '',
      user: [],
      username: '',
      age: 0,
      gender: '',
      email: ''
    }
  },
  created () {
    this.getUser()
    this.isSign()
  },
  methods: {
    isSign: function () {
      if (!document.cookie) {
        this.$router.push('/login')
        alert('You need to sign in first')
      }
    },
    getUser: function () {
      if (!document.cookie) {
        this.$router.push('/login')
      } else {
        this.userData = document.cookie.substring(3)
        UserService.fetchUser(this.userData)
          .then(response => {
            console.log(this.userData)
            this.user = response.data
            this.username = response.data[0].username
            this.age = response.data[0].age
            this.gender = response.data[0].gender
            this.email = response.data[0].email
            console.log(response.data)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
