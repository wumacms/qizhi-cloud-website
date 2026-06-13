import type { Directive } from 'vue'

export interface RevealOptions {
  delay?: number
  duration?: number
  distance?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  animation?: 'fade' | 'zoom'
}

interface RevealConfig {
  animation: string
  delay: number
  duration: number
}

/**
 * 使用 WeakMap 存储每个元素的动画配置，避免在 DOM 元素上挂载 _observer 等自定义属性。
 * 共享单个 IntersectionObserver 实例，避免每个 v-reveal 元素创建独立 Observer。
 */
const configMap = new WeakMap<Element, RevealConfig>()

function handleIntersection(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue

    const el = entry.target as HTMLElement
    const config = configMap.get(el)
    if (!config) continue

    // 触发动画
    el.style.opacity = '1'
    el.style.transform = config.animation === 'zoom' ? 'scale(1)' : 'translate(0, 0)'

    // 动画结束后清理，避免布局问题并允许 hover 动画正常工作
    setTimeout(() => {
      el.style.willChange = ''
      el.style.transform = ''
      el.style.transition = ''
    }, config.duration + config.delay)

    sharedObserver.unobserve(el)
    configMap.delete(el)
  }
}

const sharedObserver = new IntersectionObserver(handleIntersection, {
  threshold: 0.05,
  rootMargin: '0px 0px -40px 0px',
})

export const revealDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    const options: RevealOptions = binding.value || {}
    const animation = options.animation || 'fade'
    const delay = options.delay || 0
    const duration = options.duration || 650
    const distance = options.distance || '40px'
    const direction = options.direction || 'up'

    // 初始状态
    el.style.opacity = '0'

    let transformFrom = ''
    if (animation === 'zoom') {
      transformFrom = 'scale(0.92)'
    } else {
      if (direction === 'up') transformFrom = `translateY(${distance})`
      else if (direction === 'down') transformFrom = `translateY(-${distance})`
      else if (direction === 'left') transformFrom = `translateX(${distance})`
      else if (direction === 'right') transformFrom = `translateX(-${distance})`
    }

    el.style.transform = transformFrom
    el.style.willChange = 'opacity, transform'
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`

    configMap.set(el, { animation, delay, duration })
    sharedObserver.observe(el)
  },
  unmounted(el: HTMLElement) {
    sharedObserver.unobserve(el)
    configMap.delete(el)
  },
}
