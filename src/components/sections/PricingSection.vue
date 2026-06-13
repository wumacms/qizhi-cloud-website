<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Plan } from '../../api/qizhi'

defineProps<{
  title: string
  subtitle: string
  plans: Plan[]
}>()

const emit = defineEmits<{
  'select-plan': [ctaType: string]
}>()
</script>

<template>
  <section id="pricing" class="py-16 lg:py-24 dark:bg-slate-950 transition-colors duration-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center" v-reveal="{ duration: 650 }">
        <h2 class="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">{{ title }}</h2>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
      </div>
      <div class="mt-12 grid gap-8 lg:grid-cols-3">
        <div v-for="(plan, index) in plans" :key="plan.name" :class="[
          'rounded p-8 shadow-sm transition-all duration-500 ease-spring hover:-translate-y-2 flex flex-col justify-between relative',
          plan.isRecommended
            ? 'border-2 border-brand bg-white dark:bg-slate-900 shadow-md hover:shadow-2xl'
            : 'border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 hover:shadow-xl'
        ]" v-reveal="{ delay: index * 120 }">
          
          <!-- Recommended Badge -->
          <span v-if="plan.isRecommended"
            class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground uppercase tracking-wider">
            最受推荐
          </span>

          <div>
            <h3 class="text-xl font-semibold text-slate-950 dark:text-white">{{ plan.name }}</h3>
            <div class="mt-6 flex items-end gap-1">
              <span class="text-4xl font-extrabold text-slate-950 dark:text-white">{{ plan.price }}</span>
              <span v-if="plan.period" class="pb-1 text-sm text-slate-500 dark:text-slate-400">{{ plan.period }}</span>
            </div>
            <ul
              class="mt-8 space-y-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-6">
              <li v-for="feat in plan.features" :key="feat" class="flex items-center gap-2">
                <Icon icon="lucide:check" class="h-4 w-4 text-green-500 shrink-0" />
                {{ feat }}
              </li>
            </ul>
          </div>

          <!-- CTA Button -->
          <button type="button" @click="emit('select-plan', plan.ctaType)" :class="[
            'mt-8 block w-full rounded px-5 py-3 text-center text-sm font-semibold transition-colors duration-200 cursor-pointer',
            plan.isRecommended
              ? 'bg-brand text-brand-foreground hover:bg-brand-hover shadow-md hover:shadow-brand/20'
              : 'border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-brand hover:text-brand-hover dark:hover:text-brand-light-text'
          ]">
            {{ plan.ctaText }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
