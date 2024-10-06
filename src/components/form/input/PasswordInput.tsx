import { twMerge } from 'tailwind-merge'
import { Input } from '../../../utils/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { IconInputWrapper } from './IconInputWrapper'

interface Props {
    name?: string
    className?: string
}

export function PasswordInput({ className, name = 'password' }: Props) {
    return (
        <IconInputWrapper className={className} icon={faKey}>
            <input
                name={name}
                className={twMerge(Input.Default, Input.Pad, Input.Hover)}
                type='password'
                placeholder='Input master password...'
            />
        </IconInputWrapper>
    )
}
