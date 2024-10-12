import { twMerge } from 'tailwind-merge'

interface Props {
    htmlFor: string
    text: string
    className?: string
}

export function Label({ htmlFor, className, text }: Props) {
    return (
        <label
            className={twMerge('font-bold text-lg pb-2', className)}
            htmlFor={htmlFor}
        >
            {text}
        </label>
    )
}
