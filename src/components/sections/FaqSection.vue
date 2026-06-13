<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  title: string
  faqs: Array<{ question: string; answer: string }>
  bgLight?: boolean
}>()
</script>

<template>
  <section id="faq" :class="[
    'py-16 lg:py-24 transition-colors duration-200',
    bgLight ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'
  ]">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="text-center" v-reveal="{ duration: 650 }">
        <h2 class="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">{{ title }}</h2>
      </div>
      <div class="mt-10 space-y-4">
        <details v-for="(faq, index) in faqs" :key="index"
          class="group rounded border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 shadow-sm overflow-hidden"
          v-reveal="{ delay: index * 80 }">
          <summary
            class="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-slate-950 dark:text-white text-base select-none list-none [&::-webkit-details-marker]:hidden">
            <span>{{ faq.question }}</span>
            <Icon icon="lucide:chevron-down"
              class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div class="px-6 pb-5">
            <p class="text-sm leading-6 text-slate-600 dark:text-slate-400">
              {{ faq.answer }}
            </p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>
