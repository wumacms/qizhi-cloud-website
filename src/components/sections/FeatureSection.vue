<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  layout: 'image-left' | 'image-right' | 'full-width'
  tags?: string[]
  bgLight?: boolean
}>()

const isImageLeft = computed(() => props.layout === 'image-left')
const isFullWidth = computed(() => props.layout === 'full-width')

const tagClass = computed(() => {
  if (props.bgLight) {
    return 'rounded border border-brand-border dark:border-brand-border-dark px-4 py-2 text-sm font-medium text-brand-hover dark:text-brand-light-text bg-white dark:bg-slate-950/40'
  } else {
    return 'rounded bg-brand-light dark:bg-brand-dark/50 border border-brand-border dark:border-brand-border-dark/50 px-4 py-2 text-sm font-medium text-brand-hover dark:text-brand-light-text'
  }
})
</script>

<template>
  <section :class="[
    'py-16 lg:py-24 transition-colors duration-200',
    bgLight ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'
  ]">
    <!-- Full Width Layout -->
    <div v-if="isFullWidth" class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" v-reveal="{ duration: 700 }">
      <h2 class="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">{{ title }}</h2>
      <p class="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
        {{ description }}
      </p>
      <div v-if="tags && tags.length" class="mt-6 flex flex-wrap justify-center gap-3">
        <span v-for="tag in tags" :key="tag" :class="tagClass">{{ tag }}</span>
      </div>
      <div class="mt-10 overflow-hidden rounded-lg shadow-2xl">
        <img class="h-80 w-full object-cover sm:h-[520px] transition-transform duration-700 hover:scale-102"
          :src="imageSrc" :alt="imageAlt"
          width="1400" height="520" loading="lazy" />
      </div>
    </div>

    <!-- Image-Left or Image-Right Layout -->
    <div v-else class="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <!-- Image Column -->
      <div :class="[
        'overflow-hidden rounded shadow-lg',
        isImageLeft ? 'order-1 lg:order-1' : 'order-2 lg:order-2'
      ]" v-reveal="isImageLeft ? { direction: 'right', duration: 700 } : { direction: 'left', delay: 120, duration: 700 }">
        <img class="h-80 w-full rounded object-cover lg:h-[460px] transition-transform duration-700 hover:scale-105"
          :src="imageSrc" :alt="imageAlt"
          width="1200" height="460" loading="lazy" />
      </div>

      <!-- Text Column -->
      <div :class="[
        isImageLeft ? 'order-2 lg:order-2' : 'order-1 lg:order-1'
      ]" v-reveal="isImageLeft ? { direction: 'left', delay: 120, duration: 700 } : { direction: 'right', duration: 700 }">
        <h2 class="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">{{ title }}</h2>
        <p class="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
          {{ description }}
        </p>
        <div v-if="tags && tags.length" class="mt-6 flex flex-wrap gap-3">
          <span v-for="tag in tags" :key="tag" :class="tagClass">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
