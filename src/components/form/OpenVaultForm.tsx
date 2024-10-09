import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../common/Button'
import { PasswordInput } from './input/PasswordInput'
import { twMerge } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../utils/crypto'
import { FormEvent, useState } from 'react'
import { ValidationState } from '../../models/input/ValidationState'
import { Indicator } from '../common/Indicator'

interface Props {
    onSubmit: (value: string) => Promise<void>
}

export function OpenVaultForm({ onSubmit: onOpen }: Props) {
    const [validationState, setValidationState] = useState<ValidationState>(
        ValidationState.None,
    )
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleOpenSubmit = async (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const password = formData.get('password') as string

        if (!password) {
            setError('Password is required.')
            setValidationState(ValidationState.Fail)
            return
        }

        try {
            const hash = await hashPassword(password)
            await onOpen(hash)
            navigate('/editor')
            return true
        } catch (err) {
            console.error('handled error', err)
            setError('Invalid password or corrupted file.')
            setValidationState(ValidationState.Fail)
            return false
        }
    }

    return (
        <form
            onSubmit={handleOpenSubmit}
            className={twMerge('flex flex-col gap-4 w-full')}
        >
            <div>
                <PasswordInput
                    className='w-full'
                    onKeyUp={_ => {
                        if (error || validationState !== ValidationState.None) {
                            setValidationState(ValidationState.None)
                            setError(null)
                        }
                    }}
                    validationState={validationState}
                />
                {error && <Indicator type='error' text={error} />}
            </div>
            <Button
                label='Unlock'
                icon={{ def: faLockOpen, placement: 'left' }}
                type='submit'
            />
        </form>
    )
}
