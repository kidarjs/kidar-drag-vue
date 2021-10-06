<template>
  <div>
    <ki-echarts-plus type="pie" :data="chartData.pie" style="height: 380px;" />
  </div>
</template>

<script lang="ts">
import KiEchartsPlus from "@/packages/echartsplus/KiEchartsPlus.vue";
import { defineComponent, reactive, watchEffect } from "@vue/composition-api";
import { post } from "@/api/network";

export default defineComponent({
  components: { KiEchartsPlus },
  setup(_, ctx) {
    let chartData = reactive({
      pie: [],
    });
    post("list500").then((res) => {
      chartData.pie = res.data;
    });

    return {
      chartData,
    };
  },
});
</script>
