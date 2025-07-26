<script setup></script>
<template>
  <el-skeleton style="width: 100%; height: 100%" animated class="goods-item">
    <template #template>
      <div class="img">
        <el-skeleton-item variant="image" style="width: 160px; height: 160px" />
        <div class="text">
          <el-skeleton-item variant="text" style="width: 60%" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<style scoped lang="scss">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  .img {
    width: 220px;
    height: 220px;
    .text {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
    }
  }
}
</style>
