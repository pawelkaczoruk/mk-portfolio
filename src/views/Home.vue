<template>
  <div class="home">

    <!-- navigation cards -->
    <div>
      <v-container>
      <v-row class="justify-space-around">
   
        <v-col sm="4" md="3">
          <v-card max-width="70vw" href="/illustrations">
            <v-img
              aspect-ratio="0.8"
              src="..\assets\luca.png"
            >
              <v-card-title
                class="align-end fill-height text-uppercase"
              >
                <span class="mx-auto font-weight-medium title text-center">Ilustracje</span>
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>

        <v-col sm="4" md="3">
          <v-card max-width="70vw" href="/design">
            <v-img
              aspect-ratio="0.8"
              src="..\assets\sparrow.jpg"
            >
              <v-card-title 
                class="align-end fill-height text-uppercase"
              >
                <span class="mx-auto font-weight-medium title text-center">Design</span>
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>

        <v-col sm="4" md="3">
          <v-card max-width="70vw" href="/other">
            <v-img
              aspect-ratio="0.8"
              src="..\assets\fox.png"
            >
              <v-card-title
                class="align-end fill-height text-uppercase"
              >
                <span class="mx-auto font-weight-medium title text-center">Inne</span>
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

    }
  }
}
</script>
<style scoped>
  .title {
    color: rgb(197, 28, 160);
    width: 100%;
    background: rgba(164, 222, 226, 0.5);
    border-radius: 12px;
  }
</style>