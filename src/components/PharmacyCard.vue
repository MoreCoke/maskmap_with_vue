<template>
  <div class="card p-3">
    <button @click="getMyPosition">click me</button>
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
        <span class="title badge-stock-full">{{pharmacy.name}}</span>
        <span></span>
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
      propGeometry: this.geometry,
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
    // calDistanceToPharmacy(myLocation, pharmacyLocation) {
    // function GetDistance(lat1, lng1, lat2, lng2) {
    //   var radLat1 = (lat1 * Math.PI) / 180.0;
    //   var radLat2 = (lat2 * Math.PI) / 180.0;
    //   var a = radLat1 - radLat2;
    //   var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
    //   var s =
    //     2 *
    //     Math.asin(
    //       Math.sqrt(
    //         Math.pow(Math.sin(a / 2), 2) +
    //           Math.cos(radLat1) *
    //             Math.cos(radLat2) *
    //             Math.pow(Math.sin(b / 2), 2),
    //       ),
    //     );
    //   s = s * 6378.137; // EARTH_RADIUS;
    //   s = Math.round(s * 10000) / 10000;
    //   return s;
    // }
    // },
    getMyPosition() {
      function success(position) {
        const {
          coords: { latitude: lat },
        } = position;
        const {
          coords: { longitude: long },
        } = position;
        return `${lat}+${long}`;
      }
      function error() {
        console.log('Can not get your location!');
      }
      navigator.geolocation.getCurrentPosition(success, error);
      return 'done';
    },
  },
  computed: {},
};
</script>
