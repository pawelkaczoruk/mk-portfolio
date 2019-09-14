<template>
  <div class="other fill-height">

    <!-- Inne view -->
    <div class="fill-height" v-if="inne.length > 0">
      <v-row class="fill-height">
        <!-- image description -->
        <v-col sm="12" md="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">{{ inne[counter].title }}</h2>
            <div class="pa-10 body-1">
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
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>{{ counter + 1 }} / {{ inne.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="counter++; goTop()"
              :disabled="counter + 1 >= inne.length">
              <v-icon large>mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
        <!-- images -->
        <v-col sm="12" md="5" class="pink">
          <div class="center-img" >
            <v-img
              class="sticky py-2 px-3"
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