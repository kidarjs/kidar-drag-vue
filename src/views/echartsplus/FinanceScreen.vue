<template>
  <div class="flex flex-wrap">
    <div class="w-full flex justify-center items-center">
      <div class="w-40 mx-3 my-2">
        <span class="text-3xl font-bold text-yellow-300 dark:text-white">348667</span><br /><span class="font-thin">扶贫资金总投入</span>
      </div>
    </div>
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <kidar-echarts type="line" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts type="pie" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts type="map" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
    </div>
    <kidar-echarts type="earth" :data="chartData.pie" class="h-180 w-full xl:w-2/4" />
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <kidar-echarts type="multi-line-bar-x" :cols="cols" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts type="map3d" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts type="dybar" :data="chartData.pie" class="h-60 w-full lg:w-1/3 xl:w-full" />
    </div>
  </div>
</template>

<script lang="ts">
import { KidarEcharts } from "kidar-echarts";
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { post } from "@/api/network";

export default defineComponent({
  components: { KidarEcharts },
  setup(_, ctx) {
    let chartData = reactive({
      pie: [],
      bar: [],
      mutiLine: [],
      mitiBar: [],
      map: [],
    });
    const cols = [
      { name: "人", prop: "people", type: "bar" },
      { name: "gdp", prop: "gdp", type: "line" },
    ];
    let type = ref("pie");
    post("list500").then((res) => {
      chartData.pie = res.data;
      type.value = "line";
    });

    return {
      chartData,
      type,
      cols,
    };
  },
});
</script>
