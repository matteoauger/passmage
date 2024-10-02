import { open } from '@tauri-apps/plugin-dialog'
import { twMerge } from 'tailwind-merge'
import { openFileDialog } from '../../utils/dialog'

interface Props {
    value: string
    onChange: (value: string) => void
}

export function FileInput({ value, onChange }: Props) {
    return (
        <div
            className={twMerge(
                'border',
                'border-black',
                'border-solid',
                'rounded-2xl',
                'p-2',
                'text-lg',
                'w-full',
                'cursor-pointer',
            )}
            onClick={openFileDialog(onChange)}
        >
            {value}
        </div>
    )
}
