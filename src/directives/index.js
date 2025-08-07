import { useIntersectionObserver } from "@vueuse/core";
export const lazyPlugin = {
  install(app) {
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el 指令绑定的那个元素img
        // binding.value 指令等于号后面绑定的值
        const imgUrl = binding.value;

        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // Ensure HTTPS for all image URLs
              const secureUrl = imgUrl?.startsWith('http://') 
                ? imgUrl.replace('http://', 'https://') 
                : imgUrl?.startsWith('//') 
                  ? 'https:' + imgUrl 
                  : imgUrl;
              el.src = secureUrl;
              stop();
            }
          },
          { rootMargin: "60px" },
        );
      },
    });
  },
};
