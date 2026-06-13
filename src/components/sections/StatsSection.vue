<script setup lang="ts">
import type { StatItem } from '../../api/qizhi'

defineProps<{
  stats: StatItem[]
}>()
</script>

<template>
  <section class="bg-brand py-16 dark:bg-brand-hover transition-colors duration-200">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8"
      v-reveal="{ duration: 650 }">
      <div v-for="stat in stats" :key="stat.label">
        <div class="text-5xl font-extrabold text-brand-foreground">{{ stat.value }}</div>
        <div class="mt-2 text-base font-medium text-brand-light-strong">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>
