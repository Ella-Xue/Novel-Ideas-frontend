<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-book" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">
            <div class="form-group">
              <label class="form__label" name="name">Please enter book name</label>
              <input class="form__input" type="text" v-model.trim="name"/>
            </div>
            <div class="form-group">
              <label class="form__label" name="author">Please enter book author</label>
              <input class="form__input" type="text" v-model.trim="author"/>
            </div>
            <div class="form-group">
              <label class="form-label">Select novel Type</label>
              <select id="type" name="type" class="form-control" type="text" v-model="type">
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
              <label class="form__label">Please enter book recommender</label>
              <input class="form__input" type="text" v-model.trim="recommender"/>
            </div>
            <div class="form-group" :class="{ 'form-group--error': $v.grade.$error }">
               <label class="form-control-label" name="grade">Please give a initial grade (Enter a number between 1 and 5)</label>
               <input class="form__input" type="number" v-model.trim="grade"/>
            </div>

            <div class="form-group" :class="{ 'form-group--error': $v.message.$error }">
              <label class="form__label">Recommend reason</label>
              <input class="form__input" v-model.trim="$v.message.$model"/>
            </div>
            <div class="error" v-if="!$v.message.required">Comment is Required</div>
            <div class="error" v-if="!$v.message.minLength">Comment must have at least {{$v.message.$params.minLength.min}} letters.</div>
<!--            <div>-->
<!--              &lt;!&ndash; Styled &ndash;&gt;-->
<!--              <b-form-file-->
<!--                accept="image/jpeg, image/png, image/gif"-->
<!--                v-model="file"-->
<!--                :state="Boolean(file)"-->
<!--                placeholder="Choose a file or drop it here..."-->
<!--                drop-placeholder="Drop file here..."-->
<!--              ></b-form-file>-->
<!--              <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>-->
<!--            </div>-->
            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Put your novels</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Recommending a new novel!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
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
  name: 'recommendation',
  data () {
    return {
      file: null,
      messagetitle: ' Recommend novels ',
      message: '',
      name: '',
      author: '',
      type: 'None',
      recommender: '',
      grade: 0,
      novel: {},
      // bookimage: '',
      submitStatus: null
    }
  },
  validations: {
    message: {
      required,
      minLength: minLength(5)
    },
    grade: {
      required,
      between: between(0, 5)
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var novel = {
            name: this.name,
            author: this.author,
            type: this.type,
            recommender: this.recommender,
            grade: this.grade,
            message: this.message
          }
          this.novel = novel
          console.log('Submitting in NovelForm : ' + JSON.stringify(this.novel, null, 5))
          this.submitNovel(this.novel)
        }, 500)
      }
      // this.$router.params = this.file

      // console.log(this.file.name)
    },
    submitNovel: function (novel) {
      console.log('submit Novel!')
      console.log('Submitting in submitNovel : ' + novel)
      NovelService.postNovel(novel)
        .then(response => {
          this.$router.push('novels')
          // this.user.novel.push(this.novel)
          // console.log(this.user)
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
    /*background-image: url("../assets/background_book.jpg");*/
    /*background-repeat:no-repeat;*/
    /*background-position:center;*/
    /*background-size: 70% 100%;*/
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
