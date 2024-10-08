import { twMerge } from 'tailwind-merge'
import { InputStyles } from '../../../utils/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import { IconInputWrapper } from './IconInputWrapper'
import { ValidationState } from '../../../models/input/ValidationState'
import React, { useEffect, useState } from 'react'

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

export function PasswordInput({
    className,
    validationState,
    name = 'password',
    ...props
}: Props) {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    props.type = visible === true ? 'text' : 'password'
    props.disabled = props.disabled ?? false
    props.placeholder = props.placeholder ?? 'Input master password...'
    return (
        <IconInputWrapper className={className} icon={faKey}>
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

            <span
                className='absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3'
                onClick={toggleVisibility}
            >
                <FontAwesomeIcon
                    icon={visible ? faEyeSlash : faEye}
                    className={twMerge(
                        'h-6 w-6 text-grey-500',
                        props.disabled ? '' : 'hover:text-primary-500',
                    )}
                />
            </span>
        </IconInputWrapper>
    )
}
