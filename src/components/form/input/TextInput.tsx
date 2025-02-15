import { twMerge } from 'tailwind-merge'
import { ValidationState } from '../../../models/input/ValidationState'
import { forwardRef } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type InputWidget = {
    id: string
    icon: IconDefinition
    onClick: () => void
}

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
                    disabled ? '' : 'hover:text-violet-500',
                    className,
                )}
                onClick={onClick}
            >
                {leftIcon && (
                    <span className='flex items-center w-8'>
                        <FontAwesomeIcon
                            icon={leftIcon}
                            className={twMerge(
                                'h-4 w-4 text-gray-500',
                                disabled ? '' : 'group-hover:text-violet-500',
                            )}
                        />
                    </span>
                )}

                <div className='flex flex-col w-full h-full justify-center'>
                    {label && (
                        <label
                            htmlFor={name}
                            className='text-sm text-bold text-black group-hover:text-violet-500'
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
                    <div className='flex gap-2'>
                        {widgets.map(widget => (
                            <span
                                key={widget.id}
                                className='cursor-pointer flex items-center'
                            >
                                <FontAwesomeIcon
                                    icon={widget.icon}
                                    className={twMerge(
                                        'h-5 w-5 text-gray-500',
                                        readOnly ? '' : 'hover:text-violet-500',
                                    )}
                                    onClick={widget.onClick}
                                />
                            </span>
                        ))}
                    </div>
                )}

                {rightText && (
                    <div className='text-sm flex items-center border-l border-gray-300 pl-4 ml-4 min-w-16'>
                        {rightText}
                    </div>
                )}
            </div>
        )
    },
)

const Styles = Object.freeze({
    Default: [
        'text-gray-600',
        'text-lg',
        'border',
        'focus-within:border-violet-500',
        'border-gray-300',
        'rounded-lg',
        'block',
        'bg-white',
        'w-full',
        'p-2',
        'rounded-l-lg',
        'group',
        'h-auto',
        'flex',
    ].join(' '),
    Hover: [
        'hover:border-violet-500',
        'hover:placeholder-violet-500',
        'hover:text-violet-500',
    ].join(' '),
    Readonly: ['bg-gray-100', 'cursor-pointer'].join(' '),
})
