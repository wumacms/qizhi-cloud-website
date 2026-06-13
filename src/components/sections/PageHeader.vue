<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import type { PageHeaderConfig } from '../../api/qizhi'
import { useTheme } from '../../composables/useTheme'

const props = defineProps<PageHeaderConfig>()

const emit = defineEmits<{
  'cta-click': []
}>()

const router = useRouter()
const route = useRoute()

const { isDark, toggleTheme, themeColors, currentThemeColor, changeThemeColor, getThemePreviewColors } = useTheme()

const isColorDropdownOpen = ref(false)
const isMenuOpen = ref(false)
const colorDropdownRef = ref<HTMLElement | null>(null)

onClickOutside(colorDropdownRef, () => {
  if (isColorDropdownOpen.value) {
    isColorDropdownOpen.value = false
  }
})

const searchQuery = ref('')
const filteredThemeColors = computed(() => {
  if (!searchQuery.value) return themeColors.value
  const query = searchQuery.value.toLowerCase().trim().replace(/_/g, ' ')
  return themeColors.value.filter(color => 
    color.name.toLowerCase().replace(/_/g, ' ').includes(query) ||
    color.label.toLowerCase().includes(query)
  )
})

const activeColorTheme = computed(() => {
  return themeColors.value.find(c => c.name === currentThemeColor.value) || themeColors.value[0]
})

const openMenu = () => {
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.classList.add("overflow-hidden")
  } else {
    document.body.classList.remove("overflow-hidden")
  }
})

const handleColorSelect = (colorName: string) => {
  changeThemeColor(colorName)
  isColorDropdownOpen.value = false
}

/**
 * Smart navigation for anchor links.
 * If on the home page, scroll to the section smoothly.
 * If on a different route (e.g. /news), navigate to home with the hash.
 * For non-anchor links (e.g. /news), use router.push directly.
 */
const handleNavClick = (href: string, e: Event) => {
  e.preventDefault()
  closeMenu()

  if (href.startsWith('#')) {
    const hash = href
    if (route.path === '/') {
      // Already on home, just smooth scroll to the section
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Navigate to home with hash
      router.push({ path: '/', hash })
    }
  } else {
    // Direct route path (e.g. /news)
    router.push(href)
  }
}

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden")
})
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
    <nav aria-label="主导航" class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <router-link to="/" class="flex items-center gap-3 group">
        <span
          class="flex h-10 w-10 items-center justify-center rounded bg-brand text-lg font-bold text-brand-foreground transition-transform duration-300 group-hover:scale-110">
          {{ brandLogoText }}
        </span>
        <span
          class="text-lg font-semibold text-slate-950 dark:text-white group-hover:text-brand dark:group-hover:text-brand-light-text-hover transition-colors duration-200">
          {{ brandName }}
        </span>
      </router-link>
      <div class="hidden lg:flex items-center gap-5 xl:gap-8">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
          @click="handleNavClick(link.href, $event)"
          class="whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-brand-light-text-hover transition-colors duration-200">
          {{ link.label }}
        </a>
      </div>
      <div class="flex items-center gap-3">
        <!-- Color Theme Picker Dropdown (Premium aesthetics) -->
        <div class="hidden md:block relative" ref="colorDropdownRef">
          <!-- Trigger button -->
          <button @click="isColorDropdownOpen = !isColorDropdownOpen" type="button"
            class="relative z-40 flex h-10 w-10 items-center justify-center rounded border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-brand dark:hover:border-brand-light-text-hover transition-all duration-200 cursor-pointer focus:outline-none"
            aria-label="选择主题色彩"
            :aria-expanded="isColorDropdownOpen"
            aria-controls="color-dropdown-menu">
            <span class="h-4.5 w-4.5 rounded-full border border-white/20 shadow-sm transition-colors duration-300"
              :style="{ backgroundColor: activeColorTheme?.color }"></span>
          </button>

          <!-- Dropdown Menu Options -->
          <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="isColorDropdownOpen"
              id="color-dropdown-menu"
              class="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl overflow-hidden flex flex-col z-45 focus:outline-none">
              
              <!-- Search Bar inside dropdown -->
              <div class="p-2 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 bg-slate-50/50 dark:bg-slate-900/40">
                <Icon icon="lucide:search" class="h-3.5 w-3.5 text-slate-400 flex-shrink-0 ml-1" />
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="搜索主题..."
                  class="w-full bg-transparent text-xs py-1 px-0.5 text-slate-800 dark:text-slate-200 focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 font-medium border-none focus:ring-0"
                />
              </div>

              <!-- Theme List -->
              <div class="overflow-y-auto max-h-64 py-1 scrollbar-thin">
                <button v-for="color in filteredThemeColors" :key="color.name" @click="handleColorSelect(color.name)"
                  type="button"
                  class="flex items-center justify-between w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors duration-150 cursor-pointer">
                  <div class="flex items-center gap-2.5 truncate">
                    <!-- Three dots color stack representing primary, secondary, accent -->
                    <div class="flex items-center -space-x-1.5 flex-shrink-0">
                      <span class="h-3 w-3 rounded-full border border-white/20 shadow-sm"
                        :style="{ backgroundColor: getThemePreviewColors(color.name).primary }"></span>
                      <span class="h-3 w-3 rounded-full border border-white/20 shadow-sm"
                        :style="{ backgroundColor: getThemePreviewColors(color.name).secondary }"></span>
                      <span class="h-3 w-3 rounded-full border border-white/20 shadow-sm"
                        :style="{ backgroundColor: getThemePreviewColors(color.name).accent }"></span>
                    </div>
                    <span
                      class="truncate"
                      :class="{ 'font-semibold text-brand dark:text-brand-light-text': currentThemeColor === color.name }">
                      {{ color.label }}
                    </span>
                  </div>
                  <Icon v-if="currentThemeColor === color.name" icon="lucide:check"
                    class="h-3.5 w-3.5 text-brand dark:text-brand-light-text flex-shrink-0" />
                </button>
                <div v-if="filteredThemeColors.length === 0" class="px-4 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                  未找到匹配的主题 😢
                </div>
              </div>
            </div>
          </transition>
        </div>

        <button @click="toggleTheme()" type="button"
          class="flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:border-brand hover:text-brand-hover dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-light-text-hover dark:hover:text-brand-light-text transition-colors duration-200 cursor-pointer"
          aria-label="切换深浅主题">
          <Icon v-if="!isDark" icon="lucide:moon" class="h-4.5 w-4.5" />
          <Icon v-else icon="lucide:sun" class="h-4.5 w-4.5" />
        </button>
        <button type="button" @click="emit('cta-click')"
          class="hidden rounded bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-hover lg:inline-block transition-all duration-300 ease-smooth hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-brand/20 cursor-pointer">
          {{ ctaText }}
        </button>
        <button @click="openMenu" type="button"
          class="flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:border-brand hover:text-brand-hover dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-light-text-hover dark:hover:text-brand-light-text lg:hidden transition-colors duration-200 cursor-pointer"
          aria-label="打开导航菜单">
          <Icon icon="lucide:menu" class="h-5 w-5" />
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Menu Overlay -->
  <div @click="closeMenu" class="fixed inset-0 z-50 bg-slate-950/50 lg:hidden transition-opacity duration-300"
    :class="{ 'opacity-0 pointer-events-none': !isMenuOpen, 'opacity-100 pointer-events-auto': isMenuOpen }"></div>

  <!-- Mobile Menu Sidebar -->
  <aside
    class="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] border-l border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 lg:hidden transition-transform duration-300 ease-in-out"
    :class="{ 'translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }" aria-label="移动端导航菜单">
    <div class="flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded bg-brand text-lg font-bold text-brand-foreground">
          {{ brandLogoText }}
        </span>
        <span class="text-lg font-semibold text-slate-950 dark:text-white">{{ brandName }}</span>
      </router-link>
      <button @click="closeMenu" type="button"
        class="flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-slate-700 hover:border-brand hover:text-brand-hover dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-light-text-hover dark:hover:text-brand-light-text cursor-pointer"
        aria-label="关闭导航菜单">
        <Icon icon="lucide:x" class="h-5 w-5" />
      </button>
    </div>
    <div class="mt-8 space-y-3">
      <a v-for="link in navLinks" :key="link.href" :href="link.href"
        @click="handleNavClick(link.href, $event)"
        class="block rounded border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-brand hover:text-brand-hover dark:border-slate-800 dark:text-slate-200 dark:hover:border-brand-light-text-hover dark:hover:text-brand-light-text transition-colors duration-200">
        {{ link.label }}
      </a>
      <button type="button" @click="emit('cta-click'); closeMenu()"
          class="block w-full rounded bg-brand px-4 py-3 text-center text-sm font-semibold text-brand-foreground hover:bg-brand-hover transition-colors duration-200 cursor-pointer">
        {{ ctaText }}
      </button>
    </div>

    <!-- Mobile Color Theme Picker -->
    <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col h-[280px]">
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">切换主题</p>
      
      <!-- Compact mobile search bar -->
      <div class="mb-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center gap-2 border border-slate-200 dark:border-slate-800/80">
        <Icon icon="lucide:search" class="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索主题..."
          class="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 focus:outline-none border-none p-0 focus:ring-0"
        />
      </div>

      <!-- Scrollable list of themes on mobile -->
      <div class="flex-1 overflow-y-auto space-y-1.5 scrollbar-none pr-1">
        <button v-for="color in filteredThemeColors" :key="color.name" @click="changeThemeColor(color.name)"
          type="button"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors duration-150 cursor-pointer"
          :class="[
            currentThemeColor === color.name 
              ? 'bg-brand/10 text-brand dark:text-brand-light-text font-bold' 
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60'
          ]">
          <div class="flex items-center gap-2.5">
            <!-- Three dots color stack representing primary, secondary, accent -->
            <div class="flex items-center -space-x-1.5 flex-shrink-0">
              <span class="h-3 w-3 rounded-full border border-white/20 shadow-sm"
                :style="{ backgroundColor: getThemePreviewColors(color.name).primary }"></span>
              <span class="h-3 w-3 rounded-full border border-white/20 shadow-sm"
                :style="{ backgroundColor: getThemePreviewColors(color.name).secondary }"></span>
              <span class="h-3 w-3 rounded-full border border-white/20 shadow-sm"
                :style="{ backgroundColor: getThemePreviewColors(color.name).accent }"></span>
            </div>
            <span>{{ color.label }}</span>
          </div>
          <Icon v-if="currentThemeColor === color.name" icon="lucide:check" class="h-3.5 w-3.5 text-brand dark:text-brand-light-text" />
        </button>
        <div v-if="filteredThemeColors.length === 0" class="px-2 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
          未找到匹配的主题 😢
        </div>
      </div>
    </div>
  </aside>
</template>
