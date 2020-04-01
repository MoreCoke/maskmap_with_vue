<template>
  <div class="card p-3">
    <div class="card-header">
      <div class="mask px-3 py-4 mr-4 bg-stock-full">
        <div class="mb-2">成人口罩數量</div>
        <div class="mask-info">
          <div class="mask-nums">
            <strong>{{pharmacy.mask_adult}}</strong>
            <span>片</span>
          </div>
          <div class="mask-icon" :style="{ backgroundImage: `url(${myUrl})` }"></div>
        </div>
      </div>
      <div class="mask px-3 py-4 bg-stock-few">
        <div class="mb-2">兒童口罩數量</div>
        <div class="mask-info">
          <div class="mask-nums">
            <strong>{{pharmacy.mask_child}}</strong>
            <span>片</span>
          </div>
          <div class="mask-icon" :style="{ backgroundImage: `url(${myUrl})` }"></div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p>
        <span class="title badge-stock-full">{{pharmacy.name}}</span>
        <small>1.2KM</small>
        <span></span>
      </p>
      <p>
        <span class="subtitle">地址</span>
        {{pharmacy.address}}
        <a href="#">於地圖查看</a>
      </p>
      <p>
        <span class="subtitle">電話</span>
        {{pharmacy.phone}}
        <a href="#">撥打電話</a>
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
  props: ['pharmacy'],
  data() {
    return {
      iconUrl: 'icon/ic_stock_full@2x@2x.png',
      icon: [
        {
          type: 'stock-full',
          url: 'icon/ic_stock_full@2x@2x.png',
        },
        {
          type: 'stock-few',
          url: 'icon/ic_stock_few@2x@2x.png',
        },
        {
          type: 'stock-none',
          url: 'icon/ic_stock_none@2x@2x.png',
        },
      ],
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
  },
  computed: {
    myUrl() {
      return this.publicPath + this.iconUrl;
    },
    handleStockRender(masknums) {
      let index;
      if (masknums > 100) {
        index = this.icon.findIndex(element => element.type === 'stock-full');
      }
      if (masknums < 100 && masknums > 0) {
        index = this.icon.findIndex(element => element.type === 'stock-few');
      }
      if (masknums === 0) {
        index = this.icon.findIndex(element => element === 'stock-none');
      }
      return this.icon[index];
    },
  },
};
</script>
