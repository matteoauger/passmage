import { twMerge } from 'tailwind-merge'
import { ValidationState } from '../../../../models/input/ValidationState'
import { forwardRef } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { InputThemeClasses } from './style/inputThemeClasses'
import { TextInputWrapper } from './TextInputWrapper'

export type InputWidget = {
    id: string
    icon: IconDefinition
    onClick: () => void
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string
    label?: string
    className?: string
    nestedElementClassName?: string
    validationState?: ValidationState
    leftIcon?: IconDefinition
    rightText?: string
    disabled?: boolean
    widgets?: InputWidget[]
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            name,
            label,
            className,
            nestedElementClassName,
            validationState,
            leftIcon,
            rightText,
            disabled,
            onClick,
            readOnly,
            widgets = [],
            ...props
        }: Props,
        ref: React.Ref<any>,
    ) => {
        props.autoComplete = 'off'
        props.autoCorrect = 'off'
        props.autoCapitalize = 'off'
        props.spellCheck = 'false'

        return (
            <TextInputWrapper
                name={name}
                label={label}
                className={className}
                nestedElementClassName={nestedElementClassName}
                validationState={validationState}
                leftIcon={leftIcon}
                rightText={rightText}
                disabled={disabled}
                onClick={onClick}
                readOnly={readOnly}
                widgets={widgets}
            >
                <input
                    className={twMerge(
                        'ring-0 w-full focus:outline-none',
                        InputThemeClasses.Default,
                        InputThemeClasses.Hover,
                        readOnly ? InputThemeClasses.readonly : [],
                        nestedElementClassName,
                    )}
                    name={name}
                    ref={ref}
                    readOnly={readOnly}
                    type='text'
                    {...props}
                />
            </TextInputWrapper>
        )
    },
)
