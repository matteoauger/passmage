import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface Props {
    label: string
    icon?: IconDefinition
    className?: string
    onClick: () => void
}

export function EntryButton({ label, className, icon, onClick }: Props) {
    return (
        <button
            className={twMerge(
                'flex gap-4 p-4 justify-center items-center hover:text-primary-500 text-lg',
                className,
            )}
            onClick={onClick}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            {label}
        </button>
    )
}
