<template>
  <div class="test">
    <div class="info" style="height: 15%;">
      <p class="mr-2 mb-2">Center: {{ center }}</p>
      <p class="mr-2 mb-2">Zoom: {{zoom}}</p>
      <p class="mr-2 mb-2">Bounds: {{bounds}}</p>
    </div>
    <l-map
      style="height: 80%; width:100%"
      :zoom="zoom"
      :center="myPosition"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="niggerBunch"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker-cluster>
        <!-- <l-marker
          v-for="(item,index) in pharmacy"
          :key="index"
          :lat-lng="item.geometry.coordinates"
        ></l-marker> -->
        <l-marker  v-for="(item,index) in data" :key="index" :lat-lng="item.local"></l-marker>
      </l-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import LMarkerCluster from 'vue2-leaflet-markercluster';
import { latLng, Icon } from 'leaflet';
import {
  LMap, //
  LTileLayer,
  LMarker,
  // LPopup,
  // LTooltip,
} from 'vue2-leaflet';
/* eslint-disable global-require */
// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Map',
  props: ['myPosition', 'pharmacyPosition'],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LPopup,
    // LTooltip,
    LMarkerCluster,
  },
  data() {
    return {
      data: [
        { id: 1, name: '夢時代購物中心', local: [22.595153, 120.306923] },
        { id: 2, name: '漢神百貨', local: [22.61942, 120.296386] },
        { id: 3, name: '漢神巨蛋', local: [22.669603, 120.302288] },
        { id: 4, name: '大統百貨', local: [22.630748, 120.318033] },
      ],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [22.595153, 120.306923],
      bounds: null,
      currentCenter: latLng(22.630748, 120.318033),
      pharmacy: this.pharmacyPosition,
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    niggerBunch(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>
