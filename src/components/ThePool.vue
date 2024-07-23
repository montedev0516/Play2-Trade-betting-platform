<template>
  <div class="pool__wrapper">
    <div class="pool__header" :class="sideColor">
      <div class="pool__header-title text-semi-bold" :class="[sideColor, { 'justify-end': side == 'down' }]">
        {{ side }} Pool <IconArrowPool :class="{ rotate: side == 'down' }" />
      </div>
      <div class="pool__header-informations" :class="{ reverse: side == 'down' }">
        <div v-if="side === 'up'" class="pool__toggler" @click="togglePools">
          <IconExpand v-if="isPoolsCollapsed" />
          <IconCollapse v-else />
        </div>
        <div class="pool__header-informations--balance text-number-large" :class="sideColor">
          <IconCoinDollar />490.0
        </div>
        <div class="pool__header-informations--players">
          <div class="pool__header-players--title text-tiny">Players</div>
          <div class="pool__header-players--count text-large" :class="sideColor">11</div>
        </div>
      </div>
    </div>
    <div :class="['pool__body', sideColor, {'pool__body--collapsed': isPoolsCollapsed }]">
      <div class="pool__table">
        <div class="pool__body-grid" :class="{ 'row-reverse': side == 'down' }">
          <ThePoolPlayer
            v-for="player in 17"
            :key="player"
            :side="side"
            :side-color="sideColor"
            :hash-to-color-dark="hashToColorDark"
          />
        </div>
      </div>
    </div>
    <div class="pool__footer">
      <button
        class="pool__button"
        :class="['pool__button', sideColor]"
        :disabled="!userStore.isLoggedIn"
        @click="smartWalletMakeTrade(side === 'up')"
      >
        <IconArrowUpBet v-if="side === 'up'" />
        <IconArrowDownBet v-else />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { smartWalletMakeTrade }  from '@/composables/useSmartWallet'

import IconArrowPool from './icons/IconArrowPool.vue'
import IconCoinDollar from './icons/IconCoinDollar.vue'
import IconArrowUpBet from './icons/IconArrowUpBet.vue'
import IconArrowDownBet from './icons/IconArrowDownBet.vue'
import IconExpand from './icons/IconExpand.vue'
import IconCollapse from './icons/IconCollapse.vue'
import ThePoolPlayer from './ui/ThePoolPlayer.vue'

import { useUserStore } from '@store/user'

// Stores

const userStore = useUserStore()

interface Props {
  side: 'up' | 'down',
}

const props = defineProps<Props>()

const isPoolsCollapsed = defineModel<boolean>('isPoolsCollapsed', { default: false });

const sideColor = computed(() => (props.side == 'up' ? 'up-color' : 'down-color'))
const hashToColorDark = computed(() => (props.side == 'up' ? '#05965a' : '#cc2727'))

const togglePools = () => {
  isPoolsCollapsed.value = !isPoolsCollapsed.value
}
</script>

<style lang="scss" scoped>
  @mixin boxShadow($color, $alpha: 1) {
    box-shadow: 0px 18px 0px 0px rgba($color, $alpha);
    @include media-breakpoint('mobile') {
      box-shadow: 0px 6px 0px 0px rgba($color, $alpha);
    }
  }
  .pool {
    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: calc(100% - 18px);
      position: relative;
      @include media-breakpoint('mobile') {
        height: 100%;
      }
      @include media-breakpoint('mobile-landscape') {
        height: calc(100% - 6px);
      }
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: 13px;
      padding: 6px 1em;
      border: 0.2em solid transparent;
      border-bottom: 0;
      border-radius: 1em 1em 0 0;
      @include media-breakpoint('mobile') {
        padding: 6px 0;
        border: none;
        border-radius: 0;
      }
      @include media-breakpoint('mobile-landscape') {
        gap: 7px;
        border-width: 3px;
        border-radius: 16px 16px 0 0;
      }
      &.up-color {
        border-color: $green-dark;
      }
      &.down-color {
        border-color: $red-dark;
      }

      &-title {
        display: flex;
        align-items: center;
        text-transform: uppercase;
        @include media-breakpoint('mobile') {
          display: none;
        }
        svg {
          width: 1.36vw;
          height: auto;
          @include media-breakpoint('mobile') {
            width: 18px;
            height: 18px;
          }
          margin-left: 0.5em;
        }
        &.up-color svg {
          color: $green-dark;
        }
        &.down-color svg {
          color: $red-dark;
        }
      }

      &-informations {
        display: flex;
        width: 100%;
        justify-content: space-between;

        &.reverse {
          flex-direction: row-reverse;
          @include media-breakpoint('mobile') {

            flex-direction: row;
            margin-right: 0;
            margin-left: auto;
            justify-content: end;
          }
          .pool__header-players--count {
            text-align: start;
          }
        }
        @include media-breakpoint('mobile-landscape') {
          align-items: center;
        }
        @include media-breakpoint('mobile') {
          flex-direction: row-reverse;
          gap: 10px;
          margin-right: auto;
        }
        &--balance {
          line-height: 0.6;
          @include media-breakpoint('mobile-landscape') {
            font-size: 18px;
            line-height: 21px;
          }
          @include media-breakpoint('mobile') {
            font-size: 1.3em; // 18px
            line-height: 1.167; // 21px
          }
          svg {
            width: 1.511vw;
            height: auto;
            @include media-breakpoint('mobile') {
              width: 10px;
              height: 10px;
            }
            margin-right: 4px;
          }
          &.up-color svg {
            color: $green-dark;
          }
          &.down-color svg {
            color: $red-dark;
          }
        }
        &--players {
          display: flex;
          flex-direction: column;
          @include media-breakpoint('mobile-mix') {
            flex-direction: row-reverse;
            gap: 4px;
            align-items: baseline;
          }
          line-height: 0.8;

          .pool__header-players--title {
            color: v-bind(hashToColorDark);
            text-transform: uppercase;
          }
          .pool__header-players--count {
            font-size: 1.35em;
            text-align: end;
          }
        }
      }
    }

    &__body {
      flex-grow: 2;
      padding: 2px 3px 2px 0;
      overflow: hidden;
      border: 0.2em solid transparent;
      border-radius: 0 0 1rem 1rem;
      @include media-breakpoint('mobile') {
        max-height: 11.8vw;
        border: none;
        border-radius: 0;
        
        &--collapsed {
          max-height: 0;
          padding: 0;
        }
      }
      @include media-breakpoint('mobile-landscape') {
        border-width: 3px;
      }
      &.up-color {
        border-color: $green-dark;
      }
      &.down-color {
        border-color: $red-dark;
      }

      &-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem 0;
        width: 100%;
        padding: 1em 3px;
        @include media-breakpoint('mobile') {
          gap: 6px;
          padding: unset;
          &.row-reverse {
            flex-direction: row-reverse;
          }
        }
        @include media-breakpoint('mobile-landscape') {
          gap: 8px 0.5%;
          padding: 8px 5%;
        }
      }
    }
    &__table {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 2px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.4);
        border-radius: 4px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.7);
      }
      @include media-breakpoint('mobile-mix') {
        &::-webkit-scrollbar {
          width: 0;
        }
      }
    }

    &__footer {
      margin-top: 20px;
    }
    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 6.042vw;
      border-radius: 16px;
      svg {
        width: 3.776vw;
        height: 2.568vw;
      }
      @include media-breakpoint('mobile') {
        height: 60px;
      }
      @include media-breakpoint('mobile-mix') {
        border-radius: 8px;
        svg {
          width: 40px;
          height: 40px;
        }
      }
      &:hover {
        cursor: pointer;
      }

      &.up-color {
        background-color: $green;
        border: 2px solid $green-light;
        @include boxShadow($green-dark);
        &:hover {
          background-color: $green-light;
          @include boxShadow($green-dark, 0.7);
        }
      }
      &.down-color {
        background-color: $red;
        border: 2px solid $red-light;
        @include boxShadow($red-dark);
        &:hover {
          background-color: $red-light;
          @include boxShadow($red-dark, 0.7);
        }
      }
    }
    &__toggler {
      display: none;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.50);
      margin-left: auto;
      justify-content: center;
      align-items: center;
      transform: translate3d(16px, 2px, 0);
      cursor: pointer;
      @include media-breakpoint('mobile') {
        display: flex;
      }
    }
  }
</style>
