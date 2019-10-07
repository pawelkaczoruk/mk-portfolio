<template>
  <div class="about fill-height">

    <!-- about view -->
    <div class="display-content fill-height">

      <!-- image description -->
      <div class="about-content">
        <div v-if="Object.keys(about).length != 0">
          <h2 class="pb-12">{{ about.title.toUpperCase() }}</h2>
          <p class="proj-content">{{ about.content }}</p>
        </div>
      </div>

      <!-- images -->
      <div class="me-img-content">
        <div class="center-img" >
          <v-img
            v-if="Object.keys(about).length != 0"
            class="sticky py-2 px-3"
            contain 
            max-height="78vh" 
            :src="about.imageUrl"></v-img>
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
<style>
  /* text and img styling */
  .about-content {
    color: white;
    padding-top: 67px;
    padding-left: 10vw;
    padding-right: 10vw;
    min-height: 100%;
    float: left;
    width: 56%;
    display: flex;
    flex-direction: column;
  }
  .me-img-content {
    float: right;
    width: 44%;
    height: 100%;
  }

  /* smaller size screens */
  @media only screen and (max-width: 960px) {
    .me-img-content {
      background: white;
      width: 100%;
      height: auto;
      float: none;
    }
    .display-content .me-img-content {
      order: 1;
    }
    .display-content .about-content {
      order: 2;
    }
    .about-content {
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
    .about-content {
      padding-left: 48px;
      padding-right: 48px;
    }
  }
</style>