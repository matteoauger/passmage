import { twMerge } from 'tailwind-merge'
import { InputStyles } from '../../../utils/styles'
import { ValidationState } from '../../../models/input/ValidationState'
import { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string
    className?: string
    validationState?: ValidationState
}

const classesByValidationState: Record<ValidationState, string> = {
    [ValidationState.None]: '',
    [ValidationState.Valid]: 'border-2 border-success',
    [ValidationState.Warning]: 'border-2 border-warning',
    [ValidationState.Fail]: 'border-2 border-error',
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
    (
        { validationState, name, className, ...props }: Props,
        ref: React.Ref<any>,
    ) => {
        props.autoComplete = 'off'
        props.spellCheck = false

        return (
            <input
                name={name}
                ref={ref}
                className={twMerge(
                    InputStyles.Default,
                    InputStyles.Hover,
                    classesByValidationState[
                        validationState ?? ValidationState.None
                    ],
                    className,
                )}
                {...props}
            />
        )
    },
)
