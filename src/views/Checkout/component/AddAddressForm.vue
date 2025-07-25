<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="收货人" prop="receiver">
      <el-input v-model="ruleForm.receiver" placeholder="请输入收货人" />
    </el-form-item>
    <el-form-item label="收货人联系方式" prop="contact">
      <el-input v-model="ruleForm.contact" placeholder="请输入收货人联系方式" />
    </el-form-item>
    <el-form-item label="省份" prop="provinceCode">
      <el-select v-model="ruleForm.provinceCode" placeholder="选择省份">
        <el-option
          v-for="item in REGION_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="城市编码" prop="cityCode">
      <el-input v-model="ruleForm.cityCode" placeholder="请输入城市编码" />
    </el-form-item>
    <el-form-item label="地区编码" prop="countyCode">
      <el-input v-model="ruleForm.countyCode" placeholder="请输入地区编码" />
    </el-form-item>
    <el-form-item label="邮政编码" prop="postalCode">
      <el-input v-model="ruleForm.postalCode" placeholder="请输入邮政编码" />
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="ruleForm.address" placeholder="请输入详细地址" />
    </el-form-item>
    <el-form-item label="地址标签" prop="addressTags">
      <el-select v-model="ruleForm.addressTags" placeholder="请选择地址标签">
        <el-option label="家" value="家" />
        <el-option label="公司" value="公司" />
        <el-option label="学校" value="学校" />
        <el-option label="其他" value="其他" />
      </el-select>
    </el-form-item>
    <el-form-item class="button-group">
      <el-button type="primary" @click="submitForm(ruleFormRef)"> 保存 </el-button>
      <el-button @click="resetForm(ruleFormRef)">清空</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped lang="scss">
.el-form {
  max-width: 600px;
  margin: 0 auto;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;

  :deep(.el-form-item__content) {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
}
</style>
<script lang="ts" setup>
import { reactive, ref } from "vue";

import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  receiver: string;
  contact: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  address: string;
  addressTags: string;
  postalCode: string;
  isDefault: number;
  fullLocation: string;
}
const emit = defineEmits<{
  submit: [data: RuleForm];
}>();
const REGION_OPTIONS = [
  {
    label: "香港特别行政区",
    value: "810000",
  },
  {
    label: "澳门特别行政区",
    value: "820000",
  },
  {
    label: "北京市",
    value: "110000",
  },
  {
    label: "上海市",
    value: "310000",
  },
  {
    label: "广东省",
    value: "440000",
  },
  {
    label: "浙江省",
    value: "330000",
  },
  {
    label: "江苏省",
    value: "320000",
  },
  {
    label: "福建省",
    value: "350000",
  },
  {
    label: "湖南省",
    value: "430000",
  },
  {
    label: "湖北省",
    value: "420000",
  },
  {
    label: "四川省",
    value: "510000",
  },
  {
    label: "云南省",
    value: "530000",
  },
  {
    label: "贵州省",
    value: "520000",
  },
  {
    label: "山东省",
    value: "370000",
  },
  {
    label: "河南省",
    value: "410000",
  },
];
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  receiver: "",
  contact: "",
  provinceCode: "110000",
  cityCode: "110100",
  countyCode: "110101",
  address: "北京市海淀区",
  addressTags: "家",
  postalCode: "",
  isDefault: 0,
  fullLocation: "北京市海淀区故宫博物院",
});

const rules = reactive<FormRules<RuleForm>>({
  receiver: [
    { required: true, message: "请输入收货人", trigger: "blur" },
    { min: 2, max: 10, message: "长度应该为2到10位", trigger: "blur" },
  ],
  contact: [
    { required: true, message: "请输入收货人联系方式", trigger: "blur" },
    { min: 11, max: 11, message: "长度应该为11位", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  provinceCode: [
    {
      required: true,
      message: "请选择省份",
      trigger: "change",
    },
    {
      pattern: /^[1-9]\d{5}$/,
      message: "请选择正确的省份",
      trigger: "blur",
    },
  ],
  cityCode: [
    {
      required: true,
      message: "城市编码不能为空",
      trigger: "blur",
    },
  ],
  countyCode: [
    {
      required: true,
      message: "地区编码不能为空",
      trigger: "blur",
    },
  ],
  postalCode: [
    {
      required: true,
      message: "邮政编码不能为空",
      trigger: "blur",
    },
    {
      pattern: /^[1-9]\d{5}$/,
      message: "请输入正确的邮政编码",
      trigger: "blur",
    },
  ],
  address: [
    {
      required: true,
      message: "详细地址不能为空",
      trigger: "blur",
    },
  ],
  addressTags: [
    {
      required: true,
      message: "地址标签不能为空",
      trigger: "blur",
    },
  ],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("submit", { ...ruleForm });
      resetForm(formEl);
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>
