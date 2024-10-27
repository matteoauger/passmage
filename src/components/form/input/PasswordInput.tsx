import { faKey } from '@fortawesome/free-solid-svg-icons'
import { ValidationState } from '../../../models/input/ValidationState'
import { useState } from 'react'
import { TextInput } from './TextInput'
import { PasswordGenerator } from '../generator/PasswordGenerator'
import Modal from '../../common/Modal'

interface Props {
    icon?: boolean
    name?: string
    enableGeneration?: boolean
    className?: string
    validationState?: ValidationState
    disabled?: boolean
    placeholder?: string
    value?: string
    label?: string
    onChange?: (val: string) => void
}

export function PasswordInput({
    enableGeneration = false,
    validationState,
    icon = true,
    disabled = false,
    onChange,
    ...props
}: Props) {
    const [visible, setVisible] = useState(false)
    const [enableGenModal, setEnableGenModal] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const type = visible === true ? 'text' : 'password'

    const showGeneration = enableGeneration && !disabled

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
                            onChange?.(password)
                            setEnableGenModal(false)
                        }}
                    />
                </Modal>
            )}
            <TextInput
                validationState={validationState}
                leftIcon={icon ? faKey : undefined}
                onChange={evt => onChange?.(evt.target.value)}
                type={type}
                {...props}
            />
            {/* {showGeneration && (
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
            )} */}
            {/* <span
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
                </span> */}
        </>
    )
}
