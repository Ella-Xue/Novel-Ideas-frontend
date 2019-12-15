<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-book" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="novels" :options="options">
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteNovel(props.row._id)"></a>
        <a slot="givegrade" slot-scope="props"  @click="giveGrade(props.row._id)">
          <b-button size="sm" class="fa fa-edit fa-2x"></b-button>
        </a>
        <a slot="comments" slot-scope="props" @click="showComments(props.row._id)">
          <b-button size="sm" class="fa fa-comments"></b-button>
        </a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import NovelService from '@/services/NovelService'
import UserService from '@/services/userService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Novels',
  data () {
    return {
      messagetitle: ' Novel List ',
      novels: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'name', 'author', 'type', 'recommender', 'grade', 'givegrade', 'remove', 'comments'],
      options: {
        perPage: 10,
        filterable: ['author', 'recommender'],
        sortable: ['type', 'grade'],
        headings: {
          _id: 'ID',
          name: 'Book Name',
          author: 'Author',
          type: 'Type',
          recommender: 'Recommender',
          grade: 'Grade',
          remove: 'Cancel Collection',
          comments: 'Comments'
        }
      },
      username: '',
      isuser: false,
      recommender: ''
    }
  },
  created () {
    this.loadNovels()
    this.isSign()
    this.getUserInfo()
  },
  methods: {
    isSign: function () {
      if (!document.cookie) {
        this.$router.push('/login')
        alert('You need to sign in first')
      }
    },
    loadNovels: function () {
      NovelService.fetchNovels()
        .then(response => {
          this.novels = response.data
          console.log(this.novels)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    getUserInfo: function () {
      this.userData = document.cookie.substring(3)
      UserService.fetchUser(this.userData)
        .then(response => {
          console.log(this.userData)
          this.user = response.data[0]
          this.username = this.user.username
          console.log(this.username)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    deleteNovel: function (id) {
      setTimeout(() => {
        NovelService.fetchNovel(id)
          .then(response => {
            this.novel = response.data
            this.recommender = this.novel[0].recommender
            if (this.recommender === this.username) this.isuser = true
            console.log(this.recommender)
            console.log(this.isuser)
          })
          .catch(error => {
            this.errors.push(error)
            console.log(error)
          })
      }, 1000)
      if (this.isuser === false) {
        this.$swal('You do not have authorization to delete it')
      } else {
        this.$swal({
          title: 'Are you totaly sure?',
          text: 'You can\'t Undo this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK Delete it',
          cancelButtonText: 'Cancel',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result)
          if (result === true) {
            NovelService.deleteNovel(id)
              .then(response => {
                this.message = response.data
                console.log(this.message)
                this.loadNovels()
                this.$swal('Deleted', 'You successfully deleted this Novel ' + JSON.stringify(response.data, null, 5), 'success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error)
                console.log(error)
              })
          } else {
            this.$swal('Cancelled', 'Your Novel still Counts!', 'info')
          }
        })
      }
    },
    giveGrade: function (id) {
      this.$router.params = id
      this.$router.push('giveGrade')
    },
    showComments: function (id) {
      this.$router.params = id
      this.$router.push('comment')
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 90%;
    margin: 0 auto;

  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
