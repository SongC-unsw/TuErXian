<script setup>
import HomePanel from "./HomePanel.vue";
import SkeletonItem from "./SkeletonItem.vue";
import { getNewGoodsAPI } from "@/apis/home";
import { onMounted, ref, computed } from "vue";
const newList = ref([]);
const showSkeleton = computed(() => {
  return newList.value.length === 0;
});

// 确保图片URL使用HTTPS
const secureImgUrl = (url) => {
  if (!url) return url;
  return url.startsWith('http://') 
    ? url.replace('http://', 'https://') 
    : url.startsWith('//') 
      ? 'https:' + url 
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
      <li
        v-for="item in newList"
        :key="item.id"
        v-if="!showSkeleton"
        :class="{ 'fade-in': !showSkeleton }"
      >
        <RouterLink :to="`/detail/${item.id}`">
          <img :src="secureImgUrl(item.picture)" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
      <li v-for="i in 4" :key="i" v-else>
        <SkeletonItem />
      </li>
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
}
</style>
