import { useRef } from 'react'
import { ValidationState } from '../../../models/input/ValidationState'
import { TextInput } from './TextInput'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'react-toastify'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'

interface Props {
    hotkey: string
    name?: string
    label: string
    className?: string
    readOnly?: boolean
    placeholder?: string
    validationState?: ValidationState
}

export function ClipboardInput({ hotkey, readOnly = false, ...props }: Props) {
    const input = useRef<HTMLInputElement>(null)
    const lowerCaseNoSpaceHotkey = hotkey.replace(' ', '').toLowerCase()
    useHotkeys(lowerCaseNoSpaceHotkey, () => {
        // Copy value to clipboard
        if (readOnly) {
            copyValueToClipboard()
        }
    })

    const copyValueToClipboard = async () => {
        const value = input.current?.value
        if (!value) return
        await writeText(value)
        toast.success('Copied to clipboard', {
            position: 'top-center',
        })
    }

    return (
        <TextInput
            ref={input}
            rightText={readOnly ? hotkey : undefined}
            {...props}
        />
    )
}
