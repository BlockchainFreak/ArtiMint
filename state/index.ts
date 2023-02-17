import { atom } from "recoil"

export const confirmationState = atom({
    key: 'confirmationState',
    default: {
        open: false,
        message: '',
        onConfirm: () => { },
    }
})

export const snackBarState = atom({
    key: 'snackBarState',
    default: {
        open: false,
        message: '',
        severity: 'success'
    }
})

export const modalState = atom({
    key: 'modalState',
    default: {
        open: false,
        title: '',
    }
})