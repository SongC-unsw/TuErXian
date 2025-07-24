<script setup>
import { ref } from "vue";

const teamMembers = ref([
  {
    name: "张三",
    role: "创始人 & CEO",
    description: "拥有10年电商平台开发经验，致力于为用户提供最优质的购物体验。",
  },
  {
    name: "李四",
    role: "技术总监",
    description: "专注于系统架构设计和性能优化，确保平台的稳定运行。",
  },
  {
    name: "王五",
    role: "产品经理",
    description: "深入研究用户需求，持续改进产品体验。",
  },
]);

const companyInfo = ref({
  mission: "为用户提供优质、新鲜、安全的商品，打造一站式生鲜购物平台。",
  vision: "成为中国最受信赖的生鲜电商平台。",
  values: ["诚信经营", "品质保证", "用户至上", "创新发展"],
});
</script>

<template>
  <div class="about-page">
    <div class="about-header">
      <div class="container">
        <h1>关于小兔鲜</h1>
        <p>用科技改变生鲜购物体验</p>
      </div>
    </div>

    <div class="about-content container">
      <section class="mission-section">
        <h2>我们的使命</h2>
        <p>{{ companyInfo.mission }}</p>
        <h2>我们的愿景</h2>
        <p>{{ companyInfo.vision }}</p>
      </section>

      <section class="values-section">
        <h2>核心价值观</h2>
        <div class="values-grid">
          <div v-for="value in companyInfo.values" :key="value" class="value-item">
            {{ value }}
          </div>
        </div>
      </section>

      <section class="team-section">
        <h2>团队介绍</h2>
        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.name" class="team-member">
            <h3>{{ member.name }}</h3>
            <p class="role">{{ member.role }}</p>
            <p class="description">{{ member.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-page {
  min-height: 100vh;
  background-color: #fff;
}

.about-header {
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
    opacity: 0.9;
  }
}

.about-content {
  padding: 40px 0;

  section {
    margin-bottom: 60px;
  }

  h2 {
    color: #333;
    font-size: 1.8em;
    margin-bottom: 30px;
    position: relative;
    padding-bottom: 15px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: $xtxColor;
    }
  }
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;

  .value-item {
    background-color: #f8f9fa;
    padding: 30px;
    text-align: center;
    border-radius: 8px;
    font-size: 1.2em;
    color: #333;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      background-color: #27ae60;
      color: white;
    }
  }
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;

  .team-member {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      color: #333;
      font-size: 1.4em;
      margin-bottom: 10px;
    }

    .role {
      color: $xtxColor;
      font-size: 1.1em;
      margin-bottom: 15px;
    }

    .description {
      color: #666;
      line-height: 1.6;
    }
  }
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
