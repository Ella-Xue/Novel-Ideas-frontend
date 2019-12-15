<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-book" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="authors" :options="options">
        <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteAuthor(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import AuthorService from '@/services/authorService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Authors',
  data () {
    return {
      messagetitle: ' Author List ',
      authors: [],
      props: ['_id'],
      errors: [],
      columns: ['_id', 'name', 'keyword1', 'keyword2', 'numofbooks', 'remove'],
      options: {
        perPage: 10,
        filterable: ['keyword1', 'keyword2'],
        headings: {
          _id: 'ID',
          name: 'Author Name',
          keyword1: 'Type1',
          keyword2: 'Type2',
          remove: 'Cancel Collection'
        }
      }
    }
  },
  created () {
    this.loadAuthors()
    this.isSign()
  },
  methods: {
    isSign: function () {
      if (!document.cookie) {
        this.$router.push('/login')
        alert('You need to sign in first')
      }
    },
    loadAuthors: function () {
      AuthorService.fetchAuthors()
        .then(response => {
          this.authors = response.data
          console.log(this.authors)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // deleteNovels: function (id) {
    //   NovelService.deleteNovel(id)
    //     .then(response => {
    //       this.loadNovels()
    //     })
    //     .catch(error => {
    //       this.errors.push(error)
    //       console.log(error)
    //     })
    // }
    deleteAuthor: function (id) {
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
          AuthorService.deleteAuthor(id)
            .then(response => {
              this.message = response.data
              console.log(this.message)
              this.loadAuthors()
              this.$swal('Deleted', 'You successfully deleted this Author ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'The author still Counts!', 'info')
        }
      })
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
