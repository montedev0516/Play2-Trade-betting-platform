<template>
  <BaseModal modal-type="large" :active-modal="true">
    <div class="modal-top-up">
      <div class="modal-top-up__header">
        <div class="wallet">
          <div class="wallet__title-wrapper">
            <div class="wallet__title">{{ LOCALES.MODAL_TOP_UP_WALLET_TITLE }}</div>
            <div class="wallet__chain-icon"><IconChain /></div>
            <div class="wallet__chain">{{ LOCALES.MODAL_TOP_UP_WALLET_TITLE_POLYGON }}</div>
          </div>

          <BaseCallout :icon="IconCoinTether" secondary copyable>{{ walletAddress }}</BaseCallout>

          <div class="wallet__warning">{{ LOCALES.MODAL_TOP_UP_WALLET_WARNING }}</div>
        </div>

        <div class="balance">
          <div class="balance__title">{{ LOCALES.MODAL_TOP_UP_BALANCE_TITLE }}</div>

          <BaseCallout :icon="IconCoinDollar" secondary :action="LOCALES.MODAL_TOP_UP_BALANCE_SUBMIT">{{ balance }}</BaseCallout>
        </div>
      </div>

      <div class="top-up-types">
        <div class="top-up-types__title">{{ LOCALES.MODAL_TOP_UP_TYPES_TITLE }}</div>
        <div v-for="{ id, label, icons } in topUpTypes" :key="`top-up-type-${id}`" :class="['top-up-type', { 'top-up-type--selected': id === selectedTopUpTypeId}]" @click="selectedTopUpTypeId = id">
          <BaseRadioButton :id="id" :label="label" :model-value="id === selectedTopUpTypeId" />
          <div class="top-up-type__icons">
            <div v-for="(icon, iconIndex) in icons" :key="`top-up-type-${id}-${iconIndex}`" class="top-up-type__icon">
              <component :is="icon" />
            </div>
          </div>
        </div>
      </div>

      <div class="modal-top-up__submit">
        <BaseButton variant="filled" size="xl">{{ LOCALES.MODAL_TOP_UP_TYPES_SUBMIT }}</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/app/BaseModal.vue'
import BaseCallout from '@/components/app/BaseCallout.vue'
import BaseRadioButton from '@/components/app/BaseRadioButton.vue'
import BaseButton from '@/components/app/BaseButton.vue'
import IconChain from '@/components/icons/IconChain.vue'
import IconCoinTether from '@/components/icons/IconCoinTether.vue'
import IconCoinDollar from '@/components/icons/IconCoinDollar.vue'
import IconBitcoin from '@/components/icons/IconBitcoin.vue'
import IconTether from '@/components/icons/IconTether.vue'
import IconVisa from '@/components/icons/IconVisa.vue'
import IconMastercard from '@/components/icons/IconMastercard.vue'

const LOCALES = {
  MODAL_TOP_UP_WALLET_TITLE: 'MY USDT WALLET ON',
  MODAL_TOP_UP_WALLET_TITLE_POLYGON: 'POLYGON',
  MODAL_TOP_UP_WALLET_WARNING: 'SEND USDT ONLY VIA THE POLYGON POS NETWORK TO THIS ADDRESS',
  MODAL_TOP_UP_BALANCE_TITLE: 'BALANCE',
  MODAL_TOP_UP_BALANCE_SUBMIT: 'TRANSFER',
  MODAL_TOP_UP_TYPES_TITLE: 'DEPOSIT WITH OTHER CRYPTO ',
  MODAL_TOP_UP_TYPES_BITCOIN: 'BITCOIN',
  MODAL_TOP_UP_TYPES_USDT: 'USDT (TRC20)',
  MODAL_TOP_UP_TYPES_CC: 'VISA, Mastercard',
  MODAL_TOP_UP_TYPES_SUBMIT: 'NEXT',
}

enum TopUpTypeId {
  BITCOIN = 'bitcoin',
  USDT = 'usdt',
  CREDIT_CARD = 'credit-card',
}

const topUpTypes = [
  {
    id: TopUpTypeId.BITCOIN,
    label: LOCALES.MODAL_TOP_UP_TYPES_BITCOIN,
    icons: [IconBitcoin],
  },
  {
    id: TopUpTypeId.USDT,
    label: LOCALES.MODAL_TOP_UP_TYPES_USDT,
    icons: [IconTether],
  },
  {
    id: TopUpTypeId.CREDIT_CARD,
    label: LOCALES.MODAL_TOP_UP_TYPES_CC,
    icons: [IconVisa, IconMastercard],
  },
]
const walletAddress = '0xc2af050Cb10814d8655062e430DBcA043E1cD858'
const balance = '7658.23'

const selectedTopUpTypeId = ref<TopUpTypeId>(topUpTypes[0].id)
</script>

<style scoped lang="scss">
.modal-top-up {
  padding: 40px;

  &__header {
    display: flex;
    margin-bottom: 40px;
    gap: 24px;
  }

  &__wallet {
    flex-grow: 1;
  }

  &__submit {
    text-align: right;
  }
}

.wallet {
  flex-grow: 1;

  &__title-wrapper {
    display: flex;
    margin-bottom: 12px;
    align-items: center;
  }

  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px;
  }

  &__chain-icon {
    display: flex;
    width: 12px;
    height: 12px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__chain {
    margin-left: 4px;
    color: #84328F;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px;
  }

  &__warning {
    margin-top: 12px;
    color: $red-light;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 11px;
  }
}

.balance {
  flex-shrink: 0;

  &__title {
    margin-bottom: 12px;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px;
  }
}

.top-up-types {
  &__title {
    margin-bottom: 20px;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 17px;
  }
}

.top-up-type {
  display: flex;
  padding: 10px 10px 10px 20px;
  border: 2px solid transparent;
  border-radius: 4px;
  margin-bottom: 10px;
  align-items: center;
  background-color: $bg-main;
  opacity: 0.4;
  cursor: pointer;

  &--selected {
    border: 2px solid var(--Green-Main, #00F28E);
    opacity: 1;
  }

  &__icons {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  &__icon {
    margin-left: 25px;
  }
}
</style>
