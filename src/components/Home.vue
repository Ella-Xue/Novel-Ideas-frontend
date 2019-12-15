<template>
  <div class="hero">
    <b-carousel class="carousel"
      id="carousel-1"
      v-model="slide"
      :interval="2000"
      controls
      indicators
      background="#ababab"
      img-width="960"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide img-src="../assets/readbook1.jpg" img-height=200>
        <p class="vue-title"><b><i>Homer for Novel Ideals</i></b></p>
      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="../assets/readbook5.jpg" img-height=200>
        <p class="lan" ><b><i>Time is a bird for ever on the wing.</i></b></p>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="../assets/readbook2.jpg" img-height=200>
        <p class="lan"><b><i>Books are the food for the hungry of great mind.</i></b></p>
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide img-src="../assets/readbook4.jpg" img-height=200>
        <p class="lan"><b><i>Much learning shows how little mortals know.</i></b></p>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide img-src="../assets/readbook3.jpg" img-height=200>
        <p class="lan"><b><i>Knowledge comes, but wisdom lingers.</i></b></p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import UserService from '@/services/userService'
export default {
  data () {
    return {
      slide: 0,
      sliding: null,
      user: []
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    getUser: function () {
      UserService.fetchUser(this.userData)
        .then(response => {
          console.log(this.userData)
          this.user = response.data
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
<style>
  .hero {
    height: 100vh;
    margin-top: 0px;
    align-items: center;
    justify-content: center;
    text-align: center;

  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .carousel{
    margin-left: 200px;
    margin-right: 200px;
    margin-bottom: 400px;
  }
  .vue-title {
    font-family:Monospace;
    font-size: 70pt;
    margin-bottom: 10px;
    color: lightslategrey;
    text-align: right;
  }
  .lan{
    font-family:Monospace;
    font-size: 40pt;
    margin-bottom: 10px;
    color: dimgray;
    text-align: center;
  }
</style>
