<template>
  <div class="home">

    <!-- navigation cards -->
    <div>
      <v-container>
      <v-row class="justify-space-around">
   
        <v-col sm="4" md="3">
          <v-card max-width="70vw">
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
          <v-card max-width="70vw">
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
          <v-card max-width="70vw">
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

    <!-- Ilustracje secion -->
    <div class="ilustracje">
      <v-row >
        <!-- image description -->
        <v-col sm="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">Numero Uno</h2>
            <div class="pa-10 body-1">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
            </div>
          </div>
          <!-- navigation buttons -->
          <div class="nav-btns">
            <v-btn fab icon>
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>1 / 8</span>
            <v-btn fab icon>
              <v-icon large>mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
        <!-- images -->
        <v-col sm="5" class="pink">
          <div class="py-2 px-3" >
            <v-img contain max-height="90vh" src="..\assets\luca.png"></v-img>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-divider></v-divider>

    <!-- Design secion -->
    <div class="design">
      <v-row >
        <!-- image description -->
        <v-col sm="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">Numero Secundo</h2>
            <div class="pa-10 body-1">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
            </div>
          </div>
          <!-- navigation buttons -->
          <div class="nav-btns">
            <v-btn fab icon>
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>1 / 8</span>
            <v-btn fab icon>
              <v-icon large>mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
        <!-- images -->
        <v-col sm="5" class="pink">
          <div class="py-2 px-3" >
            <v-img contain max-height="90vh" src="..\assets\sparrow.jpg"></v-img>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-divider></v-divider>

    <!-- Inne secion -->
    <div class="inne">
      <v-row >
        <!-- image description -->
        <v-col sm="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">Numero Secundo</h2>
            <div class="pa-10 body-1">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, porro magnam. Maxime, aut? Aspernatur repellendus quis rerum voluptates magni, deserunt aliquid qui hic cum eum? Amet saepe distinctio autem tempora.</p>
            </div>
          </div>
          <!-- navigation buttons -->
          <div class="nav-btns">
            <v-btn fab icon>
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>1 / 8</span>
            <v-btn fab icon>
              <v-icon large>mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
        <!-- images -->
        <v-col sm="5" class="pink">
          <div class="py-2 px-3" >
            <v-img contain max-height="90vh" src="..\assets\fox.png"></v-img>
          </div>
        </v-col>
      </v-row>
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
  .content {
    display: flex;
    flex-direction: column;
  }
  .nav-btns {
    font-weight: 600;
    text-align:right;
    bottom: 0;
    margin-top: auto;
  }
</style>