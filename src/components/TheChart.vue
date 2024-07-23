<template>
  <div class="market__tools">
    <TheMarketStats />
    <div class="area__chart">
      <div style="width: 100%; height:100%; background-color: red; display: flex; justify-content: start; align-items: start;">
        <div id="trade-game-chart" style="width: 100%;height: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TheMarketStats from './TheMarketStats.vue'
  import { Chart } from '@/Chart/main'
  import { onMounted } from 'vue'


  onMounted(async () => {
    Chart('#trade-game-chart')
  });
</script>

<style lang="scss">
#trade-game-chart canvas {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
  .market__tools {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    @include media-breakpoint('mobile') {
      padding-top: 10px;
    }
  }
  .area__chart {
    width: 100%;
    height: 100%;
    display: block;
    border: 2px solid $primary;
    border-radius: 16px;
    @include media-breakpoint('mobile') {
      border: none;
      border-radius: 0;
    }
    overflow: hidden;
  }

  #trade-game-chart {
    width: 100%;
    height: 100%;
  }
</style>
