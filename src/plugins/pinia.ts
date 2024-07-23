import { createPinia } from 'pinia'
import router from '../router'
import { Router } from 'vue-router'
import { markRaw } from 'vue'

export const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

declare module 'pinia' {
  interface PiniaCustomProperties {
    router: Router
  }
}
