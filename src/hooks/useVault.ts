import { useReducer, useState } from 'react'
import { VaultModel } from '../models/VaultModel'
import { VaultHookData } from './types'
import { openFile, saveFile } from '../utils/fs'
import { decrypt, encrypt } from '../utils/crypto'
import { EntryModel } from '../models/EntryModel'

type ReducerData =
    | { type: 'SET'; payload: VaultModel }
    | { type: 'ENTRY_ADD'; payload: EntryModel }
    | { type: 'ENTRY_DELETE'; payload: string }

export const useVault: () => VaultHookData = () => {
    const [vault, dispatch] = useReducer(reducer, {})
    const [key, setKey] = useState('')
    const [filepath, setFilepath] = useState('')

    const openVault = async () => {
        if (!filepath || !key) {
            return
        }
        const data = await openFile(filepath)
        const decryptedData = await decrypt(key, data)

        if (!decryptedData) {
            return
        }

        dispatch({
            type: 'SET',
            payload: JSON.parse(decryptedData) as VaultModel,
        })
    }

    const saveVault = async () => {
        if (!filepath || !key || !vault) {
            return
        }

        const data = JSON.stringify(vault)
        const encryptedData = await encrypt(key, data)
        await saveFile(filepath, encryptedData)
    }

    const createVault = async () => {
        if (!filepath || !key) {
            return
        }

        setKey(key)
        dispatch({
            type: 'SET',
            payload: {},
        })
        await saveVault()
    }

    return [
        {
            vault,
            key,
            filepath,
        },
        {
            addEntry: (entry: EntryModel) =>
                dispatch({
                    type: 'ENTRY_ADD',
                    payload: entry,
                }),
            removeEntry: (entryKey: string) =>
                dispatch({
                    type: 'ENTRY_DELETE',
                    payload: entryKey,
                }),
            createVault,
            openVault,
            saveVault,
            setKey,
            setFilepath,
        },
    ]
}

const reducer = (
    prevState: VaultModel,
    { type, payload }: ReducerData,
): VaultModel => {
    let state = { ...prevState }

    switch (type) {
        case 'SET':
            state = { ...payload }
            break

        case 'ENTRY_ADD':
            const item = { [payload.key]: payload.value }
            state = { ...state, ...item }
            break

        case 'ENTRY_DELETE':
            const { [payload]: _, ...rest } = state
            state = rest
            break

        default:
            throw new Error(`Action ${type} not supported`)
    }

    return state
}
