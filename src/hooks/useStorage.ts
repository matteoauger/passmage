import { useCallback } from 'react'
import { VaultModel } from '../models/VaultModel'
import { decrypt, encrypt } from '../utils/crypto'
import { openFile, saveFile } from '../utils/fs'
import { VaultFileDefinition } from './types'

export function useStorage() {
    const open = async ({
        decryptionKey: key,
        filepath,
    }: VaultFileDefinition): Promise<VaultModel> => {
        const data = await openFile(filepath)
        const decryptedData = await decrypt(key, data)

        if (!decryptedData) {
            throw new Error('Could not open the vault.')
        }

        const vault: VaultModel = JSON.parse(decryptedData)
        return vault
    }

    const save = async (
        { decryptionKey: key, filepath }: VaultFileDefinition,
        vault: VaultModel,
    ) => {
        if (!filepath || !key || !vault) {
            return
        }

        const data = JSON.stringify(vault)
        const encryptedData = await encrypt(key, data)
        await saveFile(filepath, encryptedData)
    }

    return {
        open: useCallback(open, []),
        save: useCallback(save, []),
    }
}
