<template>
  <div class="design fill-height">

    <!-- Design view -->
    <div class="fill-height">
      <div class="display-content fill-height">

        <!-- image description -->
        <div class="text-content">
          <div v-if="design.length > 0">
            <h2 class="display-1 pb-12">{{ design[counter].title.toUpperCase() }}</h2>
            <div class="body-1">
              <p class="proj-content">{{ design[counter].content }}</p>
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
            <span>{{ counter + 1 }} / {{ design.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="counter++; goTop()"
              :disabled="counter + 1 >= design.length">
              <v-icon class="arrow-icon">mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- images -->
        <div class="img-content">
          <div class="center-img" >
            <v-img
              v-if="design.length > 0"
              class="sticky py-2 px-3"
              contain
              max-height="78vh" 
              :src="design[counter].imageUrl"></v-img>
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
      design: [],
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
          if(change.doc.data().category == 'design') {
            this.design.push({
              ...change.doc.data()
            });          
          } 
        }
      });
    });
  }
}
</script>