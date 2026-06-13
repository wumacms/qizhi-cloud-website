<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { NewsItem } from '../../api/qizhi'

defineProps<{
  article: NewsItem
  prevArticle: NewsItem | null
  nextArticle: NewsItem | null
}>()
</script>

<template>
  <div class="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 pb-24">
    <!-- Hero Header with Background Image and Title overlay -->
    <header class="relative h-[45vh] min-h-[350px] w-full flex items-end justify-start bg-slate-900 overflow-hidden">
      <!-- Background Image with overlay -->
      <div class="absolute inset-0 z-0">
        <img
          :src="article.image"
          :alt="article.title"
          class="w-full h-full object-cover opacity-50 dark:opacity-40"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8 pb-12" v-reveal="{ duration: 700 }">
        <span class="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground mb-4 shadow-sm">
          {{ article.category }}
        </span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
          {{ article.title }}
        </h1>
        <div class="mt-6 flex items-center gap-6 text-sm text-slate-300">
          <span class="flex items-center gap-1.5">
            <Icon icon="lucide:calendar" class="h-4 w-4 text-brand-light-text" />
            {{ article.date }}
          </span>
          <span class="flex items-center gap-1.5">
            <Icon icon="lucide:clock" class="h-4 w-4 text-brand-light-text" />
            {{ article.readTime }}
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content and Controls -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Navigation Path / Back Button at the top of reading section -->
      <div class="pt-8 flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-4" v-reveal="{ delay: 100 }">
        <router-link
          to="/news"
          class="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-brand transition-colors cursor-pointer"
        >
          <Icon icon="lucide:arrow-left" class="h-4 w-4 transform transition-transform group-hover:-translate-x-1" />
          返回新闻列表
        </router-link>
      </div>

      <!-- Article Text -->
      <article class="mt-10" v-reveal="{ delay: 200 }">
        <div class="space-y-6 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
          <p
            v-for="(paragraph, index) in article.content"
            :key="index"
            class="indent-0 sm:text-justify"
          >
            {{ paragraph }}
          </p>
        </div>
      </article>

      <!-- Previous & Next Navigation Buttons -->
      <nav class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-stretch gap-4" v-reveal="{ delay: 300 }">
        <!-- Previous button -->
        <component
          :is="prevArticle ? 'router-link' : 'span'"
          :to="prevArticle ? '/news/' + prevArticle.id : undefined"
          :class="[
            'flex-1 text-left p-5 rounded-xl border transition-all duration-300 flex flex-col gap-2 shadow-sm no-underline',
            prevArticle
              ? 'border-slate-200 dark:border-slate-800 hover:border-brand/40 dark:hover:border-brand/30 hover:bg-slate-50 dark:hover:bg-slate-900/40 cursor-pointer group'
              : 'border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Icon
              icon="lucide:arrow-left"
              :class="['h-3.5 w-3.5', prevArticle ? 'transform transition-transform group-hover:-translate-x-1' : '']"
            />
            上一篇
          </span>
          <span :class="[
            'text-sm font-bold line-clamp-1 transition-colors',
            prevArticle ? 'text-slate-900 dark:text-white group-hover:text-brand' : 'text-slate-400 dark:text-slate-600'
          ]">
            {{ prevArticle ? prevArticle.title : '没有了' }}
          </span>
        </component>

        <!-- Next button -->
        <component
          :is="nextArticle ? 'router-link' : 'span'"
          :to="nextArticle ? '/news/' + nextArticle.id : undefined"
          :class="[
            'flex-1 text-right p-5 rounded-xl border transition-all duration-300 flex flex-col items-end gap-2 shadow-sm no-underline',
            nextArticle
              ? 'border-slate-200 dark:border-slate-800 hover:border-brand/40 dark:hover:border-brand/30 hover:bg-slate-50 dark:hover:bg-slate-900/40 cursor-pointer group'
              : 'border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 opacity-50 cursor-not-allowed'
          ]"
        >
          <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            下一篇
            <Icon
              icon="lucide:arrow-right"
              :class="['h-3.5 w-3.5', nextArticle ? 'transform transition-transform group-hover:translate-x-1' : '']"
            />
          </span>
          <span :class="[
            'text-sm font-bold line-clamp-1 transition-colors',
            nextArticle ? 'text-slate-900 dark:text-white group-hover:text-brand' : 'text-slate-400 dark:text-slate-600'
          ]">
            {{ nextArticle ? nextArticle.title : '没有了' }}
          </span>
        </component>
      </nav>
    </main>
  </div>
</template>
