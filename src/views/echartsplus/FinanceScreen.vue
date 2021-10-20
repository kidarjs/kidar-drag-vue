<template>
  <div class="flex flex-wrap">
    <div class="w-full flex justify-center items-center">
      <div class="w-40 mx-3 my-2">
        <span class="text-3xl font-bold text-yellow-300 dark:text-white">348667</span><br /><span class="font-thin">扶贫资金总投入</span>
      </div>
    </div>
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <ki-echarts-plus type="line" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <ki-echarts-plus type="pie" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <ki-echarts-plus type="barX" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
    </div>
    <ki-echarts-plus type="pie" :data="chartData.pie" class="h-180 w-full xl:w-2/4" />
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <ki-echarts-plus type="mutiLine" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <ki-echarts-plus type="barY" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <ki-echarts-plus type="pie" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
    </div>
  </div>
</template>

<script lang="ts">
import { KiEchartsPlus } from "kidar-vue-echarts";
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { post } from "@/api/network";
import barX from "./plugins/barX";
import barY from "./plugins/barY";
import mutiLine from "./plugins/mutiLine";
import map from "./plugins/map";

KiEchartsPlus.addPlugin(barX)
  .addPlugin(barY)
  .addPlugin(mutiLine)
  .addPlugin(map);

export default defineComponent({
  components: { KiEchartsPlus },
  setup(_, ctx) {
    let chartData = reactive({
      pie: [],
      bar: [],
      mutiLine: [],
      mitiBar: [],
      map: [],
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
