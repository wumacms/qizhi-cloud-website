<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { NewsConfig } from '../../api/qizhi'
import NewsCard from './NewsCard.vue'

defineProps<{
  title: string
  subtitle: string
  news: NewsConfig
  bgLight?: boolean
}>()
</script>

<template>
  <section id="news" :class="[
    'py-16 lg:py-24 transition-colors duration-200',
    bgLight ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'
  ]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <div class="mx-auto max-w-3xl text-center" v-reveal="{ duration: 650 }">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-light dark:bg-brand-dark/30 px-3 py-1 text-xs font-semibold text-brand dark:text-brand-light-text mb-4">
          <Icon icon="lucide:newspaper" class="h-3.5 w-3.5" />
          最新动态
        </span>
        <h2 class="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
          {{ title }}
        </h2>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
          {{ subtitle }}
        </p>
      </div>

      <!-- News Grid -->
      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <NewsCard
          v-for="(item, index) in news.items.slice(0, 3)"
          :key="item.id"
          :item="item"
          v-reveal="{ delay: index * 100 }"
        />
      </div>

      <!-- View More Button -->
      <div class="mt-12 text-center" v-reveal="{ delay: 300 }">
        <router-link
          to="/news"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-brand dark:hover:text-brand-light-text hover:border-brand dark:hover:border-brand-light-text-hover transition-all duration-300 shadow-sm hover:shadow-brand/5 cursor-pointer group"
        >
          查看全部新闻动态
          <Icon
            icon="lucide:arrow-right"
            class="h-4 w-4 transform transition-transform group-hover:translate-x-1"
          />
        </router-link>
      </div>
    </div>
  </section>
</template>
