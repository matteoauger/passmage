import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface Props {
    label?: string
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
    className?: string
}

export function Select({ label, value, onChange, options, className }: Props) {
    return (
        <div className='flex flex-col gap-2'>
            {label && (
                <label className='text-neutral-900 dark:text-neutral-100'>{label}</label>
            )}
            <div className='relative'>
                <select
                    value={value}
                    onChange={evt => onChange(evt.target.value)}
                    className={twMerge(
                        'w-full',
                        'appearance-none',
                        'bg-neutral-200',
                        'text-neutral-900',
                        'px-3',
                        'py-2',
                        'pr-10',
                        'border',
                        'border-gray-300',
                        'rounded-lg',
                        'cursor-pointer',
                        'focus:outline-none',
                        'focus:border-violet-500',
                        'focus:ring-1',
                        'focus:ring-violet-500',
                        'hover:border-violet-500',
                        'transition-all',
                        'duration-200',
                        className,
                    )}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-900 pointer-events-none w-4 h-4'
                />
            </div>
        </div>
    )
} 