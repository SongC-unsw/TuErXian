<script setup>
import { getBannerAPI } from "@/apis/home";
import { onMounted, ref } from "vue";
const bannerList = ref([]);
onMounted(async () => {
  const res = await getBannerAPI();
  bannerList.value = res.result;
  if (res.result.length > 0) {
    const img = new Image();
    img.src = res.result[0].imgUrl;
  }
});
</script>
<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="(item, index) in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="banner" :fetch-priority="index === 0 ? 'high' : 'auto'" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98; // below the category index

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
