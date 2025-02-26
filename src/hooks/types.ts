import { EntryModel } from '../models/EntryModel'
import { VaultModel } from '../models/VaultModel'

export interface VaultHookData {
    vault: VaultModel
    fileDefinition: VaultFileDefinition
}

export type VaultFileDefinition = {
    decryptionKey: string
    filepath: string
}

export type VaultHookActions = {
    setVault: (vault: VaultModel) => void
    addEntry: (entry: EntryModel) => void
    removeEntry: (entryKey: string) => void
    setDecryptionKey: (decryptionKey: string) => void
    setFilepath: (filepath: string) => void
}

export type VaultHookResult = [VaultHookData, VaultHookActions]

export interface Settings {
    theme: 'light' | 'dark'
}

export type SettingsReducerAction = {
    type: 'TOGGLE_THEME'
}
