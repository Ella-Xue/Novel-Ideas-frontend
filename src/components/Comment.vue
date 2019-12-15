<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-comments" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="mt-4">
      <b-card img-src="../assets/card.jpg" img-left title="Novel Diaries" border-variant="success">
        <b-row>
          <b-col class="bg-light">
            <b-row >
              <b-col md="auto" ><h4 class = "fa fa-book" >Novel details</h4> </b-col>
              <b-col></b-col>
            </b-row>
            <br/>
            <b-row>
              <b-col md="auto"><h5 class="toast-header">Novel name</h5></b-col>
              <b-col>{{novel[0].name}}</b-col>
            </b-row>
            <b-row>
              <b-col md="auto"><h5 class="toast-header">Novel author</h5></b-col>
              <b-col>{{novel[0].author}}</b-col>
            </b-row>
            <b-row>
              <b-col md="auto"><h5 class="toast-header">Novel type</h5></b-col>
              <b-col>{{novel[0].type}}</b-col>
            </b-row>
            <b-row>
              <b-col md="auto"><h5 class="toast-header">Novel grade</h5></b-col>
              <b-col>{{novel[0].grade}}</b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row>
              <b-col md="auto" ><h4 class = "fa fa-comments" >Novel Comments:</h4> </b-col>
              <b-col></b-col>
            </b-row>
            <b-row>
              <b-col>{{novel[0].comment}}</b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import NovelService from '@/services/NovelService'

export default {
  name: 'Comment',
  data () {
    return {
      messagetitle: ' Novel Diaries ',
      novel: []
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
          console.log(this.novel)
          console.log(response.data)
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
