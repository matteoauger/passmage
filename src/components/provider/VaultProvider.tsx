import { createContext } from 'react'
import { useVault } from '../../hooks/useVault'
import { VaultHookData } from '../../hooks/types'

interface Props {
    children: React.ReactNode
}

export const VaultContext = createContext<VaultHookData>([
    {
        vault: {},
        key: '',
        filepath: '',
    },
    {
        addEntry: () => {},
        removeEntry: () => {},
        createVault: async () => {},
        openVault: async () => {},
        saveVault: async () => {},
        setKey: () => {},
        setFilepath: () => {},
    },
])

export function VaultProvider({ children }: Props) {
    const vault = useVault()
    return (
        <VaultContext.Provider value={vault}>{children}</VaultContext.Provider>
    )
}
