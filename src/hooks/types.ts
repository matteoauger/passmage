import { EntryModel } from '../models/EntryModel'
import { VaultModel } from '../models/VaultModel'

export type VaultHookData = [
    {
        vault: VaultModel
        key: string
        filepath: string
    },
    {
        addEntry: (entry: EntryModel) => void
        removeEntry: (entryKey: string) => void
        createVault: () => Promise<void>
        openVault: () => Promise<void>
        saveVault: () => Promise<void>
        setKey: (key: string) => void
        setFilepath: (path: string) => void
    },
]
