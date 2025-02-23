import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface Props {
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

export function Checkbox({ label, checked, onChange }: Props) {
    const heightClass = 'w-5 h-5'
    return (
        <label className='flex items-center gap-2 cursor-pointer select-none text-neutral-900 dark:text-neutral-100'>
            <div className={'relative ' + heightClass}>
                <input
                    type='checkbox'
                    checked={checked}
                    onChange={evt => onChange(evt.target.checked)}
                    className={twMerge(
                        'appearance-none',
                        'border-2',
                        'rounded',
                        'transition-all',
                        'duration-200',
                        'cursor-pointer',
                        heightClass,
                        'checked:bg-violet-500',
                        'checked:border-violet-500',
                        'border-gray-300',
                        'hover:border-violet-500',
                    )}
                />
                {checked && (
                    <FontAwesomeIcon
                        icon={faCheck}
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-100 w-3 h-3'
                    />
                )}
            </div>
            <span>{label}</span>
        </label>
    )
}
