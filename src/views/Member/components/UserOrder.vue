<script setup>
import { getOrderListAPI } from "@/apis/user";
import { onMounted, ref, computed } from "vue";

// 添加专门的loading状态
const loading = ref(false);
const orderList = ref([]);

// 添加当前活跃的tab状态，默认为"全部订单"
const activeTab = ref("all");

// 改进的判断逻辑
const showSkeleton = computed(() => {
  return loading.value;
});

const showEmpty = computed(() => {
  return !loading.value && orderList.value.length === 0;
});

const showContent = computed(() => {
  return !loading.value && orderList.value.length > 0;
});

// tab列表
const tabTypes = [
  { name: "all", label: "全部订单" },
  { name: "unpay", label: "待付款" },
  { name: "deliver", label: "待发货" },
  { name: "receive", label: "待收货" },
  { name: "comment", label: "待评价" },
  { name: "complete", label: "已完成" },
  { name: "cancel", label: "已取消" },
];

const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 2,
});

const getOrderList = async () => {
  try {
    loading.value = true;
    const res = await getOrderListAPI(params.value);
    orderList.value = res.result.items;
  } catch (error) {
    console.error("获取订单列表失败:", error);
    orderList.value = [];
  } finally {
    loading.value = false;
  }
};

// 切换tab时的处理
const handleTabChange = (tabName) => {
  // 更新当前活跃的tab
  activeTab.value = tabName;

  // 根据tab更新orderState
  const stateMap = {
    all: 0,
    unpay: 1,
    deliver: 2,
    receive: 3,
    comment: 4,
    complete: 5,
    cancel: 6,
  };

  params.value.orderState = stateMap[tabName] || 0;
  params.value.page = 1; // 重置页码
  getOrderList();
};

onMounted(() => {
  getOrderList();
});
</script>

<template>
  <div class="order-container">
    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <!-- tab切换 -->
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      />

      <div class="main-container">
        <!-- 骨架屏幕 - 只在loading时显示 -->
        <div v-if="showSkeleton" class="skeleton-container">
          <div v-for="i in 3" :key="i" class="order-skeleton-item">
            <el-skeleton animated>
              <template #template>
                <!-- 订单头部 -->
                <div class="skeleton-header">
                  <el-skeleton-item variant="text" style="width: 150px; height: 16px" />
                  <el-skeleton-item variant="text" style="width: 200px; height: 16px" />
                  <el-skeleton-item variant="text" style="width: 120px; height: 16px" />
                </div>
                <!-- 订单内容 -->
                <div class="skeleton-body">
                  <div class="skeleton-goods">
                    <div v-for="j in 2" :key="j" class="skeleton-goods-item">
                      <el-skeleton-item variant="image" style="width: 70px; height: 70px" />
                      <div class="skeleton-goods-info">
                        <el-skeleton-item
                          variant="text"
                          style="width: 180px; height: 16px; margin-bottom: 8px"
                        />
                        <el-skeleton-item variant="text" style="width: 120px; height: 14px" />
                      </div>
                      <el-skeleton-item variant="text" style="width: 60px; height: 16px" />
                      <el-skeleton-item variant="text" style="width: 40px; height: 16px" />
                    </div>
                  </div>
                  <div class="skeleton-state">
                    <el-skeleton-item
                      variant="text"
                      style="width: 60px; height: 16px; margin-bottom: 8px"
                    />
                    <el-skeleton-item variant="text" style="width: 50px; height: 14px" />
                  </div>
                  <div class="skeleton-amount">
                    <el-skeleton-item
                      variant="text"
                      style="width: 80px; height: 18px; margin-bottom: 5px"
                    />
                    <el-skeleton-item
                      variant="text"
                      style="width: 100px; height: 14px; margin-bottom: 5px"
                    />
                    <el-skeleton-item variant="text" style="width: 60px; height: 14px" />
                  </div>
                  <div class="skeleton-action">
                    <el-skeleton-item
                      variant="button"
                      style="width: 80px; height: 32px; margin-bottom: 8px"
                    />
                    <el-skeleton-item
                      variant="text"
                      style="width: 60px; height: 14px; margin-bottom: 5px"
                    />
                    <el-skeleton-item variant="text" style="width: 60px; height: 14px" />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </div>
        </div>

        <!-- 空状态 - 只在没有数据且不loading时显示 -->
        <div class="holder-container" v-else-if="showEmpty">
          <el-empty description="暂无订单数据" />
        </div>

        <!-- 内容 - 只在有数据且不loading时显示 -->
        <div v-else-if="showContent">
          <!-- 订单列表 -->
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <div class="head">
              <span>下单时间：{{ order.createTime }}</span>
              <span>订单编号：{{ order.id }}</span>
              <!-- 未付款，倒计时时间还有 -->
              <span class="down-time" v-if="order.orderState === 1">
                <i class="iconfont icon-down-time"></i>
                <b>付款截止: {{ order.countdown }}</b>
              </span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in order.skus" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="item.image" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ item.name }}
                      </p>
                      <p class="attr ellipsis">
                        <span>{{ item.attrsText }}</span>
                      </p>
                    </div>
                    <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                    <div class="count">x{{ item.quantity }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ order.orderState }}</p>
                <p v-if="order.orderState === 3">
                  <a href="javascript:;" class="green">查看物流</a>
                </p>
                <p v-if="order.orderState === 4">
                  <a href="javascript:;" class="green">评价商品</a>
                </p>
                <p v-if="order.orderState === 5">
                  <a href="javascript:;" class="green">查看评价</a>
                </p>
              </div>
              <div class="column amount">
                <p class="red">¥{{ order.payMoney?.toFixed(2) }}</p>
                <p>（含运费：¥{{ order.postFee?.toFixed(2) }}）</p>
                <p>在线支付</p>
              </div>
              <div class="column action">
                <el-button v-if="order.orderState === 1" type="primary" size="small">
                  立即付款
                </el-button>
                <el-button v-if="order.orderState === 3" type="primary" size="small">
                  确认收货
                </el-button>
                <p><a href="javascript:;">查看详情</a></p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <a href="javascript:;">再次购买</a>
                </p>
                <p v-if="[4, 5].includes(order.orderState)">
                  <a href="javascript:;">申请售后</a>
                </p>
                <p v-if="order.orderState === 1"><a href="javascript:;">取消订单</a></p>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination background layout="prev, pager, next" />
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}

.skeleton-container {
  .order-skeleton-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;
    background: #fff;

    .skeleton-header {
      height: 50px;
      background: #f5f5f5;
      padding: 17px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .skeleton-body {
      display: flex;
      align-items: stretch;
      min-height: 120px;

      .skeleton-goods {
        flex: 1;
        padding: 20px;

        .skeleton-goods-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;

          &:last-child {
            margin-bottom: 0;
          }

          .skeleton-goods-info {
            flex: 1;
          }
        }
      }

      .skeleton-state {
        width: 120px;
        padding: 20px;
        text-align: center;
        border-left: 1px solid #f5f5f5;
      }

      .skeleton-amount {
        width: 200px;
        padding: 20px;
        text-align: center;
        border-left: 1px solid #f5f5f5;
      }

      .skeleton-action {
        width: 140px;
        padding: 20px;
        text-align: center;
        border-left: 1px solid #f5f5f5;
      }
    }
  }
}
</style>
