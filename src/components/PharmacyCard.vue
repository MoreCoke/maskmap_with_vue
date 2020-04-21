<template>
  <div class="card p-3" @click.stop="searchPharmacyClick">
    <div class="card-header">
      <div
        class="mask px-3 py-4 mr-4"
        :class="handleMaskRender(pharmacy.properties.mask_adult).bgc"
      >
        <div class="mb-2">成人口罩數量</div>
        <div class="mask-info">
          <div class="mask-nums">
            <strong>{{pharmacy.properties.mask_adult}}</strong>
            <span>片</span>
          </div>
          <div
            class="mask-icon"
            :style="{ backgroundImage: `url(${handleMaskRender(pharmacy.properties.mask_adult).url})` }"
          ></div>
        </div>
      </div>
      <div class="mask px-3 py-4" :class="handleMaskRender(pharmacy.properties.mask_child).bgc">
        <div class="mb-2">兒童口罩數量</div>
        <div class="mask-info">
          <div class="mask-nums">
            <strong>{{pharmacy.properties.mask_child}}</strong>
            <span>片</span>
          </div>
          <div
            class="mask-icon"
            :style="{ backgroundImage: `url(${handleMaskRender(pharmacy.properties.mask_child).url})` }"
          ></div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p>
        <span class="label-open"></span>
        <span class="title">{{pharmacy.properties.name}}</span>
        <small>{{pharmacy.distanceToPharmacy}}KM</small>
      </p>
      <p>
        <span class="subtitle">地址</span>
        {{pharmacy.properties.address}}
        <a
          :href="createGoogleSearchUrl(pharmacy.properties.name,pharmacy.properties.address)"
          target="_blank"
        >於地圖查看</a>
      </p>
      <p>
        <span class="subtitle">電話</span>
        {{pharmacy.properties.phone}}
        <a :href="`tel:${pharmacy.properties.phone}`">撥打電話</a>
      </p>
      <p>
        <span class="subtitle">備註</span>
        {{pharmacy.properties.note}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PharmacyCard',
  props: ['pharmacy'],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      pharmacyLatAndLong: this.pharmacy.geometry.coordinates,
    };
  },
  methods: {
    handleMaskRender(maskNums) {
      let maskSatus;
      if (maskNums >= 100) {
        maskSatus = {
          bgc: 'bg-stock-full',
          url: `${this.publicPath}icon/ic_stock_full@2x@2x.png`,
        };
      } else if (maskNums > 0 && maskNums < 100) {
        maskSatus = {
          bgc: 'bg-stock-few',
          url: `${this.publicPath}icon/ic_stock_few@2x@2x.png`,
        };
      } else {
        maskSatus = {
          bgc: 'bg-stock-none',
          url: `${this.publicPath}icon/ic_stock_none@2x@2x.png`,
        };
      }
      return maskSatus;
    },
    createGoogleSearchUrl(name, address) {
      const googleSearch = 'https://www.google.com/maps/search/?api=1&query=';
      return `${googleSearch}${name}+${address}`;
    },
    // 維持 prop 的單向數據流
    // 而非直接將 prop 資料 this.pharmacy.geometry.coordinates 直接用 event bus 傳出
    // 避免 prop 可能不小心被其他 function 修改，導致 Vue 跳錯
    searchPharmacyClick() {
      this.$bus.$emit('pharmacyLatAndLong', this.pharmacyLatAndLong);
    },
  },
};
</script>
