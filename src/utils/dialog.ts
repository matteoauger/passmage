import { open, save } from '@tauri-apps/plugin-dialog'

const FILTERS = Object.freeze({
    PMV: { name: 'Passmage Vault', extensions: ['pmv'] },
})

export const openFileDialog = (callback: (path: string) => void) => {
    return async () => {
        const path = await open({
            multiple: false,
            directory: false,
            filters: [FILTERS.PMV],
        })

        if (!path) {
            // TODO handle error
            return
        }

        callback(path)
    }
}

export const saveFileDialog = (callback: (path: string) => void) => {
    return async () => {
        const path = await save({
            defaultPath: 'Passwords.pmv',
            filters: [FILTERS.PMV],
        })

        if (!path) {
            // TODO Handle error
            return
        }

        callback(path)
    }
}
