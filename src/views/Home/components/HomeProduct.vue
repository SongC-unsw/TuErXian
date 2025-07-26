<script setup>
import HomePanel from "./HomePanel.vue";
import { getProductAPI } from "@/apis/home";
import { onMounted, ref, computed } from "vue";
import GoodsItem from "./GoodsItem.vue";
import SkeletonItem from "./SkeletonItem.vue";
const productList = ref([]);
const showSkeleton = computed(() => {
  return productList.value.length === 0;
});
onMounted(async () => {
  const res = await getProductAPI();
  productList.value = res.result;
});
</script>

<template>
  <div class="home-product">
    <HomePanel
      :title="cate.name"
      v-for="cate in productList"
      :key="cate.id"
      v-if="!showSkeleton"
      :class="{ 'fade-in': !showSkeleton }"
    >
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="good in cate.goods" :key="good.id">
            <GoodsItem :goods="good" />
          </li>
        </ul>
      </div>
    </HomePanel>
    <HomePanel title="" v-else v-for="i in 4" :key="i">
      <div class="box">
        <RouterLink class="cover" to="/">
          <el-skeleton-item variant="image" style="width: 240px; height: 610px" />
          <strong class="label">
            <el-skeleton-item variant="text" style="width: 188px; height: 66px" />
            <el-skeleton-item variant="text" style="width: 188px; height: 66px" />
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="i in 8" :key="i">
            <SkeletonItem />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 0px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
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
