<template>
  <div class="help-page">
    <div class="help-header">
      <div class="container">
        <h1>帮助中心</h1>
        <p>为您解答使用过程中的常见问题</p>
      </div>
    </div>

    <div class="help-content container">
      <section class="faq-section">
        <h2>常见问题</h2>
        <div class="faq-list">
          <div class="faq-item">
            <h3>如何注册账号？</h3>
            <p>点击页面右上角的"请先登录"，选择注册选项，按提示填写相关信息即可完成注册。</p>
          </div>
          <div class="faq-item">
            <h3>如何修改收货地址？</h3>
            <p>登录后进入"会员中心"，在左侧菜单选择"收货地址"，即可管理您的收货地址。</p>
          </div>
          <div class="faq-item">
            <h3>商品何时送达？</h3>
            <p>我们承诺在下单后24小时内送达，具体送达时间可在订单详情页查看。</p>
          </div>
          <div class="faq-item">
            <h3>如何申请退款？</h3>
            <p>在"我的订单"中找到相应订单，点击"申请退款"，按提示操作即可。</p>
          </div>
        </div>
      </section>

      <section class="contact-section">
        <h2>联系我们</h2>
        <div class="contact-info">
          <div class="contact-item">
            <h3>客服热线</h3>
            <p>400-0000-000</p>
            <p class="time">周一至周日 8:00-18:00</p>
          </div>
          <div class="contact-item">
            <h3>在线客服</h3>
            <p>点击右下角客服图标</p>
            <p class="time">24小时在线服务</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup></script>
<style scoped lang="scss">
.help-page {
  min-height: 100vh;
  background-color: #fff;
}

.help-header {
  background: linear-gradient(to right, #27ae60, #2ecc71);
  color: white;
  padding: 60px 0;
  text-align: center;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2em;
  }
}

.help-content {
  padding: 60px 0;

  section {
    margin-bottom: 50px;

    h2 {
      font-size: 1.8em;
      margin-bottom: 30px;
      color: #333;
    }
  }
}

.faq-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  .faq-item {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: #27ae60;
      margin-bottom: 15px;
      font-size: 1.2em;
    }

    p {
      color: #666;
      line-height: 1.6;
    }
  }
}

.contact-info {
  display: flex;
  gap: 40px;

  .contact-item {
    flex: 1;
    text-align: center;
    padding: 30px;
    background: #f8f9fa;
    border-radius: 8px;

    h3 {
      color: #27ae60;
      margin-bottom: 15px;
      font-size: 1.2em;
    }

    p {
      color: #666;
      margin-bottom: 10px;

      &.time {
        font-size: 0.9em;
        color: #999;
      }
    }
  }
}
</style>
