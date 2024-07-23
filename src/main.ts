import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './plugins/pinia'
import * as Sentry from "@sentry/vue";

import { clickOutside } from './directives/clickOutside.js'

import { sentryDsn } from '@/config'
import { getViewport } from './utils/getViewport.js';

const app = createApp(App).use(router).use(pinia)
app.use(router).use(pinia).directive('click-outside', clickOutside)

Sentry.init({
  dsn: sentryDsn,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});

app.mount('#app')
getViewport()