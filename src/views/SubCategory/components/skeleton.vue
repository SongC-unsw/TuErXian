<template>
  <el-space direction="vertical" alignment="flex-start">
    <el-skeleton
      style="width: 240px"
      :loading="loading"
      animated
      :throttle="{ leading: 500, initVal: true }"
    >
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 265px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default> </template>
    </el-skeleton>
  </el-space>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const loading = ref(true);
</script>
