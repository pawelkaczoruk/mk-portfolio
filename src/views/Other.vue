<template>
  <div class="other">

    <!-- Inne view -->
    <div>
      <v-row >
        <!-- image description -->
        <v-col sm="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">{{ inne[counter].title }}</h2>
            <div class="pa-10 body-1">
              <p>{{ inne[counter].content }}</p>
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
            <span>{{ counter + 1 }} / {{ inne.length }}</span>
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
          <div class="py-2 px-3" >
            <v-img 
              contain 
              max-height="85vh" 
              :src="inne[counter].imageUrl"></v-img>
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
      inne: [
        { category: 'inne', dataId: 1, order: 1, title: 'test title 1', content: 'test content1', imageUrl: require('@/assets/sparrow.jpg') },
        { category: 'inne', dataId: 2, order: 2, title: 'test title 2', content: 'test content2', imageUrl: require('@/assets/luca.png') },
        { category: 'inne', dataId: 3, order: 3, title: 'test title 3', content: 'test content3', imageUrl: require('@/assets/courage.png') },
        { category: 'inne', dataId: 4, order: 4, title: 'test title 4', content: 'test content4', imageUrl: require('@/assets/fox.png') },
        { category: 'inne', dataId: 5, order: 5, title: 'test title 5', content: 'test content5', imageUrl: require('@/assets/fight.png') }
      ],
      counter: 0
    }
  },
  methods: {
    onNext() {
      if(this.counter + 1 < this.inne.length) {
        this.counter += 1;      
      }
    },
    onPrevious() {
      if(this.counter > 0) {
        this.counter -= 1;
      }
    }
  }
}
</script>

<style>

</style>