<script setup>
import { useBanner } from "./composables/useBanner";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";
import SkeletonItem from "@/views/Home/components/SkeletonItem.vue";
import { useCategory } from "./composables/useCategory";
import { computed } from "vue";
//获取分类列表
const { categoryList } = useCategory();
// 获取banner
// optimized: when params change, only change a particular part of the page

const { bannerList } = useBanner();
const shouldShowCarousel = computed(() => {
  return bannerList.value.length > 0;
});
const showBreadcrumb = computed(() => {
  return categoryList.value.name !== undefined;
});
const showSubList = computed(() => {
  return categoryList.value.children;
});
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container" v-if="showBreadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bread-container" v-else>
        <el-skeleton
          style="width: 100%; height: 28px"
          animated
          :class="{ 'fade-in': !showBreadcrumb }"
        >
          <template #template>
            <el-skeleton-item variant="text" style="width: 100%; height: 100%" />
          </template>
        </el-skeleton>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item
            v-for="item in bannerList"
            :key="item.id"
            v-if="shouldShowCarousel"
            :class="{ 'fade-in': shouldShowCarousel }"
          >
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
          <el-carousel-item v-for="i in 3" :key="i" v-else>
            <el-skeleton style="width: 100%; height: 500px" animated>
              <template #template>
                <el-skeleton-item variant="image" style="width: 100%; height: 500px" />
              </template>
            </el-skeleton>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li
            v-for="i in categoryList.children"
            :key="i.id"
            v-if="showSubList"
            :class="{ 'fade-in': showSubList }"
          >
            <!-- 配置路由关系 -->
            <RouterLink :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
          <li v-for="i in 7" :key="i" v-else>
            <el-skeleton style="width: 168px; height: 160px" animated>
              <template #template>
                <el-skeleton-item variant="image" style="width: 100px; height: 100px" />
              </template>
            </el-skeleton>
          </li>
        </ul>
      </div>
      <div
        class="ref-goods"
        v-for="item in categoryList.children"
        :key="item.id"
        v-if="showSubList"
        :class="{ 'fade-in': showSubList }"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
      <div class="ref-goods" v-for="i in 3" :key="i" v-else>
        <div class="head">
          <h3>- -</h3>
        </div>
        <div class="body">
          <SkeletonItem v-for="i in 4" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
