<template>
  <div class="about fill-height">

    <!-- Contact view -->
    <div class="fill-height">
      <v-row class="fill-height">
        <!-- image description -->
        <v-col sm="12" md="6" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">{{ about.title }}</h2>
            <div class="pa-10 body-1">
              <p class="proj-content">{{ about.content }}</p>
            </div>
          </div>
        </v-col>
        <!-- images -->
        <v-col sm="12" md="6" class="pink">
          <div class="center-img" >
            <v-img
              class="sticky py-2 px-3"
              contain 
              max-height="85vh" 
              :src="about.imageUrl"></v-img>
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
      about: {}
    }
  },
  created() {
    // Loading about data from db  
    db.collection('about').onSnapshot(response => {
      const changes = response.docChanges();
      changes.forEach(change => {
        if(change.type === 'added'){
          this.about = change.doc.data();
        }
      });
    });    
  }
}
</script>