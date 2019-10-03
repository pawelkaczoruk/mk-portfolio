<template>
  <div class="rect-outer">
    <div class="rect-color"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routes: [],
      currentRoute: {}
    }
  },
  created() {
    this.routes = this.$router.options.routes;
    this.currentRoute = this.$router.currentRoute
  },
  watch: {
    '$route' (to) {
      this.currentRoute = to;
      this.moveBackground();
    }
  },
  mounted() {
    /* select transitioned element */
    const rectOuter = document.querySelector('.rect-outer');

    /* get routes */
    const options = []; 
    this.routes.forEach((route, i) => {
      options[i] = route.name;
    });
    /* get active route */
    const active = this.currentRoute.name;

    /* add matching class if route is different than homepage */
    rectOuter.className = 'rect-outer';
    if(active == 'about') {
      rectOuter.classList.add('rect-about');
    } else if(active == 'contact') {
      rectOuter.classList.add('rect-contact');
    }
  },
  methods: {
    moveBackground() {
      /* select transitioned element */
      const rectOuter = document.querySelector('.rect-outer');

      /* get routes */
      const options = []; 
      this.routes.forEach((route, i) => {
        options[i] = route.name;
      });
      /* get active route */
      const active = this.currentRoute.name;

      /* add proper class if route was changed */ 
      rectOuter.className = 'rect-outer';
      switch(active) {
        case 'about':
          rectOuter.classList.add('rect-about');
          break;
        case 'contact':
          rectOuter.classList.add('rect-contact');
          break;
      }
    }
  },
}
</script>
<style>
  .rect-color {
    background: red;
    height: 100%;
    width: 100%;
    transition: transform 770ms cubic-bezier(0.4, 0, 0.2, 1) 50ms,
                width 770ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;    
  } 
  .rect-outer {
    position: absolute;
    height: 100%;
    width: 56%;
    transform: translateX(44vw);
    transition: transform 770ms cubic-bezier(0.4, 0, 0.2, 1) 50ms,
                width 770ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;

  }
  .rect-outer.rect-about .rect-color {
    width: 100%;
    transform: translateX(-44vw);
  }
  .rect-outer.rect-about {
    width: 56%;
  }
  .rect-outer.rect-contact .rect-color {
    width: 100%;
    transform: translateX(4vw);
  }
  .rect-outer.rect-contact {
    width: 52%;
  }
</style>