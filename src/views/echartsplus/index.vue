<template>
  <div class="flex">
    <side-bar>
      <nav-list :data="navList"></nav-list>
    </side-bar>
    <content-wrapper>
      <router-view />
    </content-wrapper>
  </div>
</template>

<script>
import ContentWrapper from '@/components/layout/ContentWrapper.vue'
import { defineComponent } from '@vue/composition-api'
import { screenRoutes, echartsPluginsRoutes } from '@/router'

export default defineComponent({
  components: { ContentWrapper },
  setup () {

    const navList = [
      {
        name: '大屏样例', children: screenRoutes.map(t => {
          t.href = '/echartsplus/' + t.path
          return t
        })
      },
      {
        name: '组件', children: echartsPluginsRoutes.map(t => {
          t.href = '/echartsplus/' + t.path
          return t
        })
      }
    ]

    return { navList }
  },
})
</script>
