<template>
  <div id="app">
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
};
</script>

<style lang="scss">
@import "./assets/all";

body,#app{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrapper{
  flex:1;
}
</style>
