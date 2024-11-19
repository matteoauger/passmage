import { useCallback } from 'react'
import { VaultModel } from '../models/VaultModel'
import { decrypt, encrypt } from '../utils/crypto'
import { openFile, saveFile } from '../utils/fs'
import { VaultFileDefinition } from './types'

export function useStorage() {
    const open = async ({
        decryptionKey,
        filepath,
    }: VaultFileDefinition): Promise<VaultModel> => {
        const data = await openFile(filepath)
        const decryptedData = await decrypt(decryptionKey, data)

        if (!decryptedData) {
            throw new Error('Could not open the vault.')
        }

        const vault: VaultModel = JSON.parse(decryptedData)
        return vault
    }

    const save = async (
        { decryptionKey: decryptionKey, filepath }: VaultFileDefinition,
        vault: VaultModel,
    ) => {
        const data = JSON.stringify(vault)
        const encryptedData = await encrypt(decryptionKey, data)
        await saveFile(filepath, encryptedData)
    }

    return {
        open: useCallback(open, []),
        save: useCallback(save, []),
    }
}
