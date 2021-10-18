<template>
  <div>
    <ki-echarts-plus type="pie" :data="chartData.pie" style="height: 380px;" />
    <ki-echarts-plus type="line" :data="chartData.pie" style="height: 380px;" />
    <ki-echarts-plus type="line" :data="chartData.pie" style="height: 380px;" />
  </div>
</template>

<script lang="ts">
import KiEchartsPlus from "kidar-vue-echarts";
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { post } from "@/api/network";

export default defineComponent({
  components: { KiEchartsPlus },
  setup(_, ctx) {
    let chartData = reactive({
      pie: [],
    });
    let type = ref("pie");
    post("list500").then((res) => {
      chartData.pie = res.data;
      type.value = "line";
    });

    return {
      chartData,
      type,
    };
  },
});
</script>
