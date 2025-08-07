<script setup>
import HomePanel from "./HomePanel.vue";
import { getNewGoodsAPI } from "@/apis/home";
import { onMounted, ref, computed } from "vue";
const newList = ref([]);
const showSkeleton = computed(() => {
  return newList.value.length === 0;
});

// 确保图片URL使用HTTPS
const secureImgUrl = (url) => {
  if (!url) return url;
  return url.startsWith("http://")
    ? url.replace("http://", "https://")
    : url.startsWith("//")
      ? "https:" + url
      : url;
};
onMounted(async () => {
  const res = await getNewGoodsAPI();
  newList.value = res.result;
});
</script>

<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <ul class="goods-list">
      <template v-if="!showSkeleton">
        <li v-for="item in newList" :key="item.id" :class="{ 'fade-in': !showSkeleton }">
          <RouterLink :to="`/detail/${item.id}`">
            <img :src="secureImgUrl(item.picture)" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </template>
      <template v-else>
        <li v-for="i in 4" :key="i" class="skeleton-item">
          <el-skeleton style="width: 100%; height: 100%" animated>
            <template #template>
              <div class="skeleton-content">
                <el-skeleton-item
                  variant="image"
                  style="width: 306px; height: 306px; border-radius: 8px"
                />
                <div class="skeleton-text">
                  <el-skeleton-item
                    variant="text"
                    style="width: 80%; height: 22px; margin: 12px auto 0"
                  />
                  <el-skeleton-item
                    variant="text"
                    style="width: 40%; height: 22px; margin: 8px auto 0"
                  />
                </div>
              </div>
            </template>
          </el-skeleton>
        </li>
      </template>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
      padding: 0;
    }
    .name {
      padding: 12px;
    }
  }

  .skeleton-item {
    background: #f0f9f4;

    .skeleton-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .skeleton-text {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 12px;
    }
  }
}
</style>
