import { defineStore } from 'pinia';

export const useModalState = defineStore('useModalState', {
  state:() => ({
    modalStateValue:false,
  }),
  actions:{
    changeModalState(state: boolean){
      this.modalStateValue = state
    }
  }
})