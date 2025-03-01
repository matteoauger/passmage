import { createContext, useContext, useReducer } from 'react'
import { VaultFileDefinition, VaultReducerAction } from './types'
import { VaultModel } from '../models/VaultModel'

interface VaultHookData {
    vault: VaultModel
    fileDefinition: VaultFileDefinition
}
type VaultHookType = [VaultHookData, (action: VaultReducerAction) => void]

const reducer = (
    prevState: VaultHookData,
    { type, payload }: VaultReducerAction,
): VaultHookData => {
    let state = { ...prevState }

    switch (type) {
        case 'SET_VAULT':
            state.vault = { ...payload.vault }
            break

        case 'ENTRY_ADD':
            const { entry } = payload
            const item = { [entry.key]: entry.value }
            state.vault = { ...state.vault, ...item }
            break

        case 'ENTRY_DELETE':
            const {
                vault: { [payload.entryKey]: _, ...rest },
            } = state
            state.vault = rest
            break

        case 'SET_DECRYPTION_KEY':
            state.fileDefinition.decryptionKey = payload.decryptionKey
            break

        case 'SET_FILEPATH':
            state.fileDefinition.filepath = payload.filepath
            break

        case 'IMPORT_VAULT':
            state.vault = { ...state.vault, ...payload }
            break

        default:
            throw new Error(`Action ${type} not supported`)
    }

    return state
}

const DefaultVault: VaultHookData = {
    vault: {},
    fileDefinition: {
        decryptionKey: '',
        filepath: '',
    },
}

export const useVault: () => VaultHookType = () => {
    const [{ vault, fileDefinition }, dispatch] = useReducer(
        reducer,
        DefaultVault,
    )

    return [
        {
            vault,
            fileDefinition,
        },
        dispatch,
    ]
}

export const VaultContext = createContext<VaultHookType>([
    DefaultVault,
    () => {},
])

export const useVaultContext = () => {
    return useContext(VaultContext)
}
