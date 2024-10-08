import { twMerge } from 'tailwind-merge'
import { InputStyles } from '../../../utils/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
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
    props.type = 'password'
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
        </IconInputWrapper>
    )
}
