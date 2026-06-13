<script setup lang="ts">
import { computed, inject, watchEffect, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'
import type { QiZhiData } from '../api/qizhi'
import NewsDetail from '../components/sections/NewsDetail.vue'

const pageData = inject<Ref<QiZhiData>>('pageData')!
const route = useRoute()
const title = useTitle()

const newsItems = computed(() => pageData.value.news.items)

const articleIndex = computed(() => {
  const id = route.params.id as string
  return newsItems.value.findIndex(item => item.id === id)
})

const article = computed(() => {
  if (articleIndex.value === -1) return null
  return newsItems.value[articleIndex.value]
})

const prevArticle = computed(() => {
  if (articleIndex.value <= 0) return null
  return newsItems.value[articleIndex.value - 1]
})

const nextArticle = computed(() => {
  if (articleIndex.value === -1 || articleIndex.value >= newsItems.value.length - 1) return null
  return newsItems.value[articleIndex.value + 1]
})

watchEffect(() => {
  if (article.value) {
    title.value = `${article.value.title} - 启知云课堂`
  } else {
    title.value = '启知云课堂 - 在线培训机构落地页'
  }
})
</script>

<template>
  <NewsDetail
    v-if="article"
    :article="article"
    :prevArticle="prevArticle"
    :nextArticle="nextArticle"
  />
  <div v-else class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
    <div class="text-center p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl max-w-sm w-full mx-4">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">文章不存在</h3>
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">无法找到指定 ID 的新闻资讯内容。</p>
      <router-link
        to="/news"
        class="mt-6 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-brand text-brand-foreground rounded-xl shadow-md hover:shadow-brand/20 hover:bg-brand-hover active:scale-95 transition-all cursor-pointer"
      >
        返回新闻列表
      </router-link>
    </div>
  </div>
</template>
