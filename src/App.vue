<template>
  <div class="page-wrapper">
    <TopNav v-if="showNav" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopNav from './components/TopNav.vue'

const route = useRoute()
const showNav = computed(() => !['/', '/login', '/logout'].includes(route.path))
</script>
