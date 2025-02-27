import { SettingsContext, useSettings } from '../../hooks/useSettings'

interface Props {
    children: React.ReactNode
}

export function SettingsProvider({ children }: Props) {
    const settings = useSettings()

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    )
}
