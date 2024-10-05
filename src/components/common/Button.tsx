import { twMerge } from 'tailwind-merge'

interface Props {
    label: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

const classes = [
    'p-6',
    'rounded-2xl',
    'bg-gray-200',
    'text-2xl',
    'font-bold',
    'hover:bg-gray-400',
]

export function Button({ label, onClick = () => {}, type = 'button' }: Props) {
    return (
        <button className={twMerge(classes)} onClick={onClick} type={type}>
            {label}
        </button>
    )
}
