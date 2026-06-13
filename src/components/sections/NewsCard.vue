<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { NewsItem } from '../../api/qizhi'

defineProps<{
  item: NewsItem
  showSummary?: boolean
}>()
</script>

<template>
  <article
    class="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-xl transition-all duration-500 ease-spring hover:-translate-y-2 group"
  >
    <!-- Cover Image Container -->
    <div class="aspect-[16/10] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md bg-white/85 dark:bg-slate-950/85 text-slate-900 dark:text-slate-100 shadow-sm border border-white/20 dark:border-slate-800/30">
        {{ item.category }}
      </span>
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>

    <!-- Content Container -->
    <div class="flex flex-1 flex-col p-6">
      <!-- Metadata -->
      <div class="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <span class="flex items-center gap-1">
          <Icon icon="lucide:calendar" class="h-3.5 w-3.5" />
          {{ item.date }}
        </span>
        <span class="flex items-center gap-1">
          <Icon icon="lucide:clock" class="h-3.5 w-3.5" />
          {{ item.readTime }}
        </span>
      </div>

      <!-- Title -->
      <router-link :to="'/news/' + item.id" class="block">
        <h3 class="text-lg font-bold text-slate-950 dark:text-white line-clamp-2 h-14 leading-7 group-hover:text-brand transition-colors duration-300">
          {{ item.title }}
        </h3>
      </router-link>

      <!-- Optional Summary -->
      <p
        v-if="showSummary"
        class="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed"
      >
        {{ item.summary }}
      </p>
    </div>
  </article>
</template>
