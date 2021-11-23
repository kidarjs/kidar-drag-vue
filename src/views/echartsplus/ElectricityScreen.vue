<template>
  <div class="flex flex-wrap h-full finance">
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <kidar-echarts title="峰值" type="line-bar-x" :theme="theme" :cols="cols.bar" :data="chartData.bar" class="h-70 w-full lg:w-1/3 xl:w-full xl:h-1/3" />
      <kidar-echarts title="近三年比较" type="line-bar-x" :theme="theme" :cols="cols.linebar" :data="chartData.linebar" class="h-70 w-full lg:w-1/3 xl:w-full xl:h-1/3" />
      <kidar-echarts title="地区分布" type="map" :theme="theme" :data="chartData.map" class="h-70 w-full lg:w-1/3 xl:w-full xl:h-1/3" />
    </div>
    <kidar-echarts title="热点关注度" type="graph" :theme="theme" :data="chartData.graph" class="h-90 w-full xl:w-2/4 xl:h-full" />
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <kidar-echarts title="趋势波动" type="line-bar-x" :theme="theme" :cols="cols.line" :data="chartData.bar" class="h-70 w-full lg:w-1/3 xl:w-full xl:h-1/3" />
      <kidar-echarts title="占比" type="ring" :theme="theme" :data="chartData.pie" class="h-70 w-full lg:w-1/3 xl:w-full xl:h-1/3" />
      <kidar-echarts type="treemap" :theme="theme" :cols="cols.area" :data="chartData.area" class="h-70 w-full lg:w-1/3 xl:w-full xl:h-1/3" />
    </div>
  </div>
</template>

<script lang="ts">
import { KidarEcharts } from "kidar-echarts";
import {
  computed,
  defineComponent,
  inject,
  reactive,
  ref,
  Ref,
} from "@vue/composition-api";
import { post } from "@/api/network";
import { GLOBAL_ISDARK } from "@/common/providekey";

export default defineComponent({
  components: { KidarEcharts },
  setup(_, ctx) {
    const isDark = inject<Ref<boolean>>(GLOBAL_ISDARK);
    const theme = computed(() => {
      return isDark && isDark.value ? "dark" : "light";
    });
    let chartData = reactive({
      graph: [],
      pie: [],
      bar: [],
      area: [],
      linebar: [],
      map: [],
      dybar: [],
    });
    const cols = {
      line: [
        {
          name: "交通",
          prop: "subway",
          color: "#44ff99",
          type: "line",
          y1: true,
        },
        {
          name: "人口",
          prop: "people",
          color: "#1890ff",
          type: "line",
          y1: true,
        },
        { name: "GDP2020", prop: "gdp", color: "#ff90ff", type: "line" },
        { name: "GDP2021", prop: "gdp2", color: "#f87d5a", type: "line" },
      ],
      area: [
        {
          name: "2021",
          prop: "subway",
          color: "#44ff99",
        },
        {
          name: "2020",
          prop: "people",
          color: "#ff90ff",
        },
      ],
      linebar: [
        {
          name: "2019",
          prop: "gdp",
          color: "#44ff99",
          type: "bar",
          y1: true,
        },
        {
          name: "2020",
          prop: "subway",
          color: "#1890ff",
          type: "bar",
          stack: "year",
        },
        {
          name: "2021",
          prop: "people",
          color: "#ff90ff",
          type: "bar",
          stack: "2021",
        },
      ],
      bar: [
        {
          name: "2019",
          prop: "people",
          color: "#fbd161",
          type: "pictorialBar",
        },
        {
          name: "2020",
          prop: "subway",
          color: "#1890ff",
          type: "pictorialBar",
        },
      ],
    };
    let type = ref("pie");
    post("list-area").then((res) => (chartData.pie = res.data));
    post("list-month").then((res) => {
      chartData.area = res.data;
      chartData.linebar = res.data;
      chartData.bar = res.data;
    });

    post("list-text").then((res) => (chartData.graph = res.data));
    post("list-city").then((res) => (chartData.map = res.data));

    post("list-inc").then((res) => (chartData.dybar = res.data));
    setInterval(() => {
      post("list-inc").then((res) => (chartData.dybar = res.data));
    }, 3000);

    return {
      chartData,
      type,
      cols,
      theme,
    };
  },
});
</script>
<style scoped>
  .finance div {
    overflow: hidden;
  }
</style>