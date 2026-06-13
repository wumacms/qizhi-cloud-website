<script setup lang="ts">
import { inject, type Ref } from 'vue'
import type { QiZhiData } from '../api/qizhi'
import NewsList from '../components/sections/NewsList.vue'

const pageData = inject<Ref<QiZhiData>>('pageData')!
</script>

<template>
  <NewsList :news="pageData.news" />
</template>
