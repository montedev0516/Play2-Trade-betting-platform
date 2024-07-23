<template>
  <div class="bets-wrapper">
    <BaseButton
      v-for="betAmount in betAmounts"
      :key="betAmount"
      size="lg"
      :variant="betAmount === selectedBetAmount ? 'filled' : 'outlined'"
      :disabled="!userStore.isLoggedIn"
      @click="selectedBetAmount = betAmount"
    >
      {{ betAmount }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { selectedBetAmount } from '@/composables/useSmartWallet'

import BaseButton from '@/components/app/BaseButton.vue'

import { useUserStore } from '@store/user'

// Stores

const userStore = useUserStore()

import { betAmounts } from '@/config'
</script>

<style lang="scss" scoped>
.bets-wrapper {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(v-bind('betAmounts.length'), 1fr);
  gap: 8px;

  @include media-breakpoint('mobile-mix') {
    gap: 5px;
  }
}
</style>
