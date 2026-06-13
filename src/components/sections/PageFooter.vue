<script setup lang="ts">
defineProps<{
  copyright: string
}>()
</script>

<template>
  <footer
    class="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors duration-200">
    <div class="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:px-8">
      {{ copyright }}
    </div>
  </footer>
</template>
