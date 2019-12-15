<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-bookmark" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">
            <div class="form-group">
              <label class="form__label" name="name">Please enter author name:</label>
              <input class="form__input" type="text" v-model="name"/>
            </div>
            <div class="form-group">
              <label class="form-label">Select the type of the author's book</label>
              <select id="type1" name="type1" class="form-control" type="text" v-model="keyword1">
                <option value="None" selected disabled hidden>Please select book type</option>
                <option value="Horror">Horror</option>
                <option value="Romantic">Romantic</option>
                <option value="History">History</option>
                <option value="Whodunit">Whodunit</option>
                <option value="Military">Military</option>
                <option value="Magic">Magic</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Select the type of the author's book</label>
              <select id="type2" name="type2" class="form-control" type="text" v-model="keyword2">
                <option value="None" selected disabled hidden>Please select book type</option>
                <option value="Horror">Horror</option>
                <option value="Romantic">Romantic</option>
                <option value="History">History</option>
                <option value="Whodunit">Whodunit</option>
                <option value="Military">Military</option>
                <option value="Magic">Magic</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form__label">Please enter number of books of the author</label>
              <input class="form__input" type="number" v-model="numofbooks"/>
            </div>
            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Add the Author</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Adding a new author!</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding···</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import AuthorService from '@/services/authorService'
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
Vue.use(VueSweetalert)
export default {
  name: 'author_form',
  data () {
    return {
      file: null,
      messagetitle: ' Adding Authors ',
      message: '',
      name: '',
      keyword1: 'None',
      keyword2: 'None',
      numofbooks: 0,
      author: {},
      submitStatus: null
    }
  },
  created () {
    this.isSign()
  },
  methods: {
    isSign: function () {
      if (!document.cookie) {
        this.$router.push('/login')
        alert('You need to sign in first')
      }
    },
    submit () {
      console.log('submit!')

      this.submitStatus = 'PENDING'
      setTimeout(() => {
        this.submitStatus = 'OK'
        var author = {
          name: this.name,
          keyword1: this.keyword1,
          keyword2: this.keyword2,
          numofbooks: this.numofbooks
        }
        this.author = author
        console.log('Submitting in NovelForm : ' + JSON.stringify(this.author, null, 5))
        this.submitAuthor(this.author)
      }, 500)
    },
    submitAuthor: function (author) {
      console.log('submit Novel!')
      console.log('Submitting in submitNovel : ' + author)
      AuthorService.postAuthor(author)
        .then(response => {
          this.$router.push('Authors')
          console.log(response)
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
