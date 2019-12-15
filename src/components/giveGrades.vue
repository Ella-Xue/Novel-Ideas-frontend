<template v-if="childDataLoaded">
  <div id = "app">
  <h3 class="vue-title"><i class="fa fa-book" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="app1" class="hero">
    <b-container class="text-center">
      <b-row>
        <b-col class="mr-sm-2" align-self="center"><h6>Give your grade: </h6></b-col>
        <b-col><input class="form__input" type="number" v-model="grade"/></b-col>
        <b-col><button class="btn btn-primary btn1" type="submit" @click="givegrade">Save</button></b-col>
      </b-row>
    </b-container>
    <br/>
    <br/>
    <b-table table-variant="secondary" striped stacked :items="novel" bordered>
    </b-table>
    <div>
      <br/>
      <b-row>
        <b-col md="auto"><h6 class="toast-header">Your Comment to this novel</h6></b-col>
        <b-col><button type="button" class="btn btn-outline-info" @click="givecomment">Submit Comment</button></b-col>
      </b-row>
      <b-form-textarea
        id="textarea"
        v-model="comment"
        placeholder="Enter..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import NovelService from '@/services/NovelService'
import { required, minLength, between } from 'vuelidate/lib/validators'
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
Vue.use(VueSweetalert)
export default {
  name: 'NovelDetails',
  data () {
    return {
      messagetitle: ' give your comment ',
      novel: [],
      childDataLoaded: false,
      errors: [],
      comment: '',
      grade: 0
    }
  },
  validations: {
    message: {
      required,
      minLength: minLength(5)
    },
    newgrade: {
      required,
      between: between(0, 5)
    }
  },
  created () {
    this.getNovel()
  },
  methods: {
    getNovel: function () {
      NovelService.fetchNovel(this.$router.params)
        .then(response => {
          console.log(this.$router.params)
          this.novel = response.data
          this.childDataLoaded = true
          console.log(this.novel)
          console.log(response.data)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    givegrade: function (novel) {
      this.novel[0].grade = this.grade
      NovelService.giveGrade(this.$router.params, this.novel[0])
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(novel, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    givecomment: function (novel) {
      this.novel[0].comment = '#' + this.comment
      NovelService.giveComment(this.$router.params, this.novel[0])
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(novel, null, 5))
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
  .toast-header{
    text-align: center;
    font-size: 25pt;
  }
  #app1 {
    /*width: 70%;*/
    margin-top: 100px;
    margin-left: 280px;
    margin-right: 280px;
  }
  /*#app{*/
  /*  background-image: url("../assets/grade_background.jpg");*/
  /*  background-repeat:no-repeat;*/
  /*  background-position:center;*/
  /*  background-size:cover;*/
  /*  !*background-attachment:fixed;*!*/
  /*}*/
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
</style>
