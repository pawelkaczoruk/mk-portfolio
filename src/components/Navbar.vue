<template>
  <nav>

    <v-app-bar
      app 
      flat 
      height="106px">

      <!-- drawer activation -->
      <v-app-bar-nav-icon 
        class="grey-text d-flex d-md-none" 
        @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- website logo -->
      <a class="position-logo" href="/"><v-toolbar-title class="text-uppercase nav-logo">
        <v-img
          height="40px" 
          width="150px"
          :src="logo.imageUrl"></v-img>
      </v-toolbar-title></a>
      <div class="fill-space"></div>

      <!-- nav buttons -->
      <div class="d-none d-md-block navbar-btns">
        <v-btn        
          class="px-2"
          large
          v-for="(link, i) in links" 
          :key="i" 
          text          
          :to="link.route">{{ link.text }}</v-btn>

        <v-btn
          v-if="logged"
          text
          fab    
          :to="adminPanel.route">
          <v-icon>mdi-account-edit-outline</v-icon>
        </v-btn>

        <v-btn
          fab
          v-if="logged"
          text
          @click="onLogout()">
          <v-icon>mdi-power</v-icon>
        </v-btn>
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
      adminPanel: { text: 'admin panel', route: '/manage' },
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
  .fill-space {
    flex-grow: 1;
  }
  .nav-logo {
    margin-left: 10vw;
  }
  @media only screen and (max-width: 960px) {
    .fill-space {
      flex-grow: 0;
    }
    .position-logo {
      margin-left: auto;
      margin-right: auto;
    }
    .nav-logo {
      margin-left: 0;
    }
  }

  /* styling buttons */
  .navbar-btns .v-btn{
    margin-left: 11px;
    margin-right: 11px;
  }
  .navbar-btns .v-btn--active {
    background: rgba(177, 233, 255, 0.63);
    border-radius: 12px;
  }
  .navbar-btns .v-btn__content{
    font-size: 18px;
  }  
  .navbar-btns {
    margin-right: 10vw;
  }

  /* styling list */
  .v-list-item--active {
    font-weight: 500;
    background: rgb(177, 223, 255);
  }
</style>
