<template>
  <div class="market__stats-potential" :class="{ 'items-end': pool == 'down' }">
    <span class="market__stats-potential--title text-small">payout</span>
    <span class="market__stats-potential--value text-number-regular"
      ><span class="coin-icon">
        <IconCoinDollar />
      </span>{{ potential }}</span
    >
  </div>
  <div class="market__stats-payout">
    <span class="market__stats-payout--title text-small">{{ pool }} POOL</span>
    <span class="market__stats-payout--percentage text-number-large" :class="`${pool}-color`"
      >{{ payout }}<span>%</span></span
    >
  </div>
</template>

<script setup lang="ts">
  import IconCoinDollar from '../icons/IconCoinDollar.vue'

  interface Props {
    pool: 'up' | 'down'
    payout?: number | string
    potential?: number | string
  }
  withDefaults(defineProps<Props>(), {
    payout: '',
    potential: ''
  })
</script>

<style lang="scss" scoped>
  .market__stats {
    &-potential,
    &-payout {
      display: flex;
      flex-direction: column;
    }
    &-payout--title,
    &-potential--title {
      font-size: 0.8em;
      line-height: 0.8em;
      font-weight: normal;
      text-transform: uppercase;
      @include media-breakpoint('mobile') {
        font-size: 0.6em;
        line-height: 1.8em;
      }
    }
    &-potential--title {
      @include media-breakpoint('mobile-mix') {
        width: min-content;
      }
    }
    &-potential--value {
      color: $primary;
      line-height: 1.0em;
      font-size: 2.2em;
      @include media-breakpoint('mobile') {
        line-height: 0;
        font-size: 1.25em;
      }
    }
    &-payout--percentage {
      display: flex;
      align-items: flex-start;
      font-size: 3.5em;
      @include media-breakpoint('mobile') {
          font-size: 2.5em;
      }
      line-height: 0.8;
      span {
        font-size: 0.572em;
        font-weight: 600;
        line-height: 1.311;
      }
    }
    &-potential.items-end &-potential--title {
      text-align: right;
    }
  }
  .coin-icon {
    width: 1.36vw;
    height: 1.36vw;
    @include media-breakpoint('mobile') {
      width: 12px;
      height: 12px;
    }
    & > svg {
      width: 1.36vw;
      height: 1.36vw;
      @include media-breakpoint('mobile') {
        width: 14px;
        height: 14px;
      }
    }
  }
</style>
