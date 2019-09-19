<template>
  <div class="fill-height">
    <!-- background -->
    <div class="home-background"></div>

    <!-- navigation cards -->
    <div class="nav-container fill-height">
      <v-container class="fill-height">

        <v-row class="fill-height justify-space-around">  
          <v-col
            class="to-bottom"
            v-for="(item, i) in navIcons" 
            :key="i"
            sm="3" 
            md="3">
            <v-card
              tile
              flat
              class="nav-card"
              :to="item.destination">
              <v-img           
                :src="item.imageUrl"
              >
                <v-card-title
                  class="align-end fill-height text-uppercase"
                >
                  <span class="mx-auto font-weight-medium title text-center">{{ item.title }}</span>
                </v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      navIcons: [
        { destination: '/illustrations', title: 'ilustracje', imageUrl: require('@/assets/luca.png')},
        { destination: '/design', title: 'design', imageUrl: require('@/assets/sparrow.jpg')},
        { destination: '/other', title: 'inne', imageUrl: require('@/assets/fox.png')}
      ]
    }
  }
}
</script>
<style>
  /* background for home view */
  .home-background {
    position: absolute;
    right: 0;
    z-index: 0;
    height: 100%;
    width: 56%;
    background:rgb(13, 56, 86);
  }

  /* positioning and styles for navigation cards */
  .nav-container .row{
    width: 100%;
  }
  .nav-container {
    margin-left: 5vw;
    margin-right: 5vw;
  }
  .to-bottom {
    margin-bottom: 5px;
    margin-top: auto;
    position: relative;
    padding: 5px;
  }
  .nav-card {
    height: 66vh;
  }
  .nav-card .v-responsive{
    height: 100%;
  }

  /* for small screens */
  @media only screen and (max-width: 600px) {
    .home-background {
      width: 100%;
    }
    
    .nav-container .container {
      width: 100%;
    }
    .nav-card {
      height: 70vh;
      width: 60vw;
      min-width: 270px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
    }
  }

  /* will be removed later when im gonna get proper images */
  .title {
    color: rgb(197, 28, 160);
    width: 100%;
    background: rgba(164, 222, 226, 0.5);
    border-radius: 12px;
  }
</style>