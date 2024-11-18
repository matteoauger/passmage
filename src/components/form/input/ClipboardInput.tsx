import { useRef } from 'react'
import { ValidationState } from '../../../models/input/ValidationState'
import { TextInput } from './TextInput'
import { useHotkeyCopy } from '../../../hooks/useHotkeyCopy'

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
    useHotkeyCopy({
        hotkey,
        enabled: readOnly,
        getValueToCopy: () => {
            return input.current?.value ?? ''
        },
    })

    return (
        <TextInput
            ref={input}
            rightText={readOnly ? hotkey : undefined}
            readOnly={readOnly}
            {...props}
        />
    )
}
