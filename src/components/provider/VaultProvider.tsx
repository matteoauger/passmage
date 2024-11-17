import { createContext } from 'react'
import { useVault } from '../../hooks/useVault'
import { VaultHookResult } from '../../hooks/types'

interface Props {
    children: React.ReactNode
}

export const VaultContext = createContext<VaultHookResult>([
    {
        vault: {},
        fileDefinition: {
            decryptionKey: '',
            filepath: '',
        },
    },
    {
        setVault: () => {},
        addEntry: () => {},
        removeEntry: () => {},
        setDecryptionKey: () => {},
        setFilepath: () => {},
    },
])

export function VaultProvider({ children }: Props) {
    const vault = useVault()
    return (
        <VaultContext.Provider value={vault}>{children}</VaultContext.Provider>
    )
}
