<template>
  <div class="header__container">
    <div class="header__left-side">
      <div class="logo">
        <IconLogoBig class="desktop-view" />
        <IconLogoSmall class="mobile-view" />
      </div>
    </div>

    <div class="header__top">
      <AuthorizedWallet v-if="smartWalletBalance" />
      <ConnectWallet v-else />
    </div>

    <div class="header__right-side">
      <div class="header__right-button">
        <div class="avatar">
          <img :src="avatar_url" />
        </div>
      </div>
      <div class="header__right-button" @click="modalStore.open({ type: 'userSettings' })">
        <IconBurger class="burger" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { smartWalletBalance } from '@/composables/useSmartWallet'

import IconLogoBig from './icons/IconLogoBig.vue'
import IconLogoSmall from './icons/IconLogoSmall.vue'
import IconBurger from './icons/IconBurger.vue'
import ConnectWallet from './ui/ConnectWallet.vue'
import AuthorizedWallet from './ui/AuthorizedWallet.vue'

import { useModalStore } from '@/store/modal'
import { useUserStore } from '@/store/user'
import { computed } from 'vue'

// Stores

const modalStore = useModalStore()

const userStore = useUserStore()
const avatar_url = computed(() => userStore.avatar_url)
</script>

<style lang="scss" scoped>
  .header {
    &__container {
      display: grid;
      grid-template-rows: 5.25em;
      grid-template-columns: 1fr auto 1fr;
      width: 100%;
      height: 5.25em;
      min-height: 50px;
      background-color: $bg-light;
      @include media-breakpoint('mobile') {
        grid-template-rows: auto;
        grid-template-columns: 1fr 3fr 1fr;
        font-size: 1.2085vw;
      }
    }
    &__top {
      position: relative;
      width: 27.125em;
      height: 5em;
      min-height: 50px;
      background-image: url('@/assets/images/header-top.svg');

      background-repeat: no-repeat;
      background-position: -0.1em -0.2em;
      background-size: 101% 101%;
      @include media-breakpoint('mobile') {
        width: 100%;
        height: 100%;
        background-position: -0.1em -0.2em;
        background-size: 101% 101%;
      }
    }
    &__left-side,
    &__right-side {
      display: flex;
      align-items: center;
      padding: 1.125em 1em;
      @include media-breakpoint('mobile') {
        padding: 1.125em 10px;
      }
    }
    &__left-side {
      .logo {
        width: 19.118em;
        height: 3.063em;
        @include media-breakpoint('mobile') {
          width: 34px;
          height: 34px;
        }
      }
      svg {
        width: 100%;
        height: 100%;
      }
    }
    &__right-side {
      justify-content: end;
    }
    &__right-button {
      &:not(:last-child) {
        margin-right: 1.9em;
        @include media-breakpoint('mobile') {
          margin-right: 8px;
        }
      }
      svg {
        width: 3em;
        min-width: 24px;
        height: 3em;
        min-height: 24px;
      }
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.75em;
        min-width: 28px;
        height: 3.75em;
        min-height: 28px;
        background-color: #7b1fa2;
        border: 3px solid $primary;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
        @include media-breakpoint('mobile') {
          border-width: 2px;
          width: 6.5em;
          height: 6.5em;
        }
      }
      .burger {
        color: $primary-dark;
        &:hover {
          color: $primary;
          cursor: pointer;
        }
        @include media-breakpoint('mobile') {
          width: 5.5em;
          height: 5.5em;
        }
      }
    }
  }
</style>
