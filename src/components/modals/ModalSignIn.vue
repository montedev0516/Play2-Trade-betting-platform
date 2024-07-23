<template>
  <BaseModal modal-type="secondary" :active-modal="true" @close-callback="modalStore.close('signIn')">
    <div class="pop-up-body">
      <h3 class="pop-up-title">Connect with</h3>
      <div class="pop-up-sign-in-social">
        <button class="button sign-in--wallet" @click="handleLogin('google')"><IconGoogle />Google</button>
        <button class="button sign-in--wallet" @click="handleLogin('facebook')"><IconFacebook />Facebook</button>
        <div class="pop-up-sign-in--description"><span>Self-custodial login by</span><IconWeb3Auth /></div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { web3AuthLogin, type SocialProvider } from '@/composables/useWeb3Auth'

import BaseModal from '@/components/app/BaseModal.vue'
import IconWeb3Auth from '@/components/icons/IconWeb3Auth.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'

import { useModalStore } from '@/store/modal'

// Stores

const modalStore = useModalStore()

// Functions

const handleLogin = async (socialProvider: SocialProvider) => {
  modalStore.open({ id: 'web3AuthSignInLoading', type: 'loading' })

  modalStore.close('signIn')

  await web3AuthLogin(socialProvider)

  modalStore.close('web3AuthSignInLoading')
};
</script>

<style scoped lang="scss">
.pop-up-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 70px;
}
.pop-up-sign-in {
  &--description {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    padding-top: 20px;
    font-size: 14px;
    line-height: 16px;
    span {
      opacity: 0.4;
    }
  }
}
.pop-up-sign-in-social {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 4px;
}
.pop-up-title {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  text-transform: uppercase;
}
.sign-in {
  &--wallet {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    color: #fff;
    border: 2px solid $primary;
    border-radius: 4px;
    background: $bg-main;
    svg {
      margin-right: 8px;
    }
    &:hover {
      color: #fff;
      background-color: $primary;
    }
  }
}
</style>