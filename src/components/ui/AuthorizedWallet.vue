<template>
  <div class="header__auth-wrapper">
    <div :class='{ "header__auth-left-side": true, "loading": loading }' @click="getSmartWalletBalance">
      <IconRefresh />
    </div>
    <div class="header__auth-center">
      <div class="header__auth-balance">
        <div class="header__auth-balance-title text-small">Balance</div>
        <div class="header__auth-balance-value text-number-large">
          <IconCoinDollar />
          {{ smartWalletBalance }}
        </div>
      </div>
    </div>
    <div class="header__auth-right-side">
      <IconWallet />
    </div>
  </div>
</template>

<script setup lang="ts">
import { smartWalletBalance, smartWalletGetBalance } from '@/composables/useSmartWallet'

import IconWallet from '../icons/IconWallet.vue'
import IconRefresh from '../icons/IconRefresh.vue'
import IconCoinDollar from '../icons/IconCoinDollar.vue'
import { ref } from 'vue';

const loading = ref<boolean>(false)
const getSmartWalletBalance = async () => {
  if (loading.value) return
  loading.value = true
  await smartWalletGetBalance()
  loading.value = false
}
</script>

<style lang="scss" scoped>
.header {
  &__auth-balance {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $gray;
  }

  &__auth-balance-title {
    text-transform: uppercase;
  }

  &__auth-balance-value {
    line-height: 0.7;
    color: $text-gold;
  }

  &__auth-center {
    svg {
      width: 1.813vw;
      height: 1.813vw;

      @include media-screen-mobile {
        width: 3.333vw;
        min-width: 12px;
        height: 3.333vw;
        min-height: 12px;
      }
    }
  }

  @keyframes loading {
    100% {
      rotate: 360deg;
    }
  }

  &__auth-left-side.loading {
    animation: 1.5s linear 0s infinite normal forwards running loading;
  }

  &__auth-left-side,
  &__auth-right-side {
    color: $primary-dark;
    cursor: pointer;

    &:hover {
      color: $primary;
    }

    svg {
      width: 1.813vw;
      height: 1.813vw;

      @include media-screen-mobile {
        width: 3.333vw;
        min-width: 12px;
        height: 3.333vw;
        min-height: 12px;
      }
    }
  }

  &__auth-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 6.344vw;

    @include media-screen-mobile {
      padding: 6px 12.778vw;
    }
  }
}

.text-number-large {
  @include media-screen-mobile {
    font-size: 5vw;
    line-height: 1;
  }
}
</style>
