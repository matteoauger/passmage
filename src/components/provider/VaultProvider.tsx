import { useVault, VaultContext } from '../../hooks/useVault'

interface Props {
    children: React.ReactNode
}

export function VaultProvider({ children }: Props) {
    const vault = useVault()
    return (
        <VaultContext.Provider value={vault}>{children}</VaultContext.Provider>
    )
}
