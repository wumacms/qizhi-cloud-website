<script setup lang="ts">
import { watch, ref, nextTick, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  show: boolean
  title: string
  description: string
}>()

const emit = defineEmits<{
  'close': []
}>()

const modalRef = ref<HTMLElement | null>(null)

// 滚动锁定 & 焦点管理
watch(() => props.show, (val) => {
  if (val) {
    document.body.classList.add('overflow-hidden')
    nextTick(() => {
      modalRef.value?.focus()
    })
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

// Escape 键关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <!-- Overlay: 独立过渡，避免 backdrop-blur 通过父元素 opacity 被逐帧重新合成 -->
  <Transition name="overlay">
    <div v-if="show" class="fixed inset-0 z-50 overlay-backdrop" @click="emit('close')"></div>
  </Transition>

  <!-- Modal 内容: 独立过渡，与 overlay 解耦 -->
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-[51] flex items-center justify-center p-4 pointer-events-none">
      <div ref="modalRef" tabindex="-1" role="dialog" aria-modal="true"
        class="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/80 p-6 shadow-2xl backdrop-blur-md dark:bg-slate-900/80">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand dark:bg-brand-dark/30 dark:text-brand-light-text">
            <Icon icon="lucide:info" class="h-5 w-5" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ title }}</h3>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {{ description }}
        </p>
        <div class="mt-6 flex justify-end">
          <button @click="emit('close')" type="button"
            class="rounded bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand-hover active:bg-brand-hover transition-colors cursor-pointer">
            我已知晓
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* ── Overlay 过渡 ── */
.overlay-backdrop {
  background: rgb(2 6 23 / 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* 提升为独立合成层，减少 backdrop-blur 逐帧重绘开销 */
  will-change: opacity;
  transform: translateZ(0);
}

.overlay-enter-active {
  transition: opacity 0.15s ease-out;
}

.overlay-leave-active {
  transition: opacity 0.2s ease-in;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* ── Modal 内容过渡 ── */
.modal-enter-active {
  animation: modal-scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active {
  animation: modal-scale-out 0.2s ease-in forwards;
}

@keyframes modal-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(1rem);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modal-scale-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  to {
    opacity: 0;
    transform: scale(0.95) translateY(0.5rem);
  }
}
</style>
