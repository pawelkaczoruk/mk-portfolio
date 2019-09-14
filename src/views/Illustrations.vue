<template>
  <div class="illustrations fill-height">

    <!-- Ilustracje view -->
    <div class="fill-height" v-if="ilustracje.length > 0">
      <v-row class="fill-height">
        <!-- image description -->
        <v-col sm="12" md="7" class="cyan content">
          <div>
            <h2 class="display-2 text-center pt-3">{{ ilustracje[counter].title }}</h2>
            <div class="pa-10 body-1">
              <p class="proj-content">{{ ilustracje[counter].content }}</p>
            </div>
          </div>
          <!-- navigation buttons -->
          <div class="nav-btns">
            <v-btn 
              fab 
              icon 
              @click="counter--; goTop()"
              :disabled="counter==0">
              <v-icon large>mdi-menu-left-outline</v-icon>
            </v-btn>
            <span>{{ counter + 1 }} / {{ ilustracje.length }}</span>
            <v-btn 
              fab 
              icon 
              @click="counter++; goTop()"
              :disabled="counter + 1 >= ilustracje.length">
              <v-icon large>mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
        <!-- images -->
        <v-col sm="12" md="5" class="pink">
          <div class="center-img">
            <v-img 
              class="sticky py-2 px-3"
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
import { db } from '@/fb'

export default {
  data() {
    return {
      counter: 0,
      beforeOrdered: [],
      ilustracje: []

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
          if(change.doc.data().category == 'ilustracje') {
            this.ilustracje.push({
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
  .v-content{
    display: flex;
    height: 100%;
  }
  .v-content__wrap {
    height: 100%;
  }
  .fill-height {
    height: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .proj-content {
    text-align: justify;
    white-space: pre-wrap;
  }
  .nav-btns {
    font-weight: 600;
    text-align: right;
    bottom: 0;
    margin-top: auto;
  }
  .center-img {
    height: 100%;
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 12px;
  } 
  .sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 12vh;
  }
  @media only screen and (max-width: 960px) {
    .center-img {
      margin-right: 20px;
      margin-left: 20px;
    }
  }
</style>