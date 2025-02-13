import { twMerge } from 'tailwind-merge'

interface Props {
    name: string
    placeholder: string
    className?: string
    readOnly: boolean
}

export function TextArea({ className, readOnly, ...props }: Props) {
    return (
        <textarea
            className={twMerge(
                'w-full',
                'h-24',
                'p-2',
                'border',
                'border-gray-300',
                'rounded-lg',
                'focus:outline-none',
                'focus:border-violet-500',
                'focus:ring-1',
                'focus:ring-violet-500',
                'transition',
                'duration-200',
                'ease-in-out',
                'resize-none',
                readOnly ? 'bg-gray-100' : '',
                className,
            )}
            readOnly={readOnly}
            {...props}
        />
    )
}
