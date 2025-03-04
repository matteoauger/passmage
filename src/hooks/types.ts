import { EntryModel } from '../models/EntryModel'
import { Settings } from '../models/Settings'
import { VaultModel } from '../models/VaultModel'

export type VaultFileDefinition = {
    decryptionKey: string
    filepath: string
}

export type VaultReducerAction =
    | { type: 'SET_VAULT'; payload: { vault: VaultModel } }
    | { type: 'ENTRY_ADD'; payload: { entry: EntryModel } }
    | { type: 'ENTRY_DELETE'; payload: { entryKey: string } }
    | { type: 'SET_DECRYPTION_KEY'; payload: { decryptionKey: string } }
    | { type: 'SET_FILEPATH'; payload: { filepath: string } }
    | { type: 'IMPORT_VAULT'; payload: VaultModel }

export type SettingsReducerAction =
    | { type: 'TOGGLE_THEME' }
    | { type: 'SET_SETTINGS'; payload: Settings }
