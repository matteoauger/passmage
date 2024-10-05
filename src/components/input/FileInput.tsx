import { open } from '@tauri-apps/plugin-dialog'
import { twMerge } from 'tailwind-merge'
import { openFileDialog } from '../../utils/dialog'
import { INPUT_CLASS } from '../../utils/styles'

interface Props {
    value: string
    onChange: (value: string) => void
}

export function FileInput({ value, onChange }: Props) {
    return (
        <div className={INPUT_CLASS} onClick={openFileDialog(onChange)}>
            {value}
        </div>
    )
}
