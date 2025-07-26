<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
import { useVirtualList } from "@vueuse/core";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "../Home/components/GoodsItem.vue";
import Spinner from "@/components/Spinner/index.vue";

// 获取面包屑导航数据
const route = useRoute();
const categoryData = ref({});
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id);
  categoryData.value = res.result;
};
onMounted(() => getCategoryData());
// 面包屑显示与否
const showBreadcrumb = computed(() => {
  return categoryData.value.name !== undefined;
});
// 获取商品列表数据
const goodsList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime", // 排序字段
});
const isLoading = ref(false);
const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  goodsList.value = res.result.items;
  if (reqData.value.sortField === "orderNum" || reqData.value.sortField === "evaluateNum") {
    randomSort(goodsList.value);
  }
};
onMounted(() => getGoodsList());

const handleTabChange = () => {
  console.log("Tab changed", reqData.value.sortField);
  reqData.value.page = 1; // 重置页码
  getGoodsList();
};

const randomSort = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

// 虚拟列表
const containerRef = ref();
const itemHeight = 300; // 增加高度以适应内容
const itemPerRow = 5;

const rowData = computed(() => {
  const rows = [];
  for (let i = 0; i < goodsList.value.length; i += itemPerRow) {
    rows.push(goodsList.value.slice(i, i + itemPerRow));
  }
  return rows;
});

// 使用配置虚拟列表
const { list, containerProps, wrapperProps } = useVirtualList(rowData, {
  itemHeight,
});

const disableInfScroll = ref(false);

// 无限滚动加载
const load = async () => {
  reqData.value.page++;
  isLoading.value = true;
  console.log(isLoading.value);
  const newData = await getSubCategoryAPI(reqData.value);
  isLoading.value = false;
  if (reqData.value.sortField === "orderNum" || reqData.value.sortField === "evaluateNum") {
    randomSort(newData.result.items);
  }
  goodsList.value = [...goodsList.value, ...newData.result.items];
  if (newData.result.items.length === 0) {
    disableInfScroll.value = true;
  }
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container" v-if="showBreadcrumb" :class="{ 'fade-in': showBreadcrumb }">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">
          {{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bread-container" v-else>
      <el-skeleton style="width: 15%; height: 14px" animated>
        <template #template>
          <el-skeleton-item variant="text" style="width: 100%; height: 100%" />
        </template>
      </el-skeleton>
    </div>

    <div class="sub-container">
      <!-- 筛选框 -->
      <el-tabs v-model="reqData.sortField" @tab-change="handleTabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>

      <div class="body">
        <div
          ref="containerRef"
          class="virtual-list-container"
          v-bind="containerProps"
          v-infinite-scroll="load"
          :infinite-scroll-disabled="disableInfScroll"
        >
          <div v-bind="wrapperProps">
            <div v-for="{ data: row, index } in list" :key="index" class="virtual-row">
              <GoodsItem v-for="item in row" :key="item.id" :goods="item" />
            </div>
            <Spinner v-if="isLoading" text="加载中..." />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    padding: 0 10px;
  }

  .virtual-list-container {
    height: 1000px;
    width: 100%;
    overflow: auto;
  }

  .virtual-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start; // 顶部对齐
    justify-content: flex-start;
    min-height: 300px; // 确保每行高度一致
    gap: 0; // 移除gap，让GoodsItem自己控制间距
  }

  // 确保 GoodsItem 在虚拟列表中的布局
  :deep(.goods-item) {
    flex: 0 0 auto; // 不允许伸缩，保持固定尺寸
    margin-right: 20px;
    margin-bottom: 20px;

    // 每行最后一个商品移除右边距
    &:nth-child(5n) {
      margin-right: 0;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
