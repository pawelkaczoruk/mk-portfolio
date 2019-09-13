<template>
  <div class="about">

    <!-- Contact view -->
    <div>
      <v-row >
        <!-- image description -->
        <v-col sm="6" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">{{ about.title }}</h2>
            <div class="pa-10 body-1">
              <p>{{ about.content }}</p>
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
        <v-col sm="6" class="pink">
          <div class="py-2 px-3" >
            <v-img contain max-height="90vh" :src="about.imageUrl"></v-img>
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