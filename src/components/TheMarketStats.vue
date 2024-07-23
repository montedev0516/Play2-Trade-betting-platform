<template>
  <div class="market__stats-wrapper">
    <div class="market__stats-left--side">
      <TheMarketIndicator pool="up" payout="190" potential="19.0" />
    </div>
    <div class="market__stats-timer">
      <TheMarketTimer :date="{ start: timerStart, end: timerEnd }" @reRender="reRenderTimer" :key="timerStart" />
    </div>
    <div class="market__stats-right--side reverse">
      <TheMarketIndicator pool="down" payout="270" potential="19.0" />
    </div>
  </div>
</template>

<script setup lang="ts">

import TheMarketIndicator from './ui/TheMarketIndicator.vue'
import TheMarketTimer from './ui/TheMarketTimer.vue'
import useGameParams from '@/composables/useGameParams';

const { timerStart, timerEnd } = useGameParams()
function reRenderTimer() { }
</script>

<style lang="scss" scoped>
.market__stats {
  &-wrapper {
    position: relative;
    display: flex;
    gap: calc(13.142vw + 1em);
    justify-content: space-between;
    width: 100%;
    margin-top: 4px;
    margin-bottom: 20px;

    @include media-breakpoint('mobile') {
      padding: 0 8px;
    }

    @include media-breakpoint('mobile-landscape') {
      margin-bottom: 0;
    }
  }

  &-left--side,
  &-right--side {
    display: flex;
    gap: 5em;
    color: $gray;

    @include media-breakpoint('mobile') {
      align-items: end;
      gap: 1.8em;
    }

    // @include media-breakpoint('mobile-landscape') {
    //   display: none;
    // }
  }

  &-right--side {
    gap: 4.3125em;

    @include media-breakpoint('mobile') {
      gap: 10px;
    }
  }

  &-timer {
    position: absolute;
    top: -1em;
    left: 50%;
    width: 13.142vw;
    height: 13.142vw;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    transform: translateX(-50%);

    @include media-breakpoint('mobile') {
      top: -13px;
      width: 23.333vw;
      height: 23.333vw;
    }

    @include media-breakpoint('mobile-landscape') {
      width: 10vw;
      height: 10vw;
    }

    @include media-breakpoint('mobile-landscape') {
      top: -1.7em;
    }
  }
}
</style>
