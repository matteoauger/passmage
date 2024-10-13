import { twMerge } from 'tailwind-merge'
import { InputStyles } from '../../../utils/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import { IconInputWrapper } from './IconInputWrapper'
import { ValidationState } from '../../../models/input/ValidationState'
import React, { useEffect, useState } from 'react'
import { TextInput } from './TextInput'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: boolean
    name?: string
    className?: string
    validationState?: ValidationState
}

export function PasswordInput({
    className,
    validationState,
    name = 'password',
    icon = true,
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
        <IconInputWrapper className={className} icon={icon ? faKey : undefined}>
            <TextInput
                validationState={validationState}
                name={name}
                className={icon ? InputStyles.Pad : ''}
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
