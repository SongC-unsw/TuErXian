export function throttle(fn, interval) {
  let lastime = 0;
  return function () {
    const now = Date.now(); // 时间戳
    if (now - lastime > interval) {
      fn.apply(this, arguments);
      lastime = now;
    }
  };
}
