import {
  computed,
  defineComponent,
  inject,
  reactive,
  ref,
  Ref,
} from "@vue/composition-api";

import { GLOBAL_ISDARK } from "./providekey";

export function setEchartsTheme() {
  const isDark = inject<Ref<boolean>>(GLOBAL_ISDARK);
  return computed(() => {
    return isDark && isDark.value ? "dark" : "light";
  });
}