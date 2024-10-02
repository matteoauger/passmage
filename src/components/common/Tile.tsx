import { twMerge } from 'tailwind-merge'

interface Props {
    label: string
    onClick?: () => void
}

const classes = [
    'p-12',
    'rounded-2xl',
    'bg-gray-200',
    'text-2xl',
    'font-bold',
    'hover:bg-gray-400',
]

export function Tile({ label, onClick }: Props) {
    return (
        <button className={twMerge(classes)} onClick={onClick}>
            {label}
        </button>
    )
}
