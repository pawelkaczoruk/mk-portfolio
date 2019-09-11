<template>
  <div class="design">

    <!-- Design view -->
    <div v-if="design.length > 0">
      <v-row >
        <!-- image description -->
        <v-col sm="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">{{ design[counter].title }}</h2>
            <div class="pa-10 body-1">
              <p>{{ design[counter].content }}</p>
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
            <span>{{ counter + 1 }} / {{ design.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="counter++"
              :disabled="counter + 1 >= design.length">
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
              :src="design[counter].imageUrl"></v-img>
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
      design: [],
      counter: 0
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

</style>