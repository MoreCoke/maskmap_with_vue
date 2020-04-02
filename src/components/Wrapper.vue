<template>
  <div class="wrapper">
    <PharmacyCard v-if="maskData[0]" :pharmacy="maskData[0]" :geometry="latLongData[0]"></PharmacyCard>
  </div>
</template>
<script>
import PharmacyCard from './PharmacyCard.vue';

export default {
  name: 'Wrapper',
  components: {
    PharmacyCard,
  },
  data() {
    return {
      loading: false,
      latLongData: [],
      maskData: [],
    };
  },
  mounted() {
    const maskUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR1dnONo5ndjbYoiQOHymhawhbnRDFKmWVjQT4A5gV5Wo4zccyBvp0peAgk';
    this.axios.get(maskUrl).then(response => {
      this.loading = true;
      const allData = response.data.features;
      this.latLongData = allData.map(element => element.geometry.coordinates);
      this.maskData = allData.map(element => element.properties);
      this.loading = false;
    });
  },
};
</script>
