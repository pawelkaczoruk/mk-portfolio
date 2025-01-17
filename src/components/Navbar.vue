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
      <v-toolbar-title class="nav-logo pa-0">
        <a href="/">
          <v-img
            height="40px" 
            width="150px"
            :src="logo.imageUrl"></v-img>
        </a>
      </v-toolbar-title>
      <div class="fill-space"></div>

      <!-- nav buttons -->
      
        <div class="d-none d-md-block navbar-btns bar-white">
          <v-btn
            ref="blur"
            width="125px"        
            class="px-2 option"
            large
            v-for="(link, i) in links" 
            :key="i" 
            text
            @click="removeBlur(i)"
            :to="link.route">{{ link.text }}</v-btn>
        </div>

        <div class="bar-outer">
          <div class="d-none d-md-block navbar-btns bar-blue">
            <v-btn  
              width="125px"      
              class="px-2 option"
              large
              v-for="(link, i) in links" 
              :key="i" 
              text          
              :to="link.route">{{ link.text }}</v-btn>
          </div>
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
              v-if="logged"
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
    /* logout from admin panel */
    onLogout() {
      auth.signOut().then(() => {
        this.logged = false;
      }).catch(() => {
        return alert('Błąd przy wylogowywaniu');
      });
    },
    /* remove button focus when clicked */
    removeBlur(val) {
      this.$refs.blur[val].$el.blur();
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
  },
  mounted() {
    /* select elements that are needed for transition */
    const barOuter = document.querySelector('.bar-outer');
    const options = document.querySelectorAll('.bar-white .option');
    const active = document.querySelector('.bar-white .v-btn--active');
    let current = 1;

    /* get current active element */
    options.forEach((option, i) => {
      if(option == active) { 
        current = i + 1;
      }
    });

    /* add matching class if route is different than homepage */
    barOuter.className = 'bar-outer';
    if(current == 2) {
      barOuter.classList.add('pos2');
    } else if(current == 3) {
      barOuter.classList.add('pos3');
    }

    /* add matching class when nav button is clicked */
    options.forEach((option, i) => (option.index = i + 1));
    options.forEach(option => option.addEventListener('click', () => {
      barOuter.className = 'bar-outer';
      barOuter.classList.add(`pos${option.index}`);
      if(option.index > current) {
        barOuter.classList.add('right');
      } else if(option.index < current) {
        barOuter.classList.add('left');
      }
      current = option.index;
    }));
  }
}
</script>

<style>
  /* animating slide background effect under buttons */ 
  .bar-white {
    z-index: 1;
  }
  .bar-blue {
    background: rgb(177, 223, 255); 
    clip-path: polygon(
      435px 44px,
      435px 0,
      23px 0,
      19.2897px 0.588px,
      15.9463px 2.292px,
      13.292px 4.9463px,
      11.588px 8.2807px,
      11px 12px,
      11px 32px,
      11.588px 35.7103px,
      13.292px 39.0537px,
      15.9463px 41.708px,
      19.2897px 43.412px,
      23px 44px
    );
    transition: clip-path 770ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .bar-outer { 
    position: absolute;
    height: 44px;
    right: 0;
    margin-right: 16px;
    clip-path: polygon(
      0 0,
      135px 0, 
      135px 44px, 
      0 44px
    );
    clip-path: polygon(
      0 0,
      0 44px,
      123px 44px,
      126.7103px 43.412px,
      130.0537px 41.708px,
      132.708px 39.0537px,
      134.412px 35.7103px,
      135px 32px,
      135px 12px,
      134.412px 8.2807px,
      132.708px 4.9463px,
      130.0537px 2.292px,
      126.7103px 0.588px,
      123px 0 
    );
    transition: clip-path 770ms cubic-bezier(0.4, 0, 0.2, 1); 
  }
  .bar-outer.pos2 .bar-blue {
    clip-path: polygon(
      435px 44px,
      435px 0,
      168px 0,
      164.2897px 0.588px,
      159.9463px 2.292px,
      158.292px 4.9463px,
      156.588px 8.2807px,
      156px 12px,
      156px 32px,
      156.588px 35.7103px,
      158.292px 39.0537px,
      159.9463px 41.708px,
      164.2897px 43.412px,
      168px 44px
    );
  }
  .bar-outer.pos2 {
    clip-path: polygon(
      0 0,
      0 44px,
      268px 44px,
      271.7103px 43.412px,
      275.0537px 41.708px,
      277.708px 39.0537px,
      279.412px 35.7103px,
      280px 32px,
      280px 12px,
      279.412px 8.2807px,
      277.708px 4.9463px,
      275.0537px 2.292px,
      271.7103px 0.588px,
      268px 0
    );
  }
  .bar-outer.pos3 .bar-blue {
    clip-path: polygon(
      435px 44px,
      435px 0,
      313px 0,
      309.2897px 0.588px,
      305.9463px 2.292px,
      303.292px 4.9463px,
      301.588px 8.2807px,
      301px 12px,
      301px 32px,
      301.588px 35.7103px,
      303.292px 39.0537px,
      305.9463px 41.708px,
      309.2897px 43.412px,
      313px 44px
    );
  }
  .bar-outer.pos3 {
    clip-path: polygon(
      0 0, 
      435px 0, 
      435px 44px, 
      0 44px
    );
    clip-path: polygon(
      0 0,
      0 44px,
      414px 44px,
      418.7103px 43.412px,
      421.0537px 41.708px,
      423.708px 39.0537px,
      425.412px 35.7103px,
      426px 32px,
      426px 12px,
      425.412px 8.2807px,
      423.708px 4.9463px,
      421.0537px 2.292px,
      418.7103px 0.588px,
      414px 0
    );
  }
  .bar-outer.left .bar-blue {
    transition-delay: 50ms;
  }
  .bar-outer.left {
    transition-delay: 50ms;
  }
  .bar-outer.right .bar-blue {
    transition-delay: 50ms;
  }
  .bar-outer.right {
    transition-delay: 50ms;
  }

  /* layout for navbar items */
  .fill-space {
    flex-grow: 1;
  }
  .nav-logo {
    margin-left: 9vw;
  }

  /* small screens */
  @media only screen and (max-width: 960px) {
    .fill-space {
      flex-grow: 0;
    }
    .nav-logo {
      margin-left: auto;
      margin-right: auto;
    }
  }

  /* styling buttons */
  .navbar-btns .v-btn{
    margin-left: 11px;
    margin-right: 9px;
    background: transparent;
  }
  .navbar-btns .v-btn--active {
    border-radius: 12px;
  }
  .navbar-btns .v-btn__content{
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.051em;
    line-height: 1.5rem;
  }  
  .navbar-btns {
    margin-right: 8vw;
  }

  /* override vuetify button background color */
  .v-btn-content {
    background: transparent !important;
  }
  .v-btn::before {
    background: transparent !important;
  }

  /* styling list */
  .v-list-item__content{
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0.061em;
    line-height: 1.2rem;
  }
  .v-list-item--active {
    background: rgb(177, 223, 255);
  }
  .v-list-item--active .v-list-item__content {
    font-weight: 500;
  }
</style>
