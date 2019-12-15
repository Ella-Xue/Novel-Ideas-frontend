<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-book" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id = "recommend form">
      <b-form-group
        label-cols-lg="3"
        label="Record fond author"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <br/>
        <b-form-group label-cols-sm="3" label="Name:" label-align-sm="right" >
          <b-form-input v-model="authors.name"></b-form-input>
        </b-form-group>
        <br/>
        <b-form-group label-cols-sm="3" label="Main Type:" label-align-sm="right" >
          <b-form-input v-model="authors.keyword1"></b-form-input>
        </b-form-group>
        <br/>
        <b-form-group label-cols-sm="3" label="Second Type:" label-align-sm="right" >
          <b-form-input v-model="authors.keyword2"></b-form-input>
        </b-form-group>
        <br/>
        <b-form-group label-cols-sm="3" label="numofbooks:" label-align-sm="right" >
          <b-form-input v-model="authors.numofbooks" type = "number"></b-form-input>
        </b-form-group>
        <br/>
      </b-form-group>
      <b-button squared variant="secondary" @click="postAuthors">Collect Author</b-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import UserService from '@/services/userService'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
Vue.use(VueSweetalert)
export default {
  name: 'addmyauthors',
  data () {
    return {
      file: null,
      messagetitle: ' Collect Authors ',
      message: '',
      userData: '',
      authors: {
        name: '',
        keyword1: '',
        keyword2: '',
        numofbooks: 0
      },
      user: {}
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser: function () {
      if (!document.cookie) {
        this.$router.push('/login')
      } else {
        this.userData = document.cookie.substring(3)
        UserService.fetchUser(this.userData)
          .then(response => {
            console.log(this.userData)
            this.user = response.data[0]
            console.log(this.user)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }
    },
    postAuthors: function () {
      this.user.authors = this.authors
      UserService.postuserauthors(this.userData, this.user)
        .then(response => {
          console.log(response)
          this.$router.push('/myassets')
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
  #app1 {
    width: 95%;
    margin: 20px;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }
  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
