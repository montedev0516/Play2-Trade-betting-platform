<template>
  <div :class="{ 'module-border-wrap': true, connecting: userStore.authStarted }">
    <button class="module" @click="modalStore.open({ type: 'signIn' })"><span class="text-bold">Connect Wallet</span></button>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/store/modal'
import { useUserStore } from '@/store/user';

// Stores

const userStore = useUserStore()
const modalStore = useModalStore()
</script>

<style lang="scss" scoped>
.module-border-wrap {
  position: absolute;
  top: 50%;
  left: 50%;

  padding: 2px;
  overflow: hidden;
  color: $text-dark;
  text-align: center;
  background: linear-gradient(270deg, #be872f 0%, #fce883 28%, #e6d06c 78.17%, #c79236 100%);
  border-radius: 0.5em;
  transform: translate(-50%, -60%);
  @include media-breakpoint('mobile') {
    border-radius: 4px;
  }
}

@keyframes connecting {
    100% {
      outline-offset: 10px;
    }
}
.connecting {
  outline: 2px solid #be872f;
  outline-style: dashed;
  animation: 1.5s linear 0s infinite normal forwards running connecting;
}

.module {
  padding: 0.378vw 1.375em;
  border-radius: 0.5em;
  background: linear-gradient(92.33deg, #e1ad45 0.75%, #fce883 26.96%, #ecbe55 64.53%, #f9e576 99.64%);
  font-size: inherit;
  color:black;
  @include media-breakpoint('mobile') {
    padding: 2px 6px;
    border-radius: 4px;
  }

  &:hover {
    cursor: pointer;
    background: linear-gradient(92.33deg, #f9e576 0.75%, #ecbe55 38%, #fce883 68.66%, #e1ad45 99.64%);
  }
}
.text-bold {
  white-space: nowrap;
  @include media-breakpoint('mobile') {
    font-size: 1.05rem;
    line-height: 1em;
  }
}
</style>
