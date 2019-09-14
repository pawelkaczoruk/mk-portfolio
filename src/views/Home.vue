<template>
  <div>

    <!-- navigation cards -->
    <div>
      <v-container>
      <v-row class="fill-height justify-space-around">  
        <v-col
          v-for="(item, i) in navIcons" 
          :key="i"
          sm="4" 
          md="4">
          <v-card 
            class="nav-card"
            min-width="170px" 
            max-width="70vw" 
            :href="item.destination">
            <v-img
              aspect-ratio="0.8"
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
  @media only screen and (max-width: 600px) {
    .nav-card {
      width: 100vw;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .title {
    color: rgb(197, 28, 160);
    width: 100%;
    background: rgba(164, 222, 226, 0.5);
    border-radius: 12px;
  }
</style>