<script setup lang="ts">
defineProps<{
  title: string
  description: string
  ctaText: string
  ctaSecondaryText: string
}>()

const emit = defineEmits<{
  'cta-click': []
  'cta-secondary-click': []
}>()
</script>

<template>
  <section class="bg-slate-950 py-16 lg:py-20 relative overflow-hidden transition-colors duration-200">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-border-dark/20 via-transparent to-transparent opacity-60">
    </div>
    <div class="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 relative z-10"
      v-reveal="{ animation: 'zoom', duration: 700 }">
      <h2 class="text-3xl font-bold text-white sm:text-4xl">{{ title }}</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">{{ description }}</p>
      <div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <button type="button" @click="emit('cta-click')"
          class="rounded bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground hover:bg-brand-hover transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-brand/20 cursor-pointer">
          {{ ctaText }}
        </button>
        <button type="button" @click="emit('cta-secondary-click')"
          class="rounded border border-slate-600 px-6 py-3.5 text-sm font-semibold text-white hover:border-white hover:bg-white/5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
          {{ ctaSecondaryText }}
        </button>
      </div>
    </div>
  </section>
</template>
