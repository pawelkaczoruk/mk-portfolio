<template>
  <div class="other fill-height">

    <!-- Inne view -->
    <div class="fill-height" v-if="inne.length > 0">
      <div class="display-content fill-height">

        <!-- image description -->
        <div class="text-content">
          <div>
            <h2 class="display-1 pb-12">{{ inne[counter].title.toUpperCase() }}</h2>
            <div class="body-1">
              <p class="proj-content">{{ inne[counter].content }}</p>
            </div>
          </div>

          <!-- navigation buttons -->
          <div class="nav-btns">
            <v-btn 
              fab 
              icon 
              @click="counter--; goTop()"
              :disabled="counter == 0">
              <v-icon class="arrow-icon">mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>{{ counter + 1 }} / {{ inne.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="counter++; goTop()"
              :disabled="counter + 1 >= inne.length">
              <v-icon class="arrow-icon">mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- images -->
        <div class="img-content">
          <div class="center-img" >
            <v-img
              class="sticky py-2 px-3"
              contain 
              max-height="78vh" 
              :src="inne[counter].imageUrl"></v-img>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import { db } from '@/fb'

export default {
  data() {
    return {
      inne: [],
      counter: 0
    }
  },
  methods: {
    goTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    // Loading projects from db  
    db.collection('projekty').orderBy('order').onSnapshot(response => {
      const changes = response.docChanges();
      changes.forEach(change => {
        if(change.type === 'added'){
          if(change.doc.data().category == 'inne') {
            this.inne.push({
              ...change.doc.data(),
              dataId: change.doc.id
            });          
          } 
        }
      });
    });
  }
}
</script>