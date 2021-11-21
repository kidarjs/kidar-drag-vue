<template>
  <header class="text-gray-600 body-font border-b-1 border-gray-400">
    <div class="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
      <RouterLink :to="{ path: '/' }" class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
        <img alt="Vite logo" src="@/assets/logo.png" width="36px" />
        <span class="ml-3 text-xl dark:text-white">
          {{ appName }}
        </span>
      </RouterLink>
      <nav class="flex flex-wrap items-center justify-center text-base md:ml-auto">
        <RouterLink v-for="(route, index) in routes" :key="index" class="mr-5 font-semibold cursor-pointer" :class="{
            'text-green-500 hover:green-500 dark:text-green-500 dark:hover:text-green-500 underline':
              currentRoute.includes(route.name),
            'hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200':
              !currentRoute.includes(route.name),
          }" :to="{ path: route.path }">
          {{ route.name }}
        </RouterLink>
        <RouterLink class="flex items-center justify-center mr-2 text-black w-9 h-9 dark:text-white" to="/aliens">
          <i-mdi-qqchat class="text-red-500" />
        </RouterLink>
        <a href="https://github.com/kidarjs/kidar-vue" target="_blank" class="flex items-center justify-center mr-2 text-black w-9 h-9 dark:text-white">
          <i-mdi-github />
        </a>
        <button @click="toggle" class="flex items-center justify-center w-9 h-9 focus:outline-none">
          <i-mdi-brightness-6 v-show="!isDark" class="text-black animate-roll-in" />
          <i-mdi-brightness-4 v-show="isDark" class="text-white animate-heart-beat " />
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  isRef,
  provide,
  ref,
  watchEffect,
} from "vue-demi";
import { routes } from "@/router";
import { useDark } from "@vueuse/core";

export default defineComponent({
  setup: (_, ctx) => {
    // Import config from .evn
    const appName = import.meta.env.VITE_APP_NAME;
    const availableRoutes = routes.filter((route) => route.name != "NotFound");
    const currentRoute = computed(() =>
      ctx.root.$route.matched.map((t) => t.name)
    );

    const isDark = useDark();
    ctx.emit("themeChange", isDark.value);
    const toggle = () => {
      isDark.value = !isDark.value;
      ctx.emit("themeChange", isDark.value);
    };

    return { appName, routes: availableRoutes, currentRoute, toggle, isDark };
  },
});
</script>

<style scoped>
  @keyframes identifier {
  }
</style>