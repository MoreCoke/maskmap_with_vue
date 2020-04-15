<template>
  <div class="loading">
    <div class="loading-title">
      <img :src="logoUrl" alt /> 口罩地圖
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <img :src="maskInfoImgUrl" class="loading-info" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      logo: 'icon/logo.png',
      maskInfoImg: 'icon/maskinfo.jpg',
    };
  },
  computed: {
    logoUrl() {
      return this.publicPath + this.logo;
    },
    maskInfoImgUrl() {
      return this.publicPath + this.maskInfoImg;
    },
  },
};
</script>
