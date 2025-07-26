<template>
  <div class="spinner-container">
    <div class="spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <div v-if="text" class="spinner-text">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "medium",
  },
});
</script>

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  min-height: 60px;
}

.spinner {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}

.spinner-ring {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 4px;
  border: 3px solid #27ba9b;
  border-radius: 50%;
  animation: spinner-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #27ba9b transparent transparent transparent;
}

.spinner-ring:nth-child(1) {
  animation-delay: -0.45s;
}

.spinner-ring:nth-child(2) {
  animation-delay: -0.3s;
}

.spinner-ring:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes spinner-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-text {
  margin-top: 12px;
  color: #666;
  font-size: 14px;
}

// Size variations
.spinner-container.small {
  .spinner {
    width: 24px;
    height: 24px;
  }

  .spinner-ring {
    width: 20px;
    height: 20px;
    margin: 2px;
    border-width: 2px;
  }
}

.spinner-container.large {
  .spinner {
    width: 56px;
    height: 56px;
  }

  .spinner-ring {
    width: 48px;
    height: 48px;
    margin: 4px;
    border-width: 4px;
  }
}
</style>
