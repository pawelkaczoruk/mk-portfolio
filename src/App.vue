<template>
  <v-app>
    <navbar />

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    'navbar': Navbar
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