<template>
  <BaseModal modal-type="secondary" :active-modal="true" position="top-right"
    @close-callback="modalStore.close('userSettings')">
    <template #close>
      <button class="pop-up-close" @click="modalStore.close('userSettings')">
        <IconCloseModalBig />
      </button>
    </template>

    <div class="user-settings">
      <div class="user-settings__header">
        <div class="user">
          <img :src="avatar_url" alt="User Avatar" class="user__avatar">
          <div>
            <div class="user__title text-regular">
              <template v-if="userStore.signerWalletAddress">({{ userStore.signerWalletAddressShort }})</template>
              <template v-else>Guest</template>
            </div>
            <div class="user__upload" @click="upload_ref?.click()">
              <input ref="upload_ref" type="file" hidden @change="doUpload" />
              <BaseButton v-if="userStore.isLoggedIn" size="sm">
                UPLOAD
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <div class="user-settings__body">
        <div class="settings">
          <div class="settings__setting">
            <BaseSwitcher v-model="isSoundEffects" label="Sound Effects" />
          </div>
          <div class="settings__setting">
            <BaseSwitcher v-model="isVoiceOver" label="Voiceover" />
          </div>
          <div class="settings__setting">
            <BaseSwitcher v-model="isBackgroundMusic" label="Background Music" />
          </div>
        </div>

        <div class="language">
          <BaseDropdown v-model="language" name="language" label="Language" :options="languageOptions" rounded-icons />
        </div>
      </div>

      <div v-if="userStore.isLoggedIn" class="user-settings__footer">
        <button class="logout" @click="handleLogout">
          <div class="logout__icon">
            <IconLogout />
          </div>
          <div class="logout__text" @click="">
            Disconnect Wallet
          </div>
        </button>
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { web3AuthLogout } from '@/composables/useWeb3Auth'

import BaseModal from "@/components/app/BaseModal.vue";
import BaseButton from "@/components/app/BaseButton.vue";
import BaseSwitcher from "@/components/app/BaseSwitcher.vue";
import BaseDropdown from "@/components/app/BaseDropdown.vue";
import IconCloseModalBig from '@/components/icons/IconCloseModalBig.vue'
import IconCountryGer from '@/components/icons/IconCountryGer.vue'
import IconCountryEng from '@/components/icons/IconCountryEng.vue'
import IconCountryFra from '@/components/icons/IconCountryFra.vue'
import IconCountryRu from '@/components/icons/IconCountryRu.vue'
import IconCountrySpa from '@/components/icons/IconCountrySpa.vue'
import IconLogout from '@/components/icons/IconLogout.vue'
import axios from "axios";
import { useUserStore } from '@store/user'
import { useModalStore } from '@/store/modal'
import { getCookie } from '@/utils/cookie';
import { appiUrl } from '@/config';

// Types

type Language = 'English' | 'German' | 'French' | 'Russian' | 'Spanish'

// Stores

const userStore = useUserStore()
const modalStore = useModalStore()
const avatar_url = computed(() => userStore.avatar_url)
const upload_ref = ref<HTMLInputElement | null>(null)
const doUpload = () => {
  const file = upload_ref.value?.files?.[0]
  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    axios.post(`${appiUrl}/upload-avatar`, formData, {
      headers: {
        'Authorization': `Bearer ${getCookie("token")}`
      },
    }).then(() => {
      userStore.getProfile()
    }).catch(e => console.error(e))
  }
}
// Constants

const languageOptions = [
  {
    id: 'English',
    label: 'English',
    iconName: IconCountryEng,
  },
  {
    id: 'German',
    label: 'German',
    iconName: IconCountryGer,
  },
  {
    id: 'French',
    label: 'French',
    iconName: IconCountryFra,
  },
  {
    id: 'Russian',
    label: 'Russian',
    iconName: IconCountryRu,
  },
  {
    id: 'Spanish',
    label: 'Spanish',
    iconName: IconCountrySpa,
  },
]

// State

const isSoundEffects = ref(false);
const isVoiceOver = ref(false);
const isBackgroundMusic = ref(false);
const language = ref<Language>('French');

// Functions

const handleLogout = async () => {
  await web3AuthLogout()
  modalStore.close('userSettings')
}
</script>

<style lang="scss">
.pop-up-close {
  height: 48px;
  width: 48px;
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  color: $primary-dark;
  background: none;

  @include media-breakpoint('mobile-mix') {
    height: 24px;
    width: 24px;
    top: 8px;
    right: 8px;
  }

  &:hover {
    color: $primary;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

.user-settings {
  padding: 34px 20px;

  @include media-breakpoint('mobile-mix') {
    padding: 30px 20px;
  }

  &__header {
    padding-bottom: 40px;
    border-bottom: 1px solid #707070;

    @include media-breakpoint('mobile-mix') {
      padding-bottom: 20px;
    }
  }

  &__body {
    padding-top: 40px;

    @include media-breakpoint('mobile-mix') {
      padding-top: 20px;
    }
  }

  &__footer {
    padding-top: 30px;
    border-top: 1px solid #707070;
    margin-top: 40px;

    @include media-breakpoint('mobile-mix') {
      margin-top: 20px;
    }
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 20px;

  @include media-breakpoint('mobile-mix') {
    gap: 16px;
  }

  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;

    @include media-breakpoint('mobile-mix') {
      width: 60px;
      height: 60px;
    }
  }

  &__title {
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    @include media-breakpoint('mobile-mix') {
      font-size: 12px;
      line-height: 9px;
    }
  }

  &__upload {
    margin-top: 16px;

    @include media-breakpoint('mobile-mix') {
      margin-top: 12px;
    }
  }
}

.settings {
  &__setting {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
}

.language {
  padding-top: 30px;
}

.logout {
  display: flex;
  border: none;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  outline: none;

  &__icon {
    width: 18px;
    height: 18px;
    color: $text-gold;

    @include media-breakpoint('mobile-mix') {
      width: 14px;
      height: 14px;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    color: #999999;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;

    @include media-breakpoint('mobile-mix') {
      font-size: 12px;
      line-height: 9px;
    }
  }
}
</style>