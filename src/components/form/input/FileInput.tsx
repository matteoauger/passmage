import { createOpenFileDialog } from '../../../utils/dialog/dialog'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { TextInput } from './text/TextInput'
import { FileTypes } from '../../../utils/dialog/types'

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
            className={className}
            nestedElementClassName='cursor-pointer caret-transparent select-none'
            onClick={createOpenFileDialog(onChange, FileTypes.PMV)}
            onChange={evt => onChange(evt.target.value)}
            disabled={disabled}
            leftIcon={faFile}
        />
    )
}
