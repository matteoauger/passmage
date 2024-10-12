import { twMerge } from 'tailwind-merge'
import { InputStyles } from '../../../utils/styles'
import { ValidationState } from '../../../models/input/ValidationState'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string
    validationState?: ValidationState
}

const classesByValidationState: Record<ValidationState, string> = {
    [ValidationState.None]: '',
    [ValidationState.Valid]: 'border-2 border-success',
    [ValidationState.Warning]: 'border-2 border-warning',
    [ValidationState.Fail]: 'border-2 border-error',
}

export function TextInput({ validationState, name, ...props }: Props) {
    return (
        <input
            name={name}
            className={twMerge(
                InputStyles.Default,
                InputStyles.Pad,
                InputStyles.Hover,
                classesByValidationState[
                    validationState ?? ValidationState.None
                ],
            )}
            {...props}
        />
    )
}
