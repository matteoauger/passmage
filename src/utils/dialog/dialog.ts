import { open, save } from '@tauri-apps/plugin-dialog'
import { FileType } from './types'

export const createOpenFileDialog = (
    callback: (path: string) => void,
    type: FileType,
) => {
    return async () => {
        const path = await open(type.options)

        if (!path) {
            return
        }

        callback(path)
    }
}

export const createSaveFileDialog = (
    callback: (path: string) => void,
    type: FileType,
) => {
    return async () => {
        const path = await save(type.options)

        if (!path) {
            return
        }

        callback(path)
    }
}
