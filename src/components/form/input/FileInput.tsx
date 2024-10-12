import { open } from '@tauri-apps/plugin-dialog'
import { twMerge } from 'tailwind-merge'
import { openFileDialog } from '../../../utils/dialog'
import { InputStyles } from '../../../utils/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { IconInputWrapper } from './IconInputWrapper'

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
        <IconInputWrapper
            className={twMerge(className, 'cursor-pointer')}
            icon={faFile}
            disabled={disabled}
        >
            <input
                type='text'
                value={value}
                placeholder={placeholder}
                className={twMerge(
                    InputStyles.Default,
                    InputStyles.Pad,
                    'caret-transparent select-none cursor-pointer',
                    disabled === true
                        ? 'border-none shadow-none'
                        : InputStyles.Hover,
                )}
                onClick={openFileDialog(onChange)}
                onChange={evt => onChange(evt.target.value)}
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
                disabled={disabled}
            />
        </IconInputWrapper>
    )
}
