import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface Props {
    icon?: IconDefinition
    children: React.ReactNode
    className?: string
    disabled?: boolean
}

export function IconInputWrapper({
    icon,
    children,
    className,
    disabled = false,
}: Props) {
    return (
        <div
            className={twMerge(
                'group relative text-gray-400 h-auto',
                disabled ? '' : 'hover:text-primary-500',
                className,
            )}
        >
            {icon && (
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    <FontAwesomeIcon
                        icon={icon}
                        className={twMerge(
                            'h-6 w-6 text-grey-500',
                            disabled ? '' : 'group-hover:text-primary-500',
                        )}
                    />
                </span>
            )}
            {children}
        </div>
    )
}
