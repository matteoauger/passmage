import { useReducer } from 'react'
import { VaultModel } from '../models/VaultModel'
import { VaultHookData, VaultHookResult } from './types'
import { EntryModel } from '../models/EntryModel'

type ReducerData =
    | { type: 'SET_VAULT'; payload: { vault: VaultModel } }
    | { type: 'ENTRY_ADD'; payload: { entry: EntryModel } }
    | { type: 'ENTRY_DELETE'; payload: { entryKey: string } }
    | { type: 'SET_DECRYPTION_KEY'; payload: { decryptionKey: string } }
    | { type: 'SET_FILEPATH'; payload: { filepath: string } }

export const useVault: () => VaultHookResult = () => {
    const [{ vault, fileDefinition }, dispatch] = useReducer(reducer, {
        vault: {},
        fileDefinition: {
            decryptionKey: '',
            filepath: '',
        },
    })

    return [
        {
            vault,
            fileDefinition,
        },
        {
            setVault: (vault: VaultModel) =>
                dispatch({
                    type: 'SET_VAULT',
                    payload: { vault },
                }),
            addEntry: (entry: EntryModel) =>
                dispatch({
                    type: 'ENTRY_ADD',
                    payload: { entry },
                }),
            removeEntry: (entryKey: string) =>
                dispatch({
                    type: 'ENTRY_DELETE',
                    payload: { entryKey },
                }),
            setDecryptionKey: (decryptionKey: string) =>
                dispatch({
                    type: 'SET_DECRYPTION_KEY',
                    payload: { decryptionKey },
                }),
            setFilepath: (filepath: string) =>
                dispatch({
                    type: 'SET_FILEPATH',
                    payload: { filepath },
                }),
        },
    ]
}

const reducer = (
    prevState: VaultHookData,
    { type, payload }: ReducerData,
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

        default:
            throw new Error(`Action ${type} not supported`)
    }

    return state
}
