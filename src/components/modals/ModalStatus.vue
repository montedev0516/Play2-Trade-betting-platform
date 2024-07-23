<template>
  <BaseModal modal-type="secondary" :active-modal="true">
    <div class="status-message">
      <component :is="iconComponent" class="icon" />
      <span class="text"> {{ textMessage }} </span>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import BaseModal from '@/components/app/BaseModal.vue'
import IconError from '@/components/icons/IconError.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import IconSuccess from '@/components/icons/IconSuccess.vue'

interface Props {
  status: 'success' | 'warning' | 'error',
}
const props = withDefaults(defineProps<Props>(), {
  status: 'success',
})

const textMessage = computed(() => {
  switch (props.status) {
    case 'success': return 'SUCCESS ';
    case 'warning': return 'WARNING';
    case 'error': return 'ERROR';
    default: return '';
  }
})

const iconComponent = computed<ReturnType<typeof defineComponent> | null>(() => {
  switch (props.status) {
    case 'success': return IconSuccess;
    case 'warning': return IconWarning;
    case 'error': return IconError;
    default: return null;
  }
})
</script>

<style lang="scss" scoped>
.status-message {
  display: flex;
  align-items: center;
  padding: 40px;
}
.text {
  margin-left: 10px;
  font-size: 24px;
  font-weight: 700;
}
</style>