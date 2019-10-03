<template>
  <div class="illustrations fill-height">

    <!-- Ilustracje view -->
    <div class="fill-height">
      <div class="display-content fill-height">

        <!-- image description -->
        <div class="text-content">
          <div v-if="ilustracje.length > 0">
            <h2 class="display-1 pb-12">{{ ilustracje[counter].title.toUpperCase() }}</h2>
            <div class="body-1">
              <p class="proj-content">{{ ilustracje[counter].content }}</p>
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
            <span>{{ counter + 1 }} / {{ ilustracje.length }}</span>
            <v-btn
              fab 
              icon
              @click="counter++; goTop()"
              :disabled="counter + 1 >= ilustracje.length">
              <v-icon class="arrow-icon">mdi-menu-right-outline</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- images -->
        <div class="img-content">
          <div class="center-img">
            <v-img
              v-if="ilustracje.length > 0"
              class="sticky py-2 px-3"
              contain 
              max-height="78vh" 
              :src="ilustracje[counter].imageUrl"></v-img>
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
      counter: 0,
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
              ...change.doc.data()
            });          
          } 
        }
      });
    });
  }
}
</script>

<style> 
  * {
    scroll-behavior: smooth;
  }
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

  /* content image and text styling */ 
  .text-content {
    color: white;
    padding-top: 67px;
    padding-left: 10vw;
    padding-right: 10vw;
    min-height: 100%;
    float: left;
    width: 44%;
    display: flex;
    flex-direction: column;
  }  
  .img-content {
    float: right;
    width: 56%;
    height: 100%;
  } 
  .proj-content {
    padding-top: 5px;
    white-space: pre-wrap;
  }  
  .center-img {
    height: 100%;
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
  }

  /* sticky image on page */ 
  .sticky {
    position: sticky;
    top: 20vh;
  }

  /* smaller size screens */
  @media only screen and (max-width: 960px) {
    .display-content {
      display: flex;
      flex-direction: column;
    }
    .img-content {
      width: 100%;
      height: auto;
      float: none;
    }
    .center-img {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .display-content .img-content {
      order: 1;
    }
    .display-content .text-content {
      order: 2;
    }
    .text-content {
      background: rgb(13, 56, 86);
      min-height: auto;
      width: 100%;
      padding-left: 90px;
      padding-right: 90px;
      height: auto;
      float: none;
    }
  }

  /* mobile size screens */
  @media only screen and (max-width: 600px) {
    .text-content {
      padding-left: 48px;
      padding-right: 48px;
    }
  }

  /* button icons */ 
  .nav-btns {
    font-weight: 600;
    text-align: right;
    margin-top: auto;
    padding-bottom: 15px;
  }
  .v-btn .arrow-icon::before {
    font-size: 48px;
    color: white;
  }
  .v-btn--disabled .arrow-icon::before {
    color: rgba(255, 255, 255, 0.274);
  }

</style>