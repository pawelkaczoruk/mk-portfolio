<template>
  <nav>

    <v-toolbar flat color="grey lighten-2">

      <!-- drawer activation 
      <v-app-bar-nav-icon class="grey-text d-flex d-sm-none" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
-->
      <!-- website logo -->
      <v-toolbar-title class="text-uppercase">
        <span class="grey--text">mk-logo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- nav buttons -->
      <div class="d-none d-sm-flex">
        <v-btn v-for="(link, i) in links" :key="i" text router :to="link.route">
          {{ link.text }}
        </v-btn>
      </div>

      <!-- drawer
      <v-navigation-drawer class="text-uppercase" v-model="drawer" app>
        <v-list>
          <v-list-item v-for="(link, i) in links" :key="i" :to="link.route">
            <v-list-item-content>
              {{ link.text }}              
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
 -->
    </v-toolbar>
    
  </nav>

</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { text: 'portfolio', route: '/' },
        { text: 'about me', route: '/about' },
        { text: 'contact', route: '/contact' },
        { text: 'admin panel', route: '/admin' },
        { text: 'logout', route: ''}
      ]
    }
  }
}
</script>

<style>

</style>