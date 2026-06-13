<script setup lang="ts">
import type { TeamMember } from '../../api/qizhi'

defineProps<{
  title: string
  subtitle: string
  members: TeamMember[]
  bgLight?: boolean
}>()
</script>

<template>
  <section id="team" :class="[
    'py-16 lg:py-24 transition-colors duration-200',
    bgLight ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-950'
  ]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center" v-reveal="{ duration: 650 }">
        <h2 class="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">{{ title }}</h2>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(member, index) in members" :key="member.name"
          class="rounded border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 p-6 text-center shadow-sm hover:shadow-xl transition-all duration-500 ease-spring hover:-translate-y-2"
          v-reveal="{ delay: index * 100 }">
          <img class="mx-auto h-24 w-24 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800"
            :src="member.avatar" :alt="member.name + '头像'"
            width="300" height="300" loading="lazy" />
          <h3 class="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{{ member.name }}</h3>
          <p class="mt-1 text-sm font-medium text-brand-hover dark:text-brand-light-text">{{ member.role }}</p>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-400">{{ member.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
