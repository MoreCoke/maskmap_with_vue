<template>
  <div id="app">
    <nav class="navbar" :class="{active : isActive}">
      <div class="logo">
        <img :src="logoUrl" />
        <span>口罩即時查</span>
        <button
          class="navbar-toggler"
          :style="{backgroundImage:`url(${togglerUrl})`}"
          @click="toggleNavList"
        ></button>
      </div>
      <ul class="navbar-list">
        <li>口罩供給現況</li>
        <li>口罩怎麼買</li>
      </ul>
    </nav>
    <Wrapper></Wrapper>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Wrapper from './components/Wrapper.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Wrapper,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      logo: 'icon/logo.png',
      toggler: 'icon/ic_toggler@2x.png',
      isActive: false,
    };
  },
  methods: {
    toggleNavList() {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    logoUrl() {
      return this.publicPath + this.logo;
    },
    togglerUrl() {
      return this.publicPath + this.toggler;
    },
  },
};
</script>

<style lang="scss">
@import './assets/all';
body {
  background-color: $background;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans TC', sans-serif;
  width: 100%;
  // max-width: 1600px;
  margin: auto;
}
.wrapper {
  flex: 1;
  margin: auto;
}
</style>
