<script setup>
import { getBannerAPI } from "@/apis/home";
import { onMounted, ref, computed } from "vue";

const bannerList = ref([]);
const isFirstImageLoaded = ref(false); // 跟踪第一张图片加载状态
const isDataLoaded = ref(false); // 跟踪数据加载状态

const bannerPromise = getBannerAPI();

onMounted(async () => {
  const res = await bannerPromise;
  bannerList.value = res.result;
  isDataLoaded.value = true;

  if (res.result.length > 0) {
    // 等待第一张图片加载完成
    const firstImg = new Image();
    firstImg.fetchPriority = "high";
    firstImg.loading = "eager";

    firstImg.onload = () => {
      isFirstImageLoaded.value = true;
    };

    firstImg.onerror = () => {
      // 即使加载失败，也要隐藏骨架屏，避免永久显示
      console.warn("First banner image failed to load");
      isFirstImageLoaded.value = true;
    };

    firstImg.src = res.result[0].imgUrl;

    // 预加载其他图片（不影响骨架屏显示）
    res.result.slice(1, 3).forEach((item, index) => {
      const img = new Image();
      img.src = item.imgUrl;
    });
  } else {
    // 如果没有图片数据，直接隐藏骨架屏
    isFirstImageLoaded.value = true;
  }
});

// 计算是否应该显示轮播图
const shouldShowCarousel = computed(() => {
  return isDataLoaded.value && isFirstImageLoaded.value && bannerList.value.length > 0;
});

// 计算是否应该显示骨架屏
const shouldShowSkeleton = computed(() => {
  return !isDataLoaded.value || !isFirstImageLoaded.value;
});
</script>

<template>
  <div class="home-banner">
    <!-- 轮播图 - 只有在数据和第一张图片都加载完成后才显示 -->
    <el-carousel
      height="500px"
      v-if="shouldShowCarousel"
      :class="{ 'fade-in': shouldShowCarousel }"
    >
      <el-carousel-item v-for="(item, index) in bannerList" :key="item.id">
        <img
          :src="item.imgUrl"
          alt="banner"
          :fetch-priority="index === 0 ? 'high' : 'auto'"
          loading="eager"
          decoding="async"
        />
      </el-carousel-item>
    </el-carousel>

    <!-- 骨架屏 - 在图片加载完成前显示 -->
    <div v-if="shouldShowSkeleton" class="banner-skeleton">
      <el-skeleton style="width: 100%; height: 500px" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 500px" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
}

.banner-skeleton {
  width: 100%;
  height: 500px;
}

// 添加淡入动画效果
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
