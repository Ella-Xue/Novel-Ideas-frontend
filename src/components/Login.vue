<template>
  <div>
    <b-card
      overlay
      img-src="../assets/login_background.jpg"
      img-height=80%
      img-width=80%
      img-alt="Card Image"
      text-variant="black"
    >
      <b-card-text>
        <h1 class = vue-title>Welcome to Novel Ideals</h1>
        <b-container >
          <br/>
          <br/>
          <b-row>
            <b-col ></b-col>
            <b-col md="auto" class="toast-header"><h4>Username:</h4></b-col>
            <b-col md="auto"><b-form-input v-model="username"></b-form-input></b-col>
            <b-col ></b-col>
          </b-row>
          <b-row>
            <b-col ></b-col>
            <b-col md="auto" class="toast-header"><h4>Password:</h4></b-col>
            <b-col md="auto"><b-form-input type = "password" v-model="password"></b-form-input></b-col>
            <b-col ></b-col>
          </b-row>
          <p style="color:#FF0000"><b>{{errmessages}}</b></p>
          <b-row>
            <b-col ></b-col>
            <b-button to ="/register" md="auto" variant="outline-secondary" ><h5>Register</h5></b-button>
            <b-col ></b-col>
            <b-button md="auto" variant="outline-secondary" @click = userlogin><h5>Sign In</h5></b-button>
            <b-col ></b-col>
          </b-row>

        </b-container>
      </b-card-text>
    </b-card>
  </div>

</template>

<script>
import UserService from '@/services/userService'
export default {
  name: 'Login',
  data () {
    return {
      errmessages: '',
      username: '',
      password: ''
    }
  },
  methods: {
    userlogin: function () {
      setTimeout(() => {
        var user = {
          username: this.username,
          password: this.password
        }
        this.user = user
        this.login(this.user)
      }, 500)
    },
    login: function (user) {
      UserService.signIn(user)
        .then(response => {
          if (response.data.message !== 'Sign in Successfully') {
            this.errmessages = 'Your username or password is wrong'
            this.password = ''
          } else {
            document.cookie = ('id = ' + response.data.data._id)
            var id = document.cookie.substring(3)
            console.log(document.cookie)
            console.log(id)
            // response.cookie('userData', this.username)
            // this.errmessages = 'Sign in successfully'
            console.log('Register!!')
            console.log('Submitting in submitUser : ' + user)
            this.$router.push('/')
            window.location.reload()
          }
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
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
