import { twMerge } from 'tailwind-merge'
import { ValidationState } from '../../../models/input/ValidationState'
import { forwardRef } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type InputWidget = { icon: IconDefinition; onClick: () => void }

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string
    label?: string
    className?: string
    validationState?: ValidationState
    leftIcon?: IconDefinition
    rightText?: string
    disabled?: boolean
    type?: 'text' | 'password'
    widgets?: InputWidget[]
}

const classesByValidationState: Record<ValidationState, string> = {
    [ValidationState.None]: '',
    [ValidationState.Valid]: 'border-2 border-success',
    [ValidationState.Warning]: 'border-2 border-warning',
    [ValidationState.Fail]: 'border-2 border-error',
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
    (
        {
            name,
            label,
            className,
            validationState,
            leftIcon,
            rightText,
            disabled,
            onClick,
            readOnly,
            widgets = [],
            type = 'text',
            ...props
        }: Props,
        ref: React.Ref<any>,
    ) => {
        props.autoComplete = 'off'
        props.autoCorrect = 'off'
        props.autoCapitalize = 'off'
        props.spellCheck = 'false'

        return (
            <div
                className={twMerge(
                    Styles.Default,
                    Styles.Hover,
                    classesByValidationState[
                        validationState ?? ValidationState.None
                    ],
                    readOnly ? Styles.Readonly : [],
                    disabled ? '' : 'hover:text-primary-500',
                    className,
                )}
                onClick={onClick}
            >
                {leftIcon && (
                    <span className='flex items-center w-8 mr-2'>
                        <FontAwesomeIcon
                            icon={leftIcon}
                            className={twMerge(
                                'h-4 w-4 text-grey-500',
                                disabled ? '' : 'group-hover:text-primary-500',
                            )}
                        />
                    </span>
                )}

                <div className='flex flex-col py-2 w-full h-full justify-center'>
                    {label && (
                        <label
                            htmlFor={name}
                            className='text-sm text-bold text-black'
                        >
                            {label}
                        </label>
                    )}
                    <input
                        className={twMerge(
                            'ring-0 w-full focus:outline-none',
                            readOnly ? Styles.Readonly : [],
                        )}
                        name={name}
                        ref={ref}
                        readOnly={readOnly}
                        type={type}
                        {...props}
                    />
                </div>

                {widgets?.length > 0 && (
                    <div className='flex gap-4'>
                        {widgets.map(widget => (
                            <span className='cursor-pointer flex items-center'>
                                <FontAwesomeIcon
                                    icon={widget.icon}
                                    className={twMerge(
                                        'h-6 w-6 text-grey-500',
                                        readOnly
                                            ? ''
                                            : 'hover:text-primary-500',
                                    )}
                                    onClick={widget.onClick}
                                />
                            </span>
                        ))}
                    </div>
                )}

                {rightText && (
                    <div className='text-sm flex items-center border-l border-grey-300 pl-4 min-w-16'>
                        {rightText}
                    </div>
                )}
            </div>
        )
    },
)

const Styles = Object.freeze({
    Default: [
        'text-grey-600',
        'text-lg',
        'border',
        'focus:border-transparent',
        'border-grey-300',
        'rounded-lg',
        'focus:ring-2',
        'focus:outline-none',
        'block',
        'bg-white',
        'w-full',
        'px-4',
        'rounded-l-lg',
        'group',
        'h-auto',
        'flex',
    ].join(' '),
    Hover: [
        'hover:border-primary-500',
        'hover:placeholder-primary-500',
        'hover:text-primary-500',
    ].join(' '),
    Readonly: ['bg-gray-100', 'cursor-pointer'].join(' '),
})
