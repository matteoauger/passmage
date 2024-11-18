import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import { ValidationState } from '../../../models/input/ValidationState'
import { useState } from 'react'
import { InputWidget, TextInput } from './TextInput'
import { PasswordGenerator } from '../generator/PasswordGenerator'
import Modal from '../../common/Modal'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate'
import { useHotkeyCopy } from '../../../hooks/useHotkeyCopy'

interface Props {
    icon?: boolean
    name?: string
    enableGeneration?: boolean
    className?: string
    validationState?: ValidationState
    placeholder?: string
    value?: string
    label?: string
    readOnly?: boolean
    enableHotkey?: boolean
    onChange?: (val: string) => void
}

export function PasswordInput({
    enableGeneration = false,
    validationState,
    icon = true,
    readOnly = false,
    enableHotkey = false,
    onChange,
    ...props
}: Props) {
    const [visible, setVisible] = useState(false)
    const [enableGenModal, setEnableGenModal] = useState(false)

    const hotkey = 'Ctrl + C'
    useHotkeyCopy({
        hotkey,
        enabled: enableHotkey && readOnly,
        getValueToCopy: () => {
            return props.value ?? ''
        },
    })

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const type = visible === true ? 'text' : 'password'

    const showGeneration = enableGeneration && !readOnly

    let widgets: InputWidget[] = [
        {
            id: 'reveal',
            icon: visible ? faEyeSlash : faEye,
            onClick: () => toggleVisibility(),
        },
    ]

    if (showGeneration) {
        widgets = [
            {
                id: 'generate',
                icon: faArrowsRotate,
                onClick: () => setEnableGenModal(true),
            },
            ...widgets,
        ]
    }

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
                widgets={widgets}
                readOnly={readOnly}
                rightText={enableHotkey && readOnly ? hotkey : undefined}
                {...props}
            />
        </>
    )
}
