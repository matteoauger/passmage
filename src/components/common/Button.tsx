import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface Props {
    label?: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    className?: string
    icon?: { def: IconDefinition; placement: 'left' | 'right' }
    variant?: 'primary' | 'secondary' | 'danger'
}

const variantClasses = {
    primary: ['bg-violet-500', 'hover:bg-violet-800', 'text-white'],
    secondary: [
        'text-violet-500',
        'border',
        'border-violet-500',
        'hover:bg-violet-800',
        'hover:border-violet-800',
        'hover:text-white',
    ],
    danger: ['bg-red-500', 'hover:bg-red-600', 'text-white'],
}

const baseClasses = [
    'font-bold',
    'rounded-lg',
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    'px-2',
    'py-2',
    'transition-all',
]

export function Button({
    label,
    onClick = () => {},
    type = 'button',
    className,
    icon,
    variant = 'primary',
}: Props) {
    const sizeClasses = !label?.trim() ? ['w-12', 'h-auto'] : ['w-auto']
    return (
        <button
            className={twMerge(
                baseClasses,
                sizeClasses,
                variantClasses[variant],
                className,
            )}
            onClick={onClick}
            type={type}
        >
            {icon && icon.placement === 'left' && (
                <FontAwesomeIcon icon={icon.def} className='h-4 w-4' />
            )}
            {label}
            {icon && icon.placement === 'right' && (
                <FontAwesomeIcon icon={icon.def} className='h-4 w-4' />
            )}
        </button>
    )
}
