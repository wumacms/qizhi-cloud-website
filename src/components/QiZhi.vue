<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { Icon } from '@iconify/vue'
import { useTitle } from '@vueuse/core'

// Import API layer and types
import { getQiZhiData, type QiZhiData } from '../api/qizhi'

// Import layout components (shared across all routes)
import PageHeader from './sections/PageHeader.vue'
import PageFooter from './sections/PageFooter.vue'
import FeedbackModal from './sections/FeedbackModal.vue'

useTitle('启知云课堂 - 在线培训机构落地页')

// API Data State
const pageData = ref<QiZhiData | null>(null)
provide('pageData', pageData)
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadPageData = async () => {
  try {
    error.value = null
    isLoading.value = true
    pageData.value = await getQiZhiData()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : '获取数据失败，请重试'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  // Load landing page config data
  await loadPageData()
})

// Interaction feedback modal
const showModal = ref(false)
const modalTitle = ref('')
const modalDesc = ref('')
const triggerAction = (type: string) => {
  showModal.value = true
  const messages = pageData.value?.modalMessages
  const msg = (messages && messages[type]) || (messages && messages['default'])
  if (msg) {
    modalTitle.value = msg.title
    modalDesc.value = msg.description
  }
}
</script>

<template>
  <!-- Loading State -->
  <div v-if="isLoading"
    class="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
    <div class="relative flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-brand"></div>
    </div>
    <p class="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse">正在加载云课堂配置数据...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="error"
    class="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-200">
    <div
      class="max-w-md w-full text-center p-8 rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-slate-900 shadow-xl">
      <Icon icon="lucide:alert-triangle" class="mx-auto h-12 w-12 text-red-500" />
      <h3 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">数据加载失败</h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ error }}</p>
      <button @click="loadPageData" type="button"
        class="mt-6 rounded bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-hover active:bg-brand-hover transition-colors cursor-pointer shadow-md hover:shadow-brand/20">
        重新获取
      </button>
    </div>
  </div>

  <!-- Main Content Loaded State -->
  <div v-else-if="pageData"
    class="min-h-screen bg-background text-foreground transition-colors duration-300">
    
    <!-- Header component (shared layout) -->
    <PageHeader
      v-bind="pageData.header"
      @cta-click="triggerAction('trial')"
    />

    <main class="overflow-x-hidden">
      <!-- Vue Router View: renders route-matched component -->
      <router-view v-slot="{ Component }">
        <component
          :is="Component"
          @trigger-action="triggerAction"
        />
      </router-view>
    </main>

    <!-- Footer Component (shared layout) -->
    <PageFooter
      :copyright="pageData.footer.copyright"
    />

    <!-- Interactive Feedback Modal -->
    <FeedbackModal
      :show="showModal"
      :title="modalTitle"
      :description="modalDesc"
      @close="showModal = false"
    />
  </div>
</template>
