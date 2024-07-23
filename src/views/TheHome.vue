<template>
  <div class="wrapper">
    <TheHeader />
    <div class="container">
      <div class="chart">
        <TheChart />
      </div>
      <div class="up">
        <ThePool v-model:isPoolsCollapsed="isPoolsCollapsed" side="up" />
      </div>
      <div class="down">
        <ThePool v-model:isPoolsCollapsed="isPoolsCollapsed" side="down" />
      </div>
      <div class="bets">
        <TheBets />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

import TheChart from '@/components/TheChart.vue'
import TheHeader from '@/components/TheHeader.vue'
import ThePool from '@/components/ThePool.vue'
import TheBets from '@/components/TheBets.vue'

// State

const isPoolsCollapsed = ref(false)
const getUrlParts = (arg: string) => {
  const url = new URL(arg);
  const parts = url.hostname.split(".");
  const subdomain = parts.slice(0, -2).join(".");
  const domainroot = parts.slice(-2).join(".");
  const tld = `.${parts[parts.length - 1]}`;
  const segments = url.pathname === "/" ? [] : url.pathname.split("/").slice(1);
  const params = url.searchParams.entries();

  return {
    origin: url.origin,
    protocol: url.protocol.replace(":", ""),
    domain: url.hostname,
    subdomain,
    domainroot,
    domainpath: `${url.hostname}${url.pathname.substr(
      0,
      url.pathname.lastIndexOf("/")
    )}`,
    path: url.pathname.substr(1),
    query: url.search.substr(1),
    port: url.port ? url.port : url.protocol === "http:" ? 80 : 443,
    tld,
    parts,
    segments,
    params: Array.from(params, ([key, val]) => ({ key, val })),
  };
}

onMounted(() => {
  const route = useRoute();
  const click_hash = route.query.click_hash;
  const ref_id = route.query.ref_id;
  const { domainroot } = getUrlParts(window.location.href);
  // 30 days in seconds
  const seconds = 2592000;
  if (click_hash) {
    document.cookie = `click_hash=${click_hash}; max-age=${seconds}; domain=${domainroot}; path=/`;
  }
  if (ref_id) {
    document.cookie = `ref_id=${ref_id}; max-age=${seconds}; domain=${domainroot}; path=/`;
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: var(--real-vh);
  overflow: hidden;
  background-color: $bg-main;
}

.container {
  display: grid;
  grid-template-areas:
    'up chart down '
    'up bets down';
  grid-template-rows: 1fr 5vw;
  grid-template-columns: 20.091vw 1fr 20.091vw;
  grid-auto-flow: row;
  gap: 1em;
  height: calc(var(--real-vh) - max(5.25em, 50px));
  max-height: var(--real-vh);
  overflow: hidden;

  @include media-breakpoint('mobile') {
    grid-template-areas:
      'chart chart'
      'up down'
      'bets bets';
    grid-template-rows: 1fr min-content 75px;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    column-gap: 16px;
    height: calc(var(--real-vh) - 52px);
  }

  @include media-breakpoint('mobile-landscape') {
    grid-template-rows: 1fr calc(33px + 1em);
    grid-template-columns: 19.591vw 1fr 19.591vw;
    gap: 1.5em;
    height: calc(var(--real-vh) - 5.25em);
    overflow: hidden;
  }
}

.down {
  grid-area: down;
  padding: 1em 1em 1em 0;

  @include media-breakpoint('mobile') {
    padding: 0;
    margin-right: 8px;
  }

  @include media-breakpoint('mobile-landscape') {
    padding-top: 2em;
  }
}

.up {
  grid-area: up;
  padding: 1em 0 1em 1em;

  @include media-breakpoint('mobile') {
    padding: 0;
    margin-left: 8px;
  }

  @include media-breakpoint('mobile-landscape') {
    padding-top: 2em;
  }
}

.chart {
  grid-area: chart;
  padding: 1em 0 0 0;
  overflow: hidden;

  @include media-breakpoint('mobile') {
    padding: 0;
  }

  @include media-breakpoint('mobile-landscape') {
    padding-top: 2em;
  }
}

.bets {
  grid-area: bets;
  padding: 0 0 1em 0;

  @include media-breakpoint('mobile') {
    padding: 0 0 16px 0;
    margin: 19px 8px 0 8px;
  }
}
</style>
