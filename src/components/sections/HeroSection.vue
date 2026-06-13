<script setup lang="ts">
import { computed } from 'vue'
import { sanitizeHtml } from '../../utils/sanitize'

const props = defineProps<{
  badge: string
  title: string
  description: string
  subDescription: string
  ctaText: string
  ctaSecondaryText: string
  imageSrc: string
  imageAlt: string
}>()

const emit = defineEmits<{
  'cta-click': []
  'cta-secondary-click': []
}>()

const sanitizedTitle = computed(() => sanitizeHtml(props.title))
</script>

<template>
  <section class="bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
    <div class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
      <div v-reveal="{ duration: 700 }">
        <p class="mb-4 text-sm font-semibold uppercase tracking-wide text-brand dark:text-brand-light-text-hover">
          {{ badge }}
        </p>
        <!-- v-html 内容经过 sanitizeHtml 消毒处理，仅保留安全内联标签 -->
        <h1 class="text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
          v-html="sanitizedTitle">
        </h1>
        <p class="mt-6 text-xl leading-8 text-slate-700 dark:text-slate-300">
          {{ description }}
        </p>
        <p class="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
          {{ subDescription }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" @click="emit('cta-click')"
            class="rounded bg-brand px-6 py-3 text-center text-sm font-semibold text-brand-foreground hover:bg-brand-hover transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-brand/20 cursor-pointer">
            {{ ctaText }}
          </button>
          <button type="button" @click="emit('cta-secondary-click')"
            class="rounded border border-slate-300 dark:border-slate-700 px-6 py-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-100 hover:border-brand hover:text-brand-hover dark:hover:border-brand-light-text-hover dark:hover:text-brand-light-text transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            {{ ctaSecondaryText }}
          </button>
        </div>
      </div>
      <div class="relative overflow-hidden rounded shadow-xl"
        v-reveal="{ direction: 'left', delay: 150, duration: 700 }">
        <img
          class="h-80 w-full rounded object-cover sm:h-96 lg:h-[520px] transition-transform duration-700 hover:scale-105"
          :src="imageSrc" :alt="imageAlt"
          width="1200" height="520"
          fetchpriority="high" />
      </div>
    </div>
  </section>
</template>
