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

export const loadingState = atom({
    key: 'modalState',
    default: {
        open: false,
        title: '',
    }
})

export type Collection = {
    owner: string,
    name: string,
    description: string,
    image: string,
}

export const collectionState = atom<Collection[]>({
    key: 'listingsState',
    default: [] as Collection[]
})