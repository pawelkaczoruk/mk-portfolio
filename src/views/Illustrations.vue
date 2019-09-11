<template>
  <div class="illustrations">

    <!-- Ilustracje view -->
    <div v-if="ilustracje.length > 0">
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
              @click="counter--"
              :disabled="counter==0">
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>{{ counter + 1 }} / {{ ilustracje.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="counter++"
              :disabled="counter + 1 >= ilustracje.length">
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
import db from '@/fb'

export default {
  data() {
    return {
      counter: 0,
      beforeOrdered: [],
      ilustracje: []

    }
  },

  created() {
    // Loading projects from db  
    db.collection('projekty').orderBy('order').onSnapshot(response => {
      const changes = response.docChanges();
      changes.forEach(change => {
        if(change.type === 'added'){
          if(change.doc.data().category == 'ilustracje') {
            this.ilustracje.push({
              ...change.doc.data(),
              dataId: change.doc.id,
              imageUrl: require('@/assets/luca.png')
            });          
          } 
        }
      });
    });
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