import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface Props {
    label?: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    className?: string
    icon?: { def: IconDefinition; placement: 'left' | 'right' }
}

const classes = [
    'font-bold',
    'rounded-lg',
    'text-lg',
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    'w-auto',
    'px-4',
    'py-4',
    'rounded-xl',
    'bg-primary-500',
    'hover:bg-primary-800',
    'text-white',
    'transition-all',
]

export function Button({
    label,
    onClick = () => {},
    type = 'button',
    className,
    icon,
}: Props) {
    return (
        <button
            className={twMerge(classes, className)}
            onClick={onClick}
            type={type}
        >
            {icon && icon.placement === 'left' && (
                <FontAwesomeIcon icon={icon.def} className='h-6 w-6' />
            )}
            {label}
            {icon && icon.placement === 'right' && (
                <FontAwesomeIcon icon={icon.def} className='h-6 w-6' />
            )}
        </button>
    )
}
