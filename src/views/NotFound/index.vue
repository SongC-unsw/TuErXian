<template>
  <div class="not-found">
    <h2>404</h2>
    <p>抱歉，您访问的页面不存在</p>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 100px 0;

  h2 {
    font-size: 60px;
    color: #666;
    margin-bottom: 20px;
  }

  p {
    color: #999;
    margin-bottom: 20px;
  }
}
</style>
