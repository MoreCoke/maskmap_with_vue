<template>
  <div class="card p-3">
    <div class="card-header">
      <div class="card-mask px-3 py-4 mr-3 bg-primary">
        <div class="title">成人口罩數量</div>
        <div class="mask-container">
          <div class="mask-nums"><strong>200</strong><span>片</span></div>
          <!-- <div class="mask-icon bg-secondary"></div> -->
        </div>
      </div>
      <div class="card-mask px-3 py-4 mr-3 bg-secondary">
        <div class="title">兒童口罩數量</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PharmacyCard',
};
</script>
