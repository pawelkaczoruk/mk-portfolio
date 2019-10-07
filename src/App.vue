<template>
  <v-app>
    <navbar />
    <background />
    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Background from './components/Background.vue'

export default {
  components: {
    'navbar': Navbar,
    'background': Background
  },
  name: 'App',
  data() {
    return {
    }
  }
};
</script>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 1.14rem;
    font-weight: 300;
    letter-spacing: 0.032em;
    line-height: 1.5rem;
  }
  h2 {
    font-size: 2.225rem;
    font-weight: 500;
    line-height: 2.8rem;
    letter-spacing: 0.031em;
  }
</style>