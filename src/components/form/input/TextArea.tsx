import { twMerge } from 'tailwind-merge'
import { InputThemeClasses } from './style/inputThemeClasses'

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
                InputThemeClasses.default,
                InputThemeClasses.hover,
                InputThemeClasses.wrapper,
                'w-full',
                'h-24',
                'focus:outline-none',
                'transition',
                'duration-200',
                'ease-in-out',
                'resize-none',
                readOnly ? InputThemeClasses.readonly : '',
                className,
            )}
            readOnly={readOnly}
            {...props}
        />
    )
}
