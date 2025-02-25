import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'react-toastify'

interface FieldCopySettings {
    enabled?: boolean
    hotkey?: string
    getValueToCopy: () => string
}

export const useClipboard = ({
    enabled,
    hotkey,
    getValueToCopy,
}: FieldCopySettings) => {
    const lowerCaseNoSpaceHotkey = hotkey?.replace(' ', '').toLowerCase()
    const copyToClipboard = async () => {
        if (!enabled) return

        const value = getValueToCopy()
        if (!value) return
        await writeText(value)
        toast.success('Copied to clipboard', {
            position: 'top-center',
        })
    }

    lowerCaseNoSpaceHotkey &&
        useHotkeys(lowerCaseNoSpaceHotkey, copyToClipboard)

    return copyToClipboard
}
