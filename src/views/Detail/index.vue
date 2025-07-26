<script setup>
import { getDetailAPI } from "@/apis/detail";
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import DetailHot from "./components/DetailHot.vue";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const route = useRoute();
const goods = ref({});
const showSkeleton = computed(() => {
  return !goods.value;
});
const getGoodsData = async () => {
  const res = await getDetailAPI(route.params.id);
  goods.value = res.result;
};
onMounted(() => getGoodsData());
let skuObj = {};
const skuChange = (sku) => {
  // 只有当选择完全是才不为空
  skuObj = sku;
};

//count
const count = ref(1);
const countChange = (value) => {
  console.log("count changed", value);
};

//添加购物车
const addCart = () => {
  if (skuObj.skuId) {
    cartStore.addCart({
      id: goods.value.id,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: goods.value.price,
      count: count.value,
      skuId: skuObj.skuId,
      attrsText: skuObj.attrsText,
      selected: true,
    });
  } else {
    ElMessage.warning("请选择完整的规格");
  }
};
</script>

<template>
  <div class="xtx-goods-page">
    <div
      class="container"
      v-if="!showSkeleton && goods.details"
      :class="{ 'fade-in': !showSkeleton }"
    >
      <!-- // 只在商品详情加载后加载页面 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories?.[1].id}` }"
            >{{ goods.categories?.[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[0].id}` }"
            >{{ goods.categories?.[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <ImageView :image-list="goods?.mainPictures" />
              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{{ goods.salesCount }}+</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{ goods.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{ goods.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{ goods.brand?.name || "暂无品牌" }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name">{{ goods.name }}</p>
              <p class="g-desc">{{ goods.desc }}</p>
              <p class="g-price">
                <span>{{ goods.price }}</span>
                <span> {{ goods.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <XtxSku :goods="goods" @change="skuChange" />

              <!-- 数据组件 -->
              <el-input-number v-model="count" @change="countChange" />
              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart"> 加入购物车 </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" v-img-lazy="img" :key="img" alt="" />
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24小时 -->
              <DetailHot :hot-type="1" />
              <!-- 周 -->
              <DetailHot :hot-type="2" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="skeleton-container" v-else>
      <div class="container">
        <!-- Breadcrumb skeleton -->
        <div class="breadcrumb-skeleton">
          <el-skeleton animated>
            <template #template>
              <el-skeleton-item variant="text" style="width: 300px; height: 20px" />
            </template>
          </el-skeleton>
        </div>

        <!-- Product info skeleton -->
        <div class="product-info-skeleton">
          <div class="media-skeleton">
            <!-- Image gallery skeleton -->
            <el-skeleton animated>
              <template #template>
                <el-skeleton-item
                  variant="image"
                  style="width: 400px; height: 400px; margin-bottom: 20px"
                />
                <div style="display: flex; gap: 10px">
                  <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                  <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                  <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                  <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                </div>
              </template>
            </el-skeleton>

            <!-- Sales info skeleton -->
            <div class="sales-skeleton">
              <el-skeleton animated>
                <template #template>
                  <div style="display: flex; justify-content: space-between; margin-top: 20px">
                    <div style="text-align: center">
                      <el-skeleton-item
                        variant="text"
                        style="width: 60px; height: 16px; margin-bottom: 5px"
                      />
                      <el-skeleton-item
                        variant="text"
                        style="width: 40px; height: 20px; margin-bottom: 5px"
                      />
                      <el-skeleton-item variant="text" style="width: 70px; height: 14px" />
                    </div>
                    <div style="text-align: center">
                      <el-skeleton-item
                        variant="text"
                        style="width: 60px; height: 16px; margin-bottom: 5px"
                      />
                      <el-skeleton-item
                        variant="text"
                        style="width: 40px; height: 20px; margin-bottom: 5px"
                      />
                      <el-skeleton-item variant="text" style="width: 70px; height: 14px" />
                    </div>
                    <div style="text-align: center">
                      <el-skeleton-item
                        variant="text"
                        style="width: 60px; height: 16px; margin-bottom: 5px"
                      />
                      <el-skeleton-item
                        variant="text"
                        style="width: 40px; height: 20px; margin-bottom: 5px"
                      />
                      <el-skeleton-item variant="text" style="width: 70px; height: 14px" />
                    </div>
                    <div style="text-align: center">
                      <el-skeleton-item
                        variant="text"
                        style="width: 60px; height: 16px; margin-bottom: 5px"
                      />
                      <el-skeleton-item
                        variant="text"
                        style="width: 40px; height: 20px; margin-bottom: 5px"
                      />
                      <el-skeleton-item variant="text" style="width: 70px; height: 14px" />
                    </div>
                  </div>
                </template>
              </el-skeleton>
            </div>
          </div>

          <div class="spec-skeleton">
            <!-- Product details skeleton -->
            <el-skeleton animated>
              <template #template>
                <!-- Product name -->
                <el-skeleton-item
                  variant="text"
                  style="width: 80%; height: 28px; margin-bottom: 15px"
                />
                <!-- Product description -->
                <el-skeleton-item
                  variant="text"
                  style="width: 60%; height: 16px; margin-bottom: 15px"
                />
                <!-- Price -->
                <div style="display: flex; gap: 15px; margin-bottom: 20px">
                  <el-skeleton-item variant="text" style="width: 100px; height: 26px" />
                  <el-skeleton-item variant="text" style="width: 80px; height: 20px" />
                </div>
                <!-- Service info -->
                <el-skeleton-item
                  variant="rect"
                  style="width: 100%; height: 120px; margin-bottom: 20px"
                />
                <!-- SKU options -->
                <div style="margin-bottom: 20px">
                  <el-skeleton-item
                    variant="text"
                    style="width: 60px; height: 16px; margin-bottom: 10px"
                  />
                  <div style="display: flex; gap: 10px; margin-bottom: 15px">
                    <el-skeleton-item variant="button" style="width: 60px; height: 32px" />
                    <el-skeleton-item variant="button" style="width: 60px; height: 32px" />
                    <el-skeleton-item variant="button" style="width: 60px; height: 32px" />
                  </div>
                  <el-skeleton-item
                    variant="text"
                    style="width: 60px; height: 16px; margin-bottom: 10px"
                  />
                  <div style="display: flex; gap: 10px; margin-bottom: 20px">
                    <el-skeleton-item variant="button" style="width: 50px; height: 32px" />
                    <el-skeleton-item variant="button" style="width: 50px; height: 32px" />
                  </div>
                </div>
                <!-- Quantity and button -->
                <div style="display: flex; gap: 15px; align-items: center">
                  <el-skeleton-item variant="button" style="width: 120px; height: 32px" />
                  <el-skeleton-item variant="button" style="width: 140px; height: 40px" />
                </div>
              </template>
            </el-skeleton>
          </div>
        </div>

        <!-- Footer skeleton -->
        <div class="footer-skeleton">
          <div class="article-skeleton">
            <el-skeleton animated>
              <template #template>
                <!-- Tabs -->
                <el-skeleton-item
                  variant="text"
                  style="width: 120px; height: 20px; margin-bottom: 20px"
                />
                <!-- Product attributes -->
                <div
                  style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 30px;
                  "
                >
                  <el-skeleton-item variant="text" style="width: 100%; height: 16px" />
                  <el-skeleton-item variant="text" style="width: 100%; height: 16px" />
                  <el-skeleton-item variant="text" style="width: 100%; height: 16px" />
                  <el-skeleton-item variant="text" style="width: 100%; height: 16px" />
                  <el-skeleton-item variant="text" style="width: 100%; height: 16px" />
                  <el-skeleton-item variant="text" style="width: 100%; height: 16px" />
                </div>
                <!-- Product images -->
                <el-skeleton-item
                  variant="image"
                  style="width: 100%; height: 200px; margin-bottom: 20px"
                />
                <el-skeleton-item
                  variant="image"
                  style="width: 100%; height: 200px; margin-bottom: 20px"
                />
                <el-skeleton-item variant="image" style="width: 100%; height: 200px" />
              </template>
            </el-skeleton>
          </div>

          <div class="aside-skeleton">
            <!-- Hot items skeleton -->
            <el-skeleton animated>
              <template #template>
                <el-skeleton-item
                  variant="text"
                  style="width: 120px; height: 20px; margin-bottom: 15px"
                />
                <div v-for="i in 5" :key="i" style="display: flex; gap: 10px; margin-bottom: 15px">
                  <el-skeleton-item variant="image" style="width: 60px; height: 60px" />
                  <div style="flex: 1">
                    <el-skeleton-item
                      variant="text"
                      style="width: 100%; height: 14px; margin-bottom: 5px"
                    />
                    <el-skeleton-item variant="text" style="width: 60px; height: 16px" />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      padding: 0 10px;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
        padding-right: 10px;
      }
    }
  }

  > img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;
}

.bread-container {
  padding: 25px 0;
}
.skeleton-container {
  .container {
    max-width: 1240px;
    margin: 0 auto;
    background: #f5f5f5;
    min-height: 100vh;
  }

  .breadcrumb-skeleton {
    padding: 25px 0;
    background: #fff;
    margin-bottom: 20px;
    padding-left: 20px;
  }

  .product-info-skeleton {
    display: flex;
    background: #fff;
    min-height: 600px;
    margin-bottom: 20px;

    .media-skeleton {
      width: 580px;
      padding: 30px 50px;
      border-right: 1px solid #f5f5f5;

      .sales-skeleton {
        margin-top: 20px;
      }
    }

    .spec-skeleton {
      flex: 1;
      padding: 30px 30px 30px 30px;
    }
  }

  .footer-skeleton {
    display: flex;
    gap: 20px;

    .article-skeleton {
      flex: 1;
      background: #fff;
      padding: 40px;
      min-height: 600px;
    }

    .aside-skeleton {
      width: 280px;
      background: #fff;
      padding: 20px;
      min-height: 600px;
    }
  }
}
</style>
