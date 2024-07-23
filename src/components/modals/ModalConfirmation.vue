<template>
  <BaseModal modal-type="secondary" :active-modal="true">
    <div class="pop-up-body">
      <div class="pop-up-title">{{ title }}</div>
      <div class="pop-up-description">{{ text }}</div>
      <button class="button">{{ confirmText }}</button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '../app/BaseModal.vue'

// Types

interface Props {
  title: string,
  text: string,
  confirmText?: string,
}

// Component settings

withDefaults(defineProps<Props>(), {
  confirmText: 'CONFIRM',
})
</script>

<style scoped lang="scss">
  .button {
    display: flex;
    padding: 13px 14px;
    border: 2px solid $primary;
    border-radius: 4px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
    color: #fff;
    background: $bg-main;
    &:hover {
      color: #fff;
      background-color: $primary;
    }
  }
  .pop-up-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    font-size: 18px;
    line-height: 24px;
    color: #fff;
  }
  .pop-up-description {
    margin: 20px 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
  }
  .pop-up-title {
    max-width: 150px;
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
  }
</style>
