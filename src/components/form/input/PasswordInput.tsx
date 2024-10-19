import { twMerge } from 'tailwind-merge'
import { InputStyles } from '../../../utils/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowsRotate,
    faEye,
    faEyeSlash,
    faKey,
} from '@fortawesome/free-solid-svg-icons'
import { IconInputWrapper } from './IconInputWrapper'
import { ValidationState } from '../../../models/input/ValidationState'
import React, { useEffect, useState } from 'react'
import { TextInput } from './TextInput'
import { PasswordGenerator } from '../PasswordGenerator'
import Modal from '../../Modal'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: boolean
    name?: string
    enableGeneration?: boolean
    className?: string
    validationState?: ValidationState
}

export function PasswordInput({
    className,
    validationState,
    name = 'password',
    icon = true,
    enableGeneration = false,
    ...props
}: Props) {
    const [visible, setVisible] = useState(false)
    const [enableGenModal, setEnableGenModal] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    props.type = visible === true ? 'text' : 'password'
    props.disabled = props.disabled ?? false
    props.placeholder = props.placeholder ?? 'Input master password...'

    const showGeneration = enableGeneration && !props.disabled

    return (
        <>
            {/* Password generation modal */}
            {showGeneration && enableGenModal && (
                <Modal
                    show={enableGenModal}
                    onClose={() => {
                        setEnableGenModal(false)
                    }}
                >
                    <PasswordGenerator
                        onSubmit={password => {
                            // Change input value to password
                            props.value = password
                            setEnableGenModal(false)
                        }}
                    />
                </Modal>
            )}

            <IconInputWrapper
                className={className}
                icon={icon ? faKey : undefined}
            >
                <TextInput
                    validationState={validationState}
                    name={name}
                    className={twMerge(
                        icon ? InputStyles.Pad : '',
                        showGeneration ? 'pr-20' : 'pr-10',
                    )}
                    {...props}
                />

                {showGeneration && (
                    <span className='absolute cursor-pointer inset-y-0 right-0 flex items-center pr-12'>
                        <FontAwesomeIcon
                            icon={faArrowsRotate}
                            className={twMerge(
                                'h-6 w-6 text-grey-500',
                                props.disabled ? '' : 'hover:text-primary-500',
                            )}
                            onClick={() => {
                                setEnableGenModal(true)
                            }}
                        />
                    </span>
                )}

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
        </>
    )
}
