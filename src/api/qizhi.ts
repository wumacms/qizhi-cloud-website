export interface NavLink {
  href: string
  label: string
}

export interface ThemeColor {
  name: string
  label: string
  bgClass: string
}

export interface PageHeaderConfig {
  brandName: string
  brandLogoText: string
  navLinks: NavLink[]
  ctaText: string
}

export interface HeroConfig {
  badge: string
  title: string
  description: string
  subDescription: string
  ctaText: string
  ctaSecondaryText: string
  imageSrc: string
  imageAlt: string
}

export interface FeatureSectionItem {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  layout: 'image-left' | 'image-right' | 'full-width'
  tags?: string[]
  bgLight?: boolean
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface FeaturesGridConfig {
  title: string
  subtitle: string
  items: FeatureItem[]
}

export interface TeamMember {
  name: string
  role: string
  description: string
  avatar: string
}

export interface TeamConfig {
  title: string
  subtitle: string
  members: TeamMember[]
}

export interface StatItem {
  value: string
  label: string
}

export interface Plan {
  name: string
  price: string
  period: string
  features: string[]
  ctaText: string
  ctaType: string
  isRecommended?: boolean
}

export interface PricingConfig {
  title: string
  subtitle: string
  plans: Plan[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqConfig {
  title: string
  faqs: FaqItem[]
}

export interface CtaConfig {
  title: string
  description: string
  ctaText: string
  ctaSecondaryText: string
}

export interface FooterConfig {
  copyright: string
}

export interface ModalMessage {
  title: string
  description: string
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  category: string
  image: string
  readTime: string
  content: string[]
}

export interface NewsConfig {
  title: string
  subtitle: string
  items: NewsItem[]
}

export interface QiZhiData {
  header: PageHeaderConfig
  hero: HeroConfig
  featureSections: FeatureSectionItem[]
  featuresGrid: FeaturesGridConfig
  team: TeamConfig
  stats: StatItem[]
  pricing: PricingConfig
  news: NewsConfig
  faq: FaqConfig
  cta: CtaConfig
  footer: FooterConfig
  modalMessages: {
    [key: string]: ModalMessage
  }
}

/**
 * 从本地 JSON 静态文件获取落地页配置数据。
 * 开发环境下模拟 500ms 网络延迟，生产环境零延迟。
 */
export async function getQiZhiData(): Promise<QiZhiData> {
  const response = await fetch('/api/page-data.json')
  if (!response.ok) {
    throw new Error('获取落地页数据失败，请稍后重试！')
  }
  const data: QiZhiData = await response.json()

  // 仅开发环境模拟网络延迟
  const delay = import.meta.env.DEV ? 500 : 0
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  return data
}

