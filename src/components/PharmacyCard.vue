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
        <small>{{distanceToPharmacy}}KM</small>
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
  props: ['pharmacy', 'distanceToPharmacy'],
  data() {
    return {
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
  },
  computed: {},
};
</script>
