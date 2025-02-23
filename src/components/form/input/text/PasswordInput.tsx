import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import { ValidationState } from '../../../../models/input/ValidationState'
import { forwardRef, useState } from 'react'
import { InputWidget } from './TextInput'
import { PasswordGenerator } from '../../generator/PasswordGenerator'
import Modal from '../../../common/Modal'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate'
import { useHotkeyCopy } from '../../../../hooks/useHotkeyCopy'
import { TextInputWrapper } from './TextInputWrapper'
import { twMerge } from 'tailwind-merge'
import { InputThemeClasses } from './style/inputThemeClasses'
import { PasswordBreakdown } from '../../../common/PasswordBreakdown'

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

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            enableGeneration = false,
            validationState,
            icon = true,
            readOnly = false,
            enableHotkey = false,
            onChange,
            ...props
        },
        ref,
    ) => {
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
        const breakdown = readOnly && type === 'text'

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
                <TextInputWrapper
                    validationState={validationState}
                    leftIcon={icon ? faKey : undefined}
                    type={type}
                    widgets={widgets}
                    readOnly={readOnly}
                    rightText={enableHotkey && readOnly ? hotkey : undefined}
                    {...props}
                >
                    {!breakdown && (
                        <input
                            className={twMerge(
                                InputThemeClasses.Common,
                                'ring-0 w-full focus:outline-none',
                                readOnly ? InputThemeClasses.Readonly : [],
                            )}
                            name={props.name}
                            ref={ref}
                            readOnly={readOnly}
                            type={type}
                            onChange={e => {
                                onChange?.(e.target.value)
                            }}
                            {...props}
                        />
                    )}

                    {breakdown && (
                        <div className='w-full'>
                            <PasswordBreakdown password={props.value ?? ''} />
                        </div>
                    )}
                </TextInputWrapper>
            </>
        )
    },
)
