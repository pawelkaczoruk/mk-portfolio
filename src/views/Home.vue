<template>
  <div id="home" class="fill-height">

    <!-- navigation cards -->
    <div class="nav-container fill-height">

      <div
        class="to-center single-card"
        v-for="(item, i) in navIcons" 
        :key="i">
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
      </div>

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
  /* positioning and styles for navigation cards */
  .single-card {
    display: inline-block;
    width: 21vw;
  }
  .nav-container {
    margin-left: 10vw;
    margin-right: 10vw;
    display: flex;
    justify-content: space-between;
  }
  .to-center {
    margin-bottom: auto;
    margin-top: auto;
    padding-top: 3%;
    position: relative;
  }
  .nav-card {
    height: 66vh;
  }
  .nav-card .v-responsive{
    height: 100%;
  }

  /* smaller screens */
  @media only screen and (max-width: 960px) {
    #home {
      background: rgb(13, 56, 86);
    }
    .nav-container {
      display: inline;
    }
    .single-card {
      display: block;
      width: 100%;
    }    
    .nav-card {
      height: 400px;
      width: 200px;
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