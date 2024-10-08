import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../utils/crypto'
import { twMerge } from 'tailwind-merge'
import { PasswordInput } from './input/PasswordInput'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../common/Button'
import { Indicator } from '../common/Indicator'
import { FormEvent, useState } from 'react'
import { ValidationState } from '../../models/input/ValidationState'

interface Props {
    onSave: (hash: string) => void
}

export function NewVaultForm({ onSave }: Props) {
    const navigate = useNavigate()
    const [validationState, setValidationState] = useState({
        password: ValidationState.None,
        confirmPassword: ValidationState.None,
    })
    const [error, setError] = useState<string | null>(null)

    const handleSaveSubmit = async (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (!password) {
            setValidationState({
                ...validationState,
                password: ValidationState.Fail,
            })
            setError('Please input a master password.')
            return
        }

        if (password !== confirmPassword) {
            setValidationState({
                password: ValidationState.Fail,
                confirmPassword: ValidationState.Fail,
            })
            setError('Passwords do not match.')
            return
        }

        try {
            const hash = await hashPassword(password)
            await onSave(hash)
            navigate('/editor')
        } catch (err) {
            console.log(err)
            setValidationState({
                password: ValidationState.Warning,
                confirmPassword: ValidationState.Warning,
            })

            setError('Could not save the file.')
        }
    }

    return (
        <form
            onSubmit={handleSaveSubmit}
            className={twMerge('flex flex-col gap-4 w-2/3')}
        >
            <div>
                <label className='font-bold text-lg pb-2' htmlFor='password'>
                    Password
                </label>
                <PasswordInput
                    name='password'
                    validationState={validationState.password}
                />
            </div>
            <div>
                <label
                    className='font-bold text-lg pb-2'
                    htmlFor='confirmPassword'
                >
                    Confirm your password
                </label>
                <PasswordInput
                    name='confirmPassword'
                    validationState={validationState.confirmPassword}
                />
            </div>
            {error && <Indicator type='error' text={error ?? ''} />}
            <Button
                label='Submit'
                type='submit'
                icon={{ def: faCheck, placement: 'left' }}
            />
        </form>
    )
}
