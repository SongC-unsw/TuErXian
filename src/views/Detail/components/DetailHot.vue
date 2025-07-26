<script setup>
// 24小时热榜

import { getHotGoodsAPI } from "@/apis/detail";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import SkeletonItem from "@/views/Home/components/SkeletonItem.vue";
const props = defineProps({
  hotType: Number,
});
const TYPEMAP = {
  1: "24小时热榜",
  2: "周热榜",
};
const title = computed(() => TYPEMAP[props.hotType]);
const route = useRoute();
const hotGoods = ref([]);
const showHotGoods = computed(() => {
  return hotGoods.value.length > 0;
});
const getHotGoodsData = async () => {
  const res = await getHotGoodsAPI({
    id: route.params.id,
    type: props.hotType,
  });

  hotGoods.value = res.result;
};

onMounted(() => getHotGoodsData());
</script>

<template>
  <div class="goods-hot" v-if="showHotGoods" :class="{ 'fade-in': showHotGoods }">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotGoods" :key="item.id">
      <img v-img-lazy="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
  <div class="goods-hot" v-else>
    <h3>{{ " " }}</h3>
    <div class="goods-item">
      <SkeletonItem v-for="i in 3" :key="i" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
