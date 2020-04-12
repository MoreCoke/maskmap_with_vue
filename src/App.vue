<template>
  <div id="app">
    <Navbar></Navbar>
    <Wrapper></Wrapper>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Wrapper from './components/Wrapper.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Wrapper,
    Navbar,
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
  width: 100%;
  // max-width: 1600px;
  margin: auto;
  @include topic-font;
}
.wrapper {
  flex: 1;
  // margin: auto;
}
</style>
