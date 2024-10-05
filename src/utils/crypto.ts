import { invoke } from '@tauri-apps/api/core'

export async function encrypt(key: string, data: string) {
    return (await invoke('encrypt', {
        contents: data,
        key,
    })) as Uint8Array
}

export async function decrypt(key: string, data: Uint8Array) {
    return (await invoke('decrypt', {
        contents: data,
        key,
    })) as string
}
