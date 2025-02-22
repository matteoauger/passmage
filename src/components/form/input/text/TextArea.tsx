import { twMerge } from 'tailwind-merge'
import { InputThemeClasses } from './style/inputThemeClasses'
import { TextInputWrapper } from './TextInputWrapper'

interface Props {
    name: string
    label: string
    className?: string
    readOnly: boolean
}

export function TextArea({ className, readOnly, ...props }: Props) {
    return (
        <TextInputWrapper
            label={props.label}
            readOnly={readOnly}
            className={twMerge(
                className,
            )}
        >
            <textarea
                className={twMerge(
                    InputThemeClasses.Default,
                    InputThemeClasses.Hover,
                    'w-full',
                    'h-24',
                    'text-sm',
                    'focus:outline-none',
                    'transition',
                    'duration-200',
                    'ease-in-out',
                    'resize-none',
                    readOnly ? InputThemeClasses.Readonly : '',
                    className,
                )}
                readOnly={readOnly}
                {...props}
            />
        </TextInputWrapper>
        
    )
}
