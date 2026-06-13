<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { NewsConfig } from '../../api/qizhi'
import NewsCard from './NewsCard.vue'

const props = defineProps<{
  news: NewsConfig
}>()

// Filter states
const selectedCategory = ref('全部')
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 6

// Categories list with count
const categories = computed(() => {
  const allItems = props.news.items
  const counts: Record<string, number> = {
    '全部': allItems.length
  }
  
  allItems.forEach(item => {
    counts[item.category] = (counts[item.category] || 0) + 1
  })
  
  return Object.keys(counts).map(name => ({
    name,
    count: counts[name]
  }))
})

// Filtered items based on category and search query
const filteredItems = computed(() => {
  let items = props.news.items
  
  if (selectedCategory.value !== '全部') {
    items = items.filter(item => item.category === selectedCategory.value)
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    items = items.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.summary.toLowerCase().includes(query)
    )
  }
  
  return items
})

// Total pages based on filtered items
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredItems.value.length / pageSize))
})

// Current page items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredItems.value.slice(start, start + pageSize)
})

// Reset to page 1 whenever filter or query changes
watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1
})

// Scroll to top of the list when changing page
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  
  // Smooth scroll to the top of the news list section
  const el = document.getElementById('news-list-top')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const resetFilters = () => {
  selectedCategory.value = '全部'
  searchQuery.value = ''
  currentPage.value = 1
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-200" id="news-list-top">
    
    <!-- Hero Banner Section -->
    <section class="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 py-16 lg:py-20 transition-colors duration-200">
      <!-- Decorative Background Blur -->
      <div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-brand/10 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand/5 blur-3xl"></div>
      
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" v-reveal="{ duration: 700 }">
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4" aria-label="面包屑">
          <router-link to="/" class="hover:text-brand dark:hover:text-brand-light-text transition-colors cursor-pointer flex items-center gap-1">
            <Icon icon="lucide:home" class="h-3.5 w-3.5" />
            首页
          </router-link>
          <Icon icon="lucide:chevron-right" class="h-3 w-3 text-slate-400" />
          <span class="text-slate-900 dark:text-slate-200">新闻动态</span>
        </nav>
        
        <!-- Header Text -->
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-light dark:bg-brand-dark/30 px-3 py-1 text-xs font-semibold text-brand dark:text-brand-light-text mb-4">
            <Icon icon="lucide:newspaper" class="h-3.5 w-3.5" />
            新闻资讯中心
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            {{ news.title }}
          </h1>
          <p class="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ news.subtitle }}
          </p>
        </div>
      </div>
    </section>

    <!-- Filters & Search Toolbar -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors duration-200">
        
        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-2 items-center overflow-x-auto pb-1 md:pb-0" role="tablist">
          <button 
            v-for="cat in categories" 
            :key="cat.name"
            @click="selectedCategory = cat.name"
            role="tab"
            :aria-selected="selectedCategory === cat.name"
            class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-300 select-none border"
            :class="[
              selectedCategory === cat.name
                ? 'bg-brand border-brand text-brand-foreground shadow-sm shadow-brand/10'
                : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            {{ cat.name }}
            <span 
              class="inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] tracking-wide"
              :class="[
                selectedCategory === cat.name
                  ? 'bg-white/20 dark:bg-slate-950/20 text-brand-foreground'
                  : 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400'
              ]"
            >
              {{ cat.count }}
            </span>
          </button>
        </div>

        <!-- Search input box -->
        <div class="relative w-full md:max-w-xs">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon icon="lucide:search" class="h-4 w-4" />
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索文章标题或摘要..."
            class="block w-full pl-10 pr-10 py-2.5 text-xs font-medium bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-brand dark:focus:border-brand-light-text-hover focus:ring-1 focus:ring-brand/30 transition-all"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            type="button"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <Icon icon="lucide:x" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>

    <!-- News Grid / Empty State -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      
      <!-- Empty State -->
      <div 
        v-if="paginatedItems.length === 0"
        class="flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 py-16 px-4 transition-colors duration-200"
      >
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4">
          <Icon icon="lucide:search-code" class="h-8 w-8" />
        </div>
        <h3 class="text-base font-bold text-slate-950 dark:text-white">未找到匹配的新闻</h3>
        <p class="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
          尝试调整筛选条件，或者检查输入的搜索关键字是否正确。
        </p>
        <button 
          @click="resetFilters"
          type="button"
          class="mt-6 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-brand text-brand-foreground rounded-xl shadow-md hover:shadow-brand/20 hover:bg-brand-hover active:scale-95 transition-all cursor-pointer"
        >
          <Icon icon="lucide:rotate-ccw" class="h-3.5 w-3.5" />
          重置所有条件
        </button>
      </div>

      <!-- Card Grid -->
      <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <NewsCard 
          v-for="(item, index) in paginatedItems" 
          :key="item.id"
          :item="item"
          v-reveal="{ delay: (index % 3) * 100 }"
        />
      </div>

      <!-- Pagination Component -->
      <div 
        v-if="totalPages > 1" 
        class="mt-16 flex items-center justify-center gap-2"
        role="navigation"
        aria-label="分页导航"
      >
        <!-- Prev Page Button -->
        <button 
          @click="changePage(currentPage - 1)"
          type="button"
          :disabled="currentPage === 1"
          aria-label="上一页"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-all cursor-pointer"
        >
          <Icon icon="lucide:chevron-left" class="h-4 w-4" />
        </button>

        <!-- Page Numbers -->
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="changePage(page)"
          type="button"
          :aria-current="currentPage === page ? 'page' : undefined"
          class="inline-flex h-9 min-w-9 items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer border"
          :class="[
            currentPage === page
              ? 'bg-brand border-brand text-brand-foreground shadow-sm shadow-brand/10 font-extrabold'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
          ]"
        >
          {{ page }}
        </button>

        <!-- Next Page Button -->
        <button 
          @click="changePage(currentPage + 1)"
          type="button"
          :disabled="currentPage === totalPages"
          aria-label="下一页"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-all cursor-pointer"
        >
          <Icon icon="lucide:chevron-right" class="h-4 w-4" />
        </button>
      </div>

    </section>

  </div>
</template>

<style scoped>
/* Optional styling details */
</style>
