<template>
  <div class="other">

    <!-- Inne view -->
    <div v-if="inne.length > 0">
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
              @click="counter--"
              :disabled="counter == 0">
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>{{ counter + 1 }} / {{ inne.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="counter++"
              :disabled="counter + 1 >= inne.length">
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
import { db } from '@/fb'

export default {
  data() {
    return {
      inne: [],
      counter: 0
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

<style>

</style>