import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'react-toastify'

interface HotkeyCopySettings {
    hotkey: string
    enabled?: boolean
    getValueToCopy: () => string
}

export const useHotkeyCopy = ({
    hotkey,
    enabled,
    getValueToCopy,
}: HotkeyCopySettings) => {
    const lowerCaseNoSpaceHotkey = hotkey.replace(' ', '').toLowerCase()
    return useHotkeys(lowerCaseNoSpaceHotkey, async () => {
        if (enabled) {
            const value = getValueToCopy()
            if (!value) return
            await writeText(value)
            toast.success('Copied to clipboard', {
                position: 'top-center',
            })
        }
    })
}
