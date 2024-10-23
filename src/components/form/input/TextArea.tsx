import { twMerge } from 'tailwind-merge'

interface Props {
    name: string
    placeholder: string
    className?: string
    readOnly: boolean
}

export function TextArea({ className, ...props }: Props) {
    return (
        <textarea
            className={twMerge(
                'w-full',
                'h-32',
                'p-2',
                'border-2',
                'border-grey-300',
                'rounded-lg',
                'focus:outline-none',
                'focus:border-primary-500',
                'focus:ring-1',
                'focus:ring-primary-500',
                'transition',
                'duration-200',
                'ease-in-out',
                'resize-none',
                className,
            )}
            {...props}
        />
    )
}
