import { useRef } from 'react'
import { ValidationState } from '../../../models/input/ValidationState'
import { TextInput } from './TextInput'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'react-toastify'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    hotkey: string
    name?: string
    className?: string
    validationState?: ValidationState
}

export function ClipboardInput({ hotkey, ...props }: Props) {
    const input = useRef<HTMLInputElement>(null)
    const lowerCaseNoSpaceHotkey = hotkey.replace(' ', '').toLowerCase()
    useHotkeys(lowerCaseNoSpaceHotkey, () => {
        // Copy value to clipboard
        copyValueToClipboard()
    })

    const copyValueToClipboard = async () => {
        if (!props.readOnly) return
        const value = input.current?.value
        if (!value) return
        await writeText(value)
        toast.success('Copied to clipboard', {
            position: 'top-center',
        })
    }

    return (
        <div className='relative' onClick={copyValueToClipboard}>
            <TextInput ref={input} {...props} />

            {/* Enable clipboard when the input is readonly. */}
            {props.readOnly && (
                <span className='absolute border-l border-grey-300 pl-2 cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-grey-500 text-sm'>
                    {hotkey}
                </span>
            )}
        </div>
    )
}
