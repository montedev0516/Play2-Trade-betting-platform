<template>
  <div class="wrapper">
    <div class="callout">
      <div v-if="icon" class="icon">
        <component :is="icon" />
      </div>

      <div class="text">
        <slot />
      </div>
    </div>

    <button v-if="copyable" :class="['copy', `copy--variant-${variant}`, { 'copy--copied': copied }]" @click="copy">
      <div class="copy__icon">
        <IconCopied v-if="copied" />
        <IconCopy v-else />
      </div>
      <template v-if="variant === 'primary'">{{ LOCALES.BASE_CALLOUT_COPY }}</template>
    </button>

    <BaseButton v-if="action" class="action" @click="emits('action')">
      {{ action }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import BaseButton from '@/components/app/BaseButton.vue'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconCopied from '@/components/icons/IconCopied.vue'

interface Props {
  icon?: ReturnType<typeof defineComponent>
  copyable?: boolean
  variant?: 'primary' | 'secondary'
  action?: string
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  copyable: false,
  variant: 'primary',
  action: undefined,
})

const emits = defineEmits<{ action: [void], copy: [void] }>()

const LOCALES = {
  BASE_CALLOUT_COPY: 'Copy'
}

const copied = ref(false)

const copy = () => {
  copied.value = true

  emits('copy')

  setTimeout(() => {
    copied.value = false
  }, 3000);
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 4px;
}

.callout {
  display: flex;
  padding: 11px 14px;
  border-radius: 4px;
  align-items: center;
  gap: 7px;
  background-color: $bg-light-2;
}

.icon {
  display: flex;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  color: $green-dark;

  svg {
    width: 100%;
    height: 100%;
  }
}

.text {
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
}

.copy {
  display: flex;
  border-radius: 4px;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;

  &--variant {
    &-primary {
      padding: 6px 12px;
      border: 2px solid $primary;
      gap: 8px;
      color: $text-dark;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 13px;
      text-transform: uppercase;
      background: $primary;

      &:hover {
        border-color: $primary-dark;
        background-color: $primary-dark;
      }
    }

    &-secondary {
      padding: 6px;
      border: 2px solid $primary-dark;
      color: $text-white;
      background: transparent;

      &:hover {
        background-color: $primary-dark;
      }
    }
  }

  &--copied {
    border-color: $accent-1-light;
    background-color: $accent-1-light;

    &:hover {
      border-color: $accent-1-light;
      background-color: $accent-1-light;
    }
  }

  &__icon {
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>