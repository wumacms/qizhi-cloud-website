import { computed, watch } from 'vue'
import { useTheme as useLibTheme, defaultThemes } from '@zeldafox/vue-tailwind-theme-kit'

export function useTheme() {
  const libTheme = useLibTheme()

  const currentThemeColor = libTheme.theme

  // 同步主题名称到 html 元素的 data-theme 属性，便于 CSS 针对特定主题进行样式覆盖
  if (typeof window !== 'undefined') {
    watch(currentThemeColor, (newTheme) => {
      document.documentElement.setAttribute('data-theme', newTheme)
    }, { immediate: true })
  }

  const changeThemeColor = (colorName: string) => {
    libTheme.setTheme(colorName)
  }

  const toggleTheme = () => {
    libTheme.toggleDarkMode()
  }

  // 获取所有排序后的可用主题键名
  const availableThemes = computed(() => {
    return Object.keys(defaultThemes).sort((a, b) => {
      if (a === 'theme') return -1;
      if (b === 'theme') return 1;
      return a.localeCompare(b);
    })
  })

  // 映射主题对象，以保持与组件的部分向后兼容
  const themeColors = computed(() => {
    return availableThemes.value.map(key => {
      // 英文主题名美化，默认主题显示为“默认”
      const label = key === 'theme' 
        ? '默认' 
        : key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      
      const themeData = defaultThemes[key];
      const colors = libTheme.isDark.value ? themeData.dark : themeData.light;
      const primary = colors.primary || '#3b82f6';
      
      return {
        name: key,
        label,
        color: primary,
        bgClass: '' // 留空，通过 inline style 渲染颜色
      }
    })
  })

  // 获取特定主题的预览色三元组（用于下拉菜单的配色小圆点）
  const getThemePreviewColors = (themeName: string) => {
    const themeData = defaultThemes[themeName];
    if (!themeData) return { primary: 'transparent', secondary: 'transparent', accent: 'transparent' };
    const colors = libTheme.isDark.value ? themeData.dark : themeData.light;
    return {
      primary: colors.primary || 'transparent',
      secondary: colors.secondary || 'transparent',
      accent: colors.accent || 'transparent'
    }
  }

  return {
    isDark: libTheme.isDark,
    toggleTheme,
    themeColors,
    currentThemeColor,
    changeThemeColor,
    availableThemes,
    getThemePreviewColors
  }
}
