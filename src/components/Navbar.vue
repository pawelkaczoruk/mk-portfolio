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

        <v-btn
          v-if="true"
          text 
          router 
          :to="adminPanel.route">{{ adminPanel.text }}</v-btn>

        <v-btn
          v-if="logged"
          text
          @click="onLogout()">{{ logout.text }}</v-btn>
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

            <v-list-item 
              v-if="true"
              class="pl-12 pt-3 pb-3"
              :to="adminPanel.route">
              <v-list-item-content>
                {{ adminPanel.text }}              
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-if="logged"
              class="pl-12 pt-3 pb-3"
              @click="onLogout()">
              <v-list-item-content>
                {{ logout.text }}           
              </v-list-item-content>
            </v-list-item>
          </v-list>          
      </v-navigation-drawer>
    </v-app-bar>
  </nav>

</template>

<script>
import { db, auth } from '@/fb'

export default {
  data() {
    return {
      logged: false,
      drawer: false,
      links: [
        { text: 'portfolio', route: '/' },
        { text: 'about me', route: '/about' },
        { text: 'contact', route: '/contact' }
      ],
      logout: { text: 'logout' },
      adminPanel: { text: 'admin panel', route: '/admin' },
      logo: {}
    }
  },
  methods: {
    onLogout() {
      auth.signOut().then(() => {
        this.logged = false;
      }).catch(() => {
        return alert('Błąd przy wylogowywaniu');
      });
    }
  },
  created() {
    // getting logo from db
    db.collection('logo').onSnapshot(response => {
      const changes = response.docChanges();
      changes.forEach(change => {
        this.logo = { ...change.doc.data() }
      });
    });

    // check if admin is logged in
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }
}
</script>

<style>
  .v-list-item--active {
    font-weight: 500;
    background: rgb(224, 220, 220);
  }
</style>
