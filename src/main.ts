import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { revealDirective } from './directives/reveal'
import { themePlugin } from '@zeldafox/vue-tailwind-theme-kit'

const app = createApp(App)
app.use(themePlugin, {
  defaultTheme: 'theme'
})
app.use(router)
app.directive('reveal', revealDirective)
app.mount('#app')
