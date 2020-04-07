<template>
  <div class="wrapper">
    <select
      class="wrapper-select"
      name="county"
      v-model="selectedCounty"
      @change="filterSelectCountyAndTownPharmacy(selectedCounty)"
    >
      <option v-for="item in getCity" :key="item" :value="item">{{item}}</option>
    </select>
    <select
      class="wrapper-select"
      name="city"
      v-model="selectedTown"
      @change="filterSelectCountyAndTownPharmacy(selectedCounty,selectedTown)"
    >
      <option v-for="item in getCertainCounty" :key="item" :value="item">{{item}}</option>
    </select>
    <button class="wrapper-search" @click="filterNearestPharmacy">
      <span class="mr-2">搜尋最近的藥局</span>
      <img :src="locationIconUrl" alt />
    </button>
    <div class="purchase-day">
      <span>不限日皆可購買</span>
      <img :src="helpIconUrl" alt />
    </div>
    <div class="updated-info">
      <p v-if="maskData[0]">
        距離方圓 1公里 以內的供應商
        <br />
        資訊更新時間{{getUpdateTime}}
        <i class="fas fa-cog fa-spin" v-if="isLoading"></i>
      </p>
      <button @click="getData">重整列表</button>
    </div>
    <template v-if="maskData[0]">
      <PharmacyCard
        v-for="(item,index) in renderMaskData"
        :key="index"
        :pharmacy="item.properties"
        :distanceToPharmacy="item.distanceToPharmacy"
      ></PharmacyCard>
    </template>
    <div v-if="getTheRestPharmacyCardNum > 0">
      <button @click="renderPharmacyCard(3)">我要看更多</button>
      <p>目前共剩{{getTheRestPharmacyCardNum}}筆</p>
    </div>
  </div>
</template>
<script>
import PharmacyCard from './PharmacyCard.vue';
import CityData from '../assets/CityCountyData.json';

export default {
  name: 'Wrapper',
  components: {
    PharmacyCard,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      locationIcon: 'icon/ic_location@2x.png',
      helpIcon: 'icon/ic_help@2x.png',
      myLatAndLong: [],
      cityCountyArr: CityData,
      selectedCounty: '臺北市',
      selectedTown: '中正區',
      isLoading: false,
      maskData: [],
      filterMaskData: [],
      renderMaskData: [],
      maxPharmacyCard: null,
      totalFilterPharmacyCard: null,
    };
  },
  methods: {
    // 取得口罩資料
    getData() {
      const maskUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR1dnONo5ndjbYoiQOHymhawhbnRDFKmWVjQT4A5gV5Wo4zccyBvp0peAgk';
      this.isLoading = true;
      this.maxPharmacyCard = 3;
      this.axios.get(maskUrl).then(response => {
        this.maskData = response.data.features;
        this.maskData.forEach(element => {
          // eslint-disable-next-line no-param-reassign
          element.distanceToPharmacy = this.getDistanceToPharmacy(element.geometry.coordinates);
        });
        this.filterSelectCountyAndTownPharmacy(this.selectedCounty, this.selectedTown);
        this.isLoading = false;
      });
    },
    // 取得現在定位
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
    // 取得藥局和現在定位的距離
    getDistanceToPharmacy(pharmacyGeometry) {
      function radius(d) {
        return (d * Math.PI) / 180.0;
      }
      // 如果允許定位
      if (this.myLatAndLong[0]) {
        const r = 6371;
        const lat0 = radius(this.myLatAndLong[1]);
        const lat1 = radius(pharmacyGeometry[1]);
        const lat = lat0 - lat1;
        const long = radius(this.myLatAndLong[0]) - radius(pharmacyGeometry[0]);
        const a = Math.sin(lat / 2) * Math.sin(lat / 2) + Math.sin(long / 2) * Math.sin(long / 2) * Math.cos(lat0) * Math.cos(lat1);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = (r * c).toFixed(1);
        return distance;
      }
      return '?? ';
    },
    // 尋找離家近的藥局
    filterNearestPharmacy() {
      this.filterMaskData = this.maskData.filter(element => element.distanceToPharmacy <= 1);
      this.initializePharmacyCard();
      this.renderPharmacyCard();
    },
    // 尋找表單選擇的地區藥局
    filterSelectCountyAndTownPharmacy(county, town) {
      if (town) {
        this.filterMaskData = this.maskData.filter(element => element.properties.county === county && element.properties.town === town);
      } else {
        this.filterMaskData = this.maskData.filter(element => element.properties.county === county);
      }
      this.initializePharmacyCard();
      this.renderPharmacyCard();
    },
    // 渲染卡片
    renderPharmacyCard(plus = 0) {
      const filterMaskLength = this.filterMaskData.length;
      this.maxPharmacyCard += plus;
      if (this.maxPharmacyCard > filterMaskLength) {
        this.maxPharmacyCard = filterMaskLength;
      }
      this.renderMaskData = this.filterMaskData.slice(0, this.maxPharmacyCard);
    },
    // 更新地區的藥局數量
    initializePharmacyCard() {
      this.totalFilterPharmacyCard = this.filterMaskData.length;
      this.maxPharmacyCard = 3; // 初始化
    },
  },
  computed: {
    locationIconUrl() {
      return this.publicPath + this.locationIcon;
    },
    helpIconUrl() {
      return this.publicPath + this.helpIcon;
    },
    // 取得 select 的縣市 option
    getCity() {
      const arr = this.cityCountyArr.map(element => element.CityName);
      return arr;
    },
    // 取得 select 的市區 option
    getCertainCounty() {
      const arr = this.cityCountyArr.filter(element => element.CityName === this.selectedCounty);
      return arr[0].AreaList.map(element => element.AreaName);
    },
    // 取得上次更新資料的時間
    getUpdateTime() {
      let time = this.maskData[0].properties.updated;
      time = time.split(' ');
      return time[1];
    },
    // 取得剩餘未渲染的卡片數量
    getTheRestPharmacyCardNum() {
      let restNum = this.totalFilterPharmacyCard - this.maxPharmacyCard;
      if (restNum <= 0) {
        restNum = 0;
      }
      return restNum;
    },
  },
  mounted() {
    this.getData();
    this.getMyPosition();
  },
};
</script>
