<template>
  <div class="card p-3">
    <div class="card-header">
      <div class="mask px-3 py-4 mr-4" :class="handleMaskRender(pharmacy.mask_adult).bgc">
        <div class="mb-2">成人口罩數量</div>
        <div class="mask-info">
          <div class="mask-nums">
            <strong>{{pharmacy.mask_adult}}</strong>
            <span>片</span>
          </div>
          <div
            class="mask-icon"
            :style="{ backgroundImage: `url(${handleMaskRender(pharmacy.mask_adult).url})` }"
          ></div>
        </div>
      </div>
      <div class="mask px-3 py-4" :class="handleMaskRender(pharmacy.mask_child).bgc">
        <div class="mb-2">兒童口罩數量</div>
        <div class="mask-info">
          <div class="mask-nums">
            <strong>{{pharmacy.mask_child}}</strong>
            <span>片</span>
          </div>
          <div
            class="mask-icon"
            :style="{ backgroundImage: `url(${handleMaskRender(pharmacy.mask_child).url})` }"
          ></div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p>
        <span class="label-open"></span>
        <span class="title">{{pharmacy.name}}</span>
        <small>{{getDistance(coordinate)}}KM</small>
      </p>
      <p>
        <span class="subtitle">地址</span>
        {{pharmacy.address}}
        <a
          :href="crateGoogleSearchUrl(pharmacy.name,pharmacy.address)"
          target="_blank"
        >於地圖查看</a>
      </p>
      <p>
        <span class="subtitle">電話</span>
        {{pharmacy.phone}}
        <a :href="`tel:${pharmacy.phone}`">撥打電話</a>
      </p>
      <p>
        <span class="subtitle">備註</span>
        {{pharmacy.note}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PharmacyCard',
  props: ['pharmacy', 'geometry'],
  data() {
    return {
      coordinate: this.geometry,
      myLatAndLong: [],
      publicPath: process.env.BASE_URL,
      googleSearch: 'https://www.google.com/maps/search/?api=1&query=',
    };
  },
  methods: {
    handleMaskRender(maskNums) {
      let maskSatus;
      if (maskNums > 100) {
        maskSatus = {
          bgc: 'bg-stock-full',
          url: `${this.publicPath}icon/ic_stock_full@2x@2x.png`,
        };
      }
      if (maskNums > 0 && maskNums < 100) {
        maskSatus = {
          bgc: 'bg-stock-few',
          url: `${this.publicPath}icon/ic_stock_few@2x@2x.png`,
        };
      }
      if (maskNums === 0) {
        maskSatus = {
          bgc: 'bg-stock-none',
          url: `${this.publicPath}icon/ic_stock_none@2x@2x.png`,
        };
      }
      return maskSatus;
    },
    crateGoogleSearchUrl(name, address) {
      return `${this.googleSearch}${name}+${address}`;
    },
    getDistance(geometry) {
      function radius(d) {
        return (d * Math.PI) / 180.0;
      }
      const r = 6371;
      const lat0 = radius(this.myLatAndLong[1]);
      const lat1 = radius(geometry[1]);
      const lat = lat0 - lat1;
      const long = radius(this.myLatAndLong[0]) - radius(geometry[0]);
      const a = Math.sin(lat / 2) * Math.sin(lat / 2)
          + Math.sin(long / 2)
          * Math.sin(long / 2)
          * Math.cos(lat0)
          * Math.cos(lat1);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = (r * c).toFixed(1);
      return distance;
    },
    getMyPosition() {
      const self = this;
      function success(position) {
        const {
          coords: { longitude: long },
        } = position;
        const {
          coords: { latitude: lat },
        } = position;
        self.myLatAndLong.push(long);
        self.myLatAndLong.push(lat);
      }
      function error() {
        console.log('Can not get your location!');
      }
      navigator.geolocation.getCurrentPosition(success, error);
    },
  },
  computed: {},
  mounted() {
    this.getMyPosition();
  },
};
</script>
