import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ModalType = 'information' 
  | 'confirmation' 
  | 'loading' 
  | 'signIn' 
  | 'status' 
  | 'topUp' 
  | 'topUpCrypto' 
  | 'userSettings'

type ModalDataInformation = {
  text: string,
  icon: 'success' | 'warning' | 'error'
}
type ModalDataConfirmation = {
  title: string,
  text: string,
  confirmText?: string,
}
type ModalDataLoading = {}
type ModalDataSignIn = {}
type ModalDataStatus = {
  status: 'success' | 'warning' | 'error',
}
type ModalDataTopUp = {}
type ModalDataTopUpCrypro = {}
type ModalDataUserSettings = {}

type ModalData = ModalDataInformation
  | ModalDataConfirmation
  | ModalDataLoading
  | ModalDataSignIn
  | ModalDataStatus
  | ModalDataTopUp
  | ModalDataTopUpCrypro
  | ModalDataUserSettings

type ModalCreateParams = {
  data?: ModalData
  id?: string,
  type: ModalType
}

type Modal = {
  data?: ModalData
  id: string,
  type: ModalType
}

export const useModalStore = defineStore('modal', () => {
  // State
  const active = ref<Modal[]>([])

  // Geters
  const isOpen = (selector: Modal['id'] | Modal['type']) => !!active.value.find(({ id }) => id === selector)
  
  // Actions
  const open = (modal: ModalCreateParams) => {
    active.value = [
      ...active.value.filter(({ id }) => id !== (modal.id || modal.type)),
      {
        ...modal,
        id: modal.id || modal.type,
      },
    ]
  }
  const close = (selector: Modal['id'] | Modal['type']) => {
    active.value = active.value.filter(({ id }) => id !== selector)
  }

  return { active, open, close, isOpen }
})
