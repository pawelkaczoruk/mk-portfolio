<template>
  <nav>

    <v-app-bar app flat color="grey lighten-2">

      <!-- drawer activation -->
      <v-app-bar-nav-icon 
        class="grey-text d-flex d-sm-none" 
        @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- website logo -->
      <v-toolbar-title class="text-uppercase">
        <span class="grey--text">
          <v-img 
            height="40px" 
            width="150px" 
            :src="logo.imageUrl"></v-img>
          </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- nav buttons -->
      <div class="d-none d-sm-flex">
        <v-btn 
          v-for="(link, i) in links" 
          :key="i" 
          text 
          router 
          :to="link.route">{{ link.text }}</v-btn>
      </div>


      <v-navigation-drawer 
        absolute
        disable-resize-watcher
        class="text-uppercase" 
        v-model="drawer"
        app>
          <v-list>
            <v-list-item 
              class="pl-12 pt-3 pb-3"
              v-for="(link, i) in links" 
              :key="i" 
              :to="link.route">
              <v-list-item-content>
                {{ link.text }}              
              </v-list-item-content>
            </v-list-item>
          </v-list>          
      </v-navigation-drawer>
    </v-app-bar>
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
      ],
      logo: { 
        category: 'logo', 
        imageUrl: require('@/assets/logo.jpg') 
      }
    }
  }
}
</script>

<style>
  .v-list-item--active {
    font-weight: 500;
    background: rgb(224, 220, 220);
  }
</style>