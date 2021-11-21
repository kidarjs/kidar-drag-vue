<template>
  <div class="flex flex-wrap h-full finance">
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <kidar-echarts title="趋势" type="arealine" :theme="theme" :cols="cols.area" :data="chartData.area" class="h-1/3 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts title="2020-2021比较" type="line-bar-x" :theme="theme" :cols="cols.linebar" :data="chartData.linebar" class="h-1/3 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts title="五大区占比" type="pie" :theme="theme" :data="chartData.pie" class="h-1/3 w-full lg:w-1/3 xl:w-full" />
    </div>
    <kidar-echarts title="全国资金流向" type="map" :theme="theme" :data="chartData.map" class="h-full w-full xl:w-2/4" />
    <div class="w-full xl:w-1/4 flex flex-wrap">
      <kidar-echarts title="实时" type="dybar" :theme="theme" :data="chartData.dybar" class="h-1/3 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts title="环比" type="ring" :theme="theme" :data="chartData.pie" class="h-1/3 w-full lg:w-1/3 xl:w-full" />
      <kidar-echarts title="峰值" type="line-bar-x" :theme="theme" :cols="cols.bar" :data="chartData.bar" class="h-1/3 w-full lg:w-1/3 xl:w-full" />
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
import { setEchartsTheme } from "@/common/useUtils";

export default defineComponent({
  components: { KidarEcharts },
  setup(_, ctx) {
    const isDark = inject<Ref<boolean>>(GLOBAL_ISDARK);
    const theme = setEchartsTheme();
    let chartData = reactive({
      pie: [],
      bar: [],
      area: [],
      linebar: [],
      map: [],
      dybar: [],
    });
    const cols = {
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
          name: "2020",
          prop: "gdp",
          color: "#1890ff",
          type: "bar",
          stack: "year",
        },
        {
          name: "2021",
          prop: "gdp2",
          color: "#ff90ff",
          type: "bar",
          stack: "2021",
        },
        {
          name: "比例",
          prop: "ratio",
          color: "#44ff99",
          type: "line",
          y1: true,
        },
      ],
      bar: [
        { name: "2019", prop: "value", color: "#fbd161", type: "pictorialBar" },
      ],
    };
    let type = ref("pie");
    post("list-area").then((res) => (chartData.pie = res.data));
    post("list-month").then((res) => {
      chartData.area = res.data;
      chartData.linebar = res.data;
      chartData.bar = res.data;
    });
    post("relationCities").then((res) => (chartData.map = res.data));

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