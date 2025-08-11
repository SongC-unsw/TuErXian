import { ref, computed, onUnmounted } from "vue";
import dayjs from "dayjs";
export const useCountDown = () => {
  const time = ref(0);
  let timer = null;
  // 格式化时间 分 秒
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format("mm分ss秒");
  });
  const start = (currTime) => {
    // 倒计时逻辑
    time.value = currTime;
    clearInterval(timer);
    timer = setInterval(() => {
      time.value--;
      if (time.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };
  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });
  return { formatTime, start };
};
