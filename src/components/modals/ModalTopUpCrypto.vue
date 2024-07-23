<template>
  <BaseModal modal-type="large" :active-modal="true">
    <div class="modal-top-up-crypto">
      <div class="modal-top-up-crypto__title">{{ LOCALES.MODAL_TOP_UP_CRYPTO_TITLE }}</div>
      <div class="modal-top-up-crypto__description">{{ LOCALES.MODAL_TOP_UP_CRYPTO_DESCRIPTION }}</div>
      <div class="modal-top-up-crypto__accounts">
        <img src="https://placehold.co/140" alt="qr" class="qr">
        <div class="address">
          <div class="address__title">{{ LOCALES.MODAL_TOP_UP_CRYPTO_ADDRESS__TITLE }}</div>
          <BaseCallout copyable>{{ walletAddress }}</BaseCallout>
          <div class="address__warning">{{ LOCALES.MODAL_TOP_UP_CRYPTO_ADDRESS_WARNING }}</div>
        </div>
      </div>
      <div class="modal-top-up-crypto__panel"></div>
      <TheTopUpPanel />
      <div class="modal-top-up-crypto__disclaimer">{{ LOCALES.MODAL_TOP_UP_CRYPTO_DISCLAIMER }}</div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/app/BaseModal.vue'
import BaseCallout from '@/components/app/BaseCallout.vue'
import TheTopUpPanel from '@/components/ui/TheTopUpPanel.vue'

const LOCALES = {
  MODAL_TOP_UP_CRYPTO_TITLE: 'DEPOSIT',
  MODAL_TOP_UP_CRYPTO_DESCRIPTION: 'You can scan this QR code with mobile wallet app to make a payment or send the exact amount to the deposit address.',
  MODAL_TOP_UP_CRYPTO_ADDRESS__TITLE: 'Temporary address',
  MODAL_TOP_UP_CRYPTO_ADDRESS_WARNING: 'Send only USDT via TRC20 network to this address. Sending other coins or sending USDT via other networks will result in a permanent loss of your funds.',
  MODAL_TOP_UP_CRYPTO_DISCLAIMER: 'Coins will be deposited after 3 confirmations',
}

const walletAddress = '0xc2af050Cb10814d8655062e430DBcA043E1cD858'
</script>

<style scoped lang="scss">
.modal-top-up-crypto {
  padding: 40px;

  &__title {
    margin-bottom: 40px;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    text-transform: uppercase;
  }

  &__description {
    margin-bottom: 40px;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &__accounts {
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 140px 1fr;
    gap: 20px;
  }

  &__disclaimer {
    margin-top: 12px;
    color: $gray;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
    opacity: 0.5;
  }
}

.qr {
  width: 140px;
  height: 140px;
}

.address {
  max-width: 490px;

  &__title {
    margin-bottom: 12px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 10px;
    text-transform: uppercase;
  }

  &__warning {
    margin-top: 12px;
    color: $gray;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    opacity: 0.5;
  }
}
</style>
