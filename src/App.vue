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
  }
</style>