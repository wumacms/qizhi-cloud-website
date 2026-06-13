<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { FeatureItem } from '../../api/qizhi'

defineProps<{
  title: string
  subtitle: string
  features: FeatureItem[]
  bgLight?: boolean
}>()
</script>

<template>
  <section id="features" :class="[
    'py-16 lg:py-24 transition-colors duration-200',
    bgLight ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'
  ]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center" v-reveal="{ duration: 650 }">
        <h2 class="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">{{ title }}</h2>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(feat, index) in features" :key="feat.title"
          class="rounded border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-xl transition-all duration-500 ease-spring hover:-translate-y-2"
          v-reveal="{ delay: index * 100 }">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-light dark:bg-brand-dark/30 text-brand dark:text-brand-light-text mb-4">
            <Icon :icon="feat.icon" class="h-6 w-6" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{{ feat.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{{ feat.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
