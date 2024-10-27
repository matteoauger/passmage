import { twMerge } from 'tailwind-merge'
import { openFileDialog } from '../../../utils/dialog'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { TextInput } from './TextInput'

interface Props {
    value: string
    placeholder: string
    disabled?: boolean
    onChange: (value: string) => void
    className?: string
}

export function FileInput({
    value,
    placeholder,
    onChange,
    disabled = false,
    className = '',
}: Props) {
    return (
        <TextInput
            type='text'
            value={value}
            placeholder={placeholder}
            className={twMerge('caret-transparent select-none cursor-pointer')}
            onClick={openFileDialog(onChange)}
            onChange={evt => onChange(evt.target.value)}
            disabled={disabled}
            leftIcon={faFile}
        />
    )
}
