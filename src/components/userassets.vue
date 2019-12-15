<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-book" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="novels" :options="options">
      </v-client-table>
      <br/>
      <v-client-table :columns="columns1" :data="authors" :options="options1">
      </v-client-table>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/userService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Novels',
  data () {
    return {
      messagetitle: ' My assets ',
      userData: '',
      novels: [],
      authors: [],
      errors: [],
      columns: ['name', 'author', 'type', 'grade'],
      columns1: ['name', 'keyword1', 'keyword2', 'numofbooks'],
      options: {
        perPage: 10,
        filterable: ['author'],
        sortable: ['type', 'grade'],
        headings: {
          name: 'Book Name',
          author: 'Author',
          type: 'Type',
          grade: 'Grade'
        }
      },
      options1: {
        perPage: 10,
        filterable: ['keyword1', 'keyword2'],
        sortable: ['keyword1', 'keyword2'],
        headings: {
          name: 'Author Name',
          keyword1: 'Main Type',
          keyword2: 'Second Type',
          numofbooks: 'Number of books'
        }
      }
    }
  },
  created () {
    this.getAssets()
  },
  methods: {
    getAssets: function () {
      if (!document.cookie) {
        this.$router.push('/login')
      } else {
        this.userData = document.cookie.substring(3)
        UserService.fetchUser(this.userData)
          .then(response => {
            console.log(this.userData)
            this.user = response.data[0]
            this.novels = this.user.novels
            this.authors = this.user.authors
            console.log(this.user)
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
