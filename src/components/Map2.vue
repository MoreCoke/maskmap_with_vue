<template>
  <div class="map">
    <div v-if="myPosition" id="mapid" style="height=300px"></div>
  </div>
</template>

<script>
import L from 'leaflet';
// import LMarkerCluster from 'leaflet.markercluster';
// import LMarkerCluster from 'vue2-leaflet-markercluster';

/* eslint-disable global-require */
// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// console.log(L);
export default {
  name: 'Map2',
  props: ['myPosition', 'pharmacyPosition', 'isMyPosition'],
  components: {
    // LMarkerCluster,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 11,
      center: [25.033, 121.5654],
      pharmacy: this.pharmacyPosition,
      lMap: null,
      lMarker: [],
      lMarkerClusterGroup: L.markerClusterGroup(),
      lIcon: {
        greenIcon: new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        greyIcon: new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        redIcon: new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      },
    };
  },
  methods: {
    // map 圖磚初始化
    initMap() {
      this.lMap = L.map('mapid', {
        center: this.center,
        zoom: this.zoom,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.lMap);
    },
    // 載入藥局的marker
    loadMarker() {
      let centerView;
      // 如果測到要定位自己附近藥局就將自身定位設定在圖中心
      if (this.isMyPosition) {
        centerView = this.myPosition;
        L.marker(centerView, { icon: this.lIcon.redIcon })
          .addTo(this.lMap)
          .bindPopup('我在這裡');
      } else {
        centerView = this.pharmacy[0].geometry.coordinates;
      }
      // forEach 幫 marker 加座標， 將 marker 存入陣列並加入 group ， 最後再將 group 加入 map
      this.pharmacy.forEach(element => {
        const { properties, geometry } = element;
        const template = `
        <div class="map-popup">
          <div class="map-popup-header">${properties.name}</div>
          <div class="map-popup-content">
            <p><i class="fas fa-map-marker-alt"></i><a href="${this.createGoogleSearchUrl(properties.name, properties.address)}" target="_blank">${properties.address}</a></p>
            <p><i class="fas fa-phone-alt"></i><a href="tel:${properties.phone}">${properties.phone}</a></p>
            <p><i class="fas fa-clipboard"></i>${properties.note}</p>
            <div class="map-popup-mask">
              <span class="${this.renderMaskStatus(properties.mask_adult)}">成人 ${properties.mask_adult}</span>
              <span class="${this.renderMaskStatus(properties.mask_child)}">兒童 ${properties.mask_child}</span>
            </div>
          </div>
        </div>`;
        let marker;
        // 如果藥局還有口罩，marker 顯示綠色的
        if (properties.mask_adult > 0 || properties.mask_child) {
          marker = L.marker(geometry.coordinates, { icon: this.lIcon.greenIcon }).bindPopup(template);
        } else {
          marker = L.marker(geometry.coordinates, { icon: this.lIcon.greyIcon }).bindPopup(template);
        }
        this.lMarker.push(marker);
        this.lMarkerClusterGroup.addLayer(marker);
        this.lMap.addLayer(this.lMarkerClusterGroup);
      });
      this.lMap.setView(centerView, 15);
    },
    //  清空 marker 陣列的座標和 group 中的資料
    removeOldMarker() {
      this.lMarker = [];
      this.lMarkerClusterGroup.clearLayers();
    },
    // 根據口罩數量渲染相應的 class
    renderMaskStatus(maskNums) {
      let maskSatus;
      if (maskNums >= 100) {
        maskSatus = 'bg-stock-full';
      } else if (maskNums < 100 && maskNums > 0) {
        maskSatus = 'bg-stock-few';
      } else {
        maskSatus = 'bg-stock-none';
      }
      return maskSatus;
    },
    // 建立藥局 google map 地址的外面連結
    createGoogleSearchUrl(name, address) {
      const googleSearch = 'https://www.google.com/maps/search/?api=1&query=';
      return `${googleSearch}${name}+${address}`;
    },
  },
  created() {
    this.$bus.$on('pharmacyLatAndLong', pharmacyLatAndLong => {
      this.lMap.setView(pharmacyLatAndLong, 20);
      console.log('execute', pharmacyLatAndLong);
      this.lMarker.forEach(element => {
        const markerLatLong = element.getLatLng();
        if (markerLatLong.lat === pharmacyLatAndLong[0] && markerLatLong.lng === pharmacyLatAndLong[1]) {
          this.lMarkerClusterGroup.zoomToShowLayer(element, () => element.openPopup());
          console.log('success');
        }
      });
    });
  },
  mounted() {
    this.initMap();
    this.loadMarker();
  },
  watch: {
    // 接收父組件 filterMaskData 的藥局資料
    pharmacyPosition() {
      this.removeOldMarker();
      this.pharmacy = this.pharmacyPosition;
      this.loadMarker();
    },
  },
};
</script>
