<template>
  <button
    :class="['button', `button--variant-${variant}`, `button--size-${size}`]"
    :disabled="disabled"
    @click="emits('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean
  size?: 'sm' | 'base' |'lg' | 'xl'
  variant?: 'outlined' | 'filled'
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'base',
  variant: 'outlined'
})

const emits = defineEmits<{ click: [void] }>()
</script>

<style scoped lang="scss">
.button {
  display: inline-flex;
  border-width: 2px;
  border-style: solid;
  justify-content: center;
  align-items: center;

  @include media-breakpoint('mobile-mix') {
    border-width: 1px;
  }

  &--variant {
    &-outlined {
      border-color: $primary-dark;
      color: $text-white;
      background: transparent;

      &:hover {
        background-color: $primary-dark;
      }
    }

    &-filled {
      border-color: $primary;
      color: $text-dark;
      background: $primary;

      &:hover {
        border-color: $primary-dark;
        background-color: $primary-dark;
      }
    }
  }

  &--size {
    &-sm {
      padding: 10px 13px;
      border-radius: 4px;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 10px;

      @include media-breakpoint('mobile-mix') {
        padding: 6px 7px;
        color: #FFF;
        font-size: 8px;
        line-height: 6px;
      }
    }

    &-base {
      padding: 12px 13px;
      border-radius: 4px;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 13px;

      @include media-breakpoint('mobile-mix') {
        padding: 9px 12px;color: #FFF;
        font-size: 12px;
        line-height: 8px;
      }
    }

    &-lg {
      // padding: 12px 14px;
      border-radius: 0.4em;
      font-size: 2em;
      font-style: normal;
      font-weight: 700;
      // line-height: 22px;

      @include media-breakpoint('mobile-mix') {
        padding: 8px 5px;
        font-size: 18px;
        line-height: 13px;
      }
    }

    &-xl {
      padding: 17px 32px;
      border-radius: 4px;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 13px;
    }
  }
}
</style>