<template>
  <div class="illustrations">

    <!-- Ilustracje view -->
    <div>
      <v-row>
        <!-- image description -->
        <v-col sm="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">{{ ilustracje[counter].title }}</h2>
            <div class="pa-10 body-1">
              <p>{{ ilustracje[counter].content }}</p>
            </div>
          </div>
          <!-- navigation buttons -->
          <div class="nav-btns">
            <v-btn 
              fab 
              icon 
              @click="onPrevious()">
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>{{ counter + 1 }} / {{ ilustracje.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="onNext()">
              <v-icon large>mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
        <!-- images -->
        <v-col sm="5" class="pink">
          <div class="py-2 px-3">
            <v-img 
              contain 
              max-height="85vh" 
              :src="ilustracje[counter].imageUrl"></v-img>
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
      ilustracje: [
        { category: 'ilustracje', dataId: 1, order: 1, title: 'test title 1', content: 'test content 1', imageUrl: require('@/assets/fox.png') },
        { category: 'ilustracje', dataId: 2, order: 2, title: 'test title 2', content: 'test content 2', imageUrl: require('@/assets/sparrow.jpg') },
        { category: 'ilustracje', dataId: 3, order: 3, title: 'test title 3', content: 'test content 3', imageUrl: require('@/assets/fight.png') },
        { category: 'ilustracje', dataId: 4, order: 4, title: 'test title 4', content: 'test content 4', imageUrl: require('@/assets/courage.png') },
        { category: 'ilustracje', dataId: 5, order: 5, title: 'test title 5', content: 'test content 5', imageUrl: require('@/assets/luca.png') }
      ],
      counter: 0
    }
  },
  methods: {
    onNext() {
      if(this.counter + 1 < this.ilustracje.length) {
        this.counter += 1;      
      }
    },
    onPrevious() {
      if(this.counter > 0) {
        this.counter -= 1;
      }
    }
  },
  computed: {

  }
}
</script>

<style>
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