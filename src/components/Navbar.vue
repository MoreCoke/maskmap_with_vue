<template>
  <nav class="navbar" :class="{active : isActive}">
    <div class="logo">
      <img :src="logoUrl" />
      <span>口罩即時查</span>
      <button class="navbar-toggler" @click="toggleNavList"></button>
    </div>
    <ul class="navbar-list">
      <li>口罩供給現況</li>
      <li>口罩怎麼買</li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      logo: 'icon/logo.png',
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
  },
};
</script>
