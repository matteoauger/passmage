import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../utils/crypto'
import { PasswordInput } from './input/text/PasswordInput'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../common/Button'
import { Indicator } from '../common/Indicator'
import { FormEvent, useState } from 'react'
import { ValidationState } from '../../models/input/ValidationState'
import { PasswStrengthMeter } from './input/PasswStrengthMeter'
import { useStorage } from '../../hooks/useStorage'
import { useVaultContext } from '../../hooks/useVault'

export function NewVaultForm() {
    const navigate = useNavigate()
    const [{ fileDefinition }, vaultDispatch] = useVaultContext()
    const { save } = useStorage()
    const [validationState, setValidationState] = useState({
        password: ValidationState.None,
        confirmPassword: ValidationState.None,
    })
    const [error, setError] = useState<string | null>(null)
    const [password, setPassword] = useState<string>('')

    const handleSaveSubmit = async (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
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
            const decryptionKey = await hashPassword(password)
            vaultDispatch({
                type: 'SET_DECRYPTION_KEY',
                payload: { decryptionKey },
            })
            const vault = {}
            await save(
                { decryptionKey, filepath: fileDefinition.filepath },
                vault,
            )
            vaultDispatch({
                type: 'SET_VAULT',
                payload: { vault },
            })
            navigate('/editor')
        } catch (err) {
            console.error('handled error', err)
            setValidationState({
                password: ValidationState.Warning,
                confirmPassword: ValidationState.Warning,
            })

            setError('Could not save the file.')
        }
    }

    return (
        <form onSubmit={handleSaveSubmit} className='flex flex-col gap-4 w-2/3'>
            <PasswordInput
                name='password'
                label='Master password'
                value={password}
                onChange={data => setPassword(data)}
                validationState={validationState.password}
            />
            <PasswordInput
                label='Confirm master password'
                name='confirmPassword'
                validationState={validationState.confirmPassword}
            />
            {password && <PasswStrengthMeter password={password} />}
            {error && <Indicator type='error' text={error ?? ''} />}
            <Button
                label='Submit'
                type='submit'
                icon={{ def: faCheck, placement: 'left' }}
            />
        </form>
    )
}
