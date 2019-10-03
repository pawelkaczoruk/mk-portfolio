<template>
  <div class="rect-outer">
    <div class="rect-color"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentRoute: {}
    }
  },
  created() {
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

    /* get active route */
    const active = this.currentRoute.name;

    /* add matching class if route is different than homepage */
    rectOuter.className = 'rect-outer';
    switch(active) {
      case 'about':
        rectOuter.classList.add('rect-about');
        break;
      case 'contact':
        rectOuter.classList.add('rect-contact');
        break;
      case 'illustrations':
      case 'design':
      case 'other':
        rectOuter.classList.add('rect-projects');
        break;
      case 'manage':
        rectOuter.classList.add('rect-manage');
        break;     
    }
  },
  methods: {
    moveBackground() {
      /* select transitioned element */
      const rectOuter = document.querySelector('.rect-outer');

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
        case 'illustrations':
        case 'design':
        case 'other':
          rectOuter.classList.add('rect-projects');
          break;
        case 'manage':
          rectOuter.classList.add('rect-manage');
          break;
      }
    }
  },
}
</script>
<style>
  .rect-color {
    background: rgb(13, 56, 86);
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
  .rect-outer.rect-projects .rect-color {
    width: 100%;
    transform: translateX(-44vw);
  }
  .rect-outer.rect-projects {
    width: 44%;
  }
  .rect-outer.rect-manage .rect-color {
    background: transparent;
  }
</style>