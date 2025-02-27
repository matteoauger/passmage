import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
    faCheckCircle,
    faInfoCircle,
    faQuestionCircle,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'

interface Props {
    type: 'error' | 'success' | 'warning' | 'info'
    text: string
}

const iconByType: Record<Props['type'], IconDefinition> = {
    error: faXmarkCircle,
    success: faCheckCircle,
    warning: faQuestionCircle,
    info: faInfoCircle,
}

const colorByType: Record<Props['type'], { fg: string; bg: string }> = {
    error: { bg: 'bg-red-700', fg: 'text-white' },
    success: { bg: 'bg-green-700', fg: 'text-white' },
    warning: { bg: 'bg-amber-700', fg: 'text-white' },
    info: { bg: 'bg-accent-300', fg: 'text-gray-800' },
}

export function Indicator({ type, text }: Props) {
    const colors = colorByType[type]
    return (
        <div
            className={twMerge(
                'bg-red-700 text-white mt-2 p-2 rounded-xl text-sm flex items-center gap-2 shadow-xl',
                colors.bg,
                colors.fg,
            )}
        >
            <FontAwesomeIcon icon={iconByType[type]} className='h-4 w-4' />
            {text}
        </div>
    )
}
