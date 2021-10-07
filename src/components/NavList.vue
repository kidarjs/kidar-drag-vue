<template>
  <div class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0">
    <div class="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"></div>
    <nav class="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-16 sticky?lg:h-(screen-18)">
      <ul>
        <li class="mt-8" v-for="item in data" :key="item.name">
          <h5 class="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm lg:text-xs text-gray-900">{{item.name}}</h5>
          <ul v-if="item.children && item.children.length>0">
            <li v-for="child in item.children" :key="child.name">
              <router-link class="px-3 py-2 transition-colors duration-200 relative block hover:bg-cyan-100"
                           :class="currentRoute===child.name?'text-cyan-700 bg-cyan-100':'hover:text-gray-900 text-gray-500'" :to="{ name: child.name }">
                <span class="rounded-md absolute inset-0 bg-cyan-50 opacity-0"></span>
                <span class="relative">{{child.name}}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  props: {
    data: { type: Array, default: () => [] },
  },
  setup(_, ctx) {
    const currentRoute = computed(() => ctx.root.$route.name);

    return {
      currentRoute,
    };
  },
});
</script>
