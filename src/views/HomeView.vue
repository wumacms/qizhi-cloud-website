<script setup lang="ts">
import { inject, type Ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import type { QiZhiData } from '../api/qizhi'

// Import extracted section components
import HeroSection from '../components/sections/HeroSection.vue'
import FeatureSection from '../components/sections/FeatureSection.vue'
import FeaturesGrid from '../components/sections/FeaturesGrid.vue'
import TeamSection from '../components/sections/TeamSection.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import NewsSection from '../components/sections/NewsSection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import CtaSection from '../components/sections/CtaSection.vue'

const pageData = inject<Ref<QiZhiData>>('pageData')!
const route = useRoute()

onMounted(() => {
  if (route.hash) {
    nextTick(() => {
      const el = document.getElementById(route.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    })
  }
})

const emit = defineEmits<{
  'trigger-action': [type: string]
}>()
</script>

<template>
  <!-- Hero component -->
  <HeroSection
    :badge="pageData.hero.badge"
    :title="pageData.hero.title"
    :description="pageData.hero.description"
    :subDescription="pageData.hero.subDescription"
    :ctaText="pageData.hero.ctaText"
    :ctaSecondaryText="pageData.hero.ctaSecondaryText"
    :imageSrc="pageData.hero.imageSrc"
    :imageAlt="pageData.hero.imageAlt"
    @cta-click="emit('trigger-action', 'signup')"
    @cta-secondary-click="emit('trigger-action', 'demo')"
  />

  <!-- Feature Sections Loop -->
  <FeatureSection
    v-for="section in pageData.featureSections"
    :key="section.title"
    :title="section.title"
    :description="section.description"
    :imageSrc="section.imageSrc"
    :imageAlt="section.imageAlt"
    :layout="section.layout"
    :tags="section.tags"
    :bgLight="section.bgLight"
  />

  <!-- Core Features Grid -->
  <FeaturesGrid
    :title="pageData.featuresGrid.title"
    :subtitle="pageData.featuresGrid.subtitle"
    :features="pageData.featuresGrid.items"
    :bgLight="true"
  />

  <!-- Team Members Section -->
  <TeamSection
    :title="pageData.team.title"
    :subtitle="pageData.team.subtitle"
    :members="pageData.team.members"
  />

  <!-- Stats Bar Section -->
  <StatsSection
    :stats="pageData.stats"
  />

  <!-- Pricing Cards Section -->
  <PricingSection
    :title="pageData.pricing.title"
    :subtitle="pageData.pricing.subtitle"
    :plans="pageData.pricing.plans"
    @select-plan="emit('trigger-action', $event)"
  />

  <!-- News Section -->
  <NewsSection
    :title="pageData.news.title"
    :subtitle="pageData.news.subtitle"
    :news="pageData.news"
  />

  <!-- FAQ Section -->
  <FaqSection
    :title="pageData.faq.title"
    :faqs="pageData.faq.faqs"
    :bgLight="true"
  />

  <!-- Footer Call to Action -->
  <CtaSection
    :title="pageData.cta.title"
    :description="pageData.cta.description"
    :ctaText="pageData.cta.ctaText"
    :ctaSecondaryText="pageData.cta.ctaSecondaryText"
    @cta-click="emit('trigger-action', 'signup')"
    @cta-secondary-click="emit('trigger-action', 'demo')"
  />
</template>
