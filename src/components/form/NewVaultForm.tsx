import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../utils/crypto'
import { PasswordInput } from './input/PasswordInput'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../common/Button'
import { Indicator } from '../common/Indicator'
import { FormEvent, useContext, useState } from 'react'
import { ValidationState } from '../../models/input/ValidationState'
import { PasswStrengthMeter } from './input/PasswStrengthMeter'
import { VaultContext } from '../provider/VaultProvider'
import { useStorage } from '../../hooks/useStorage'

export function NewVaultForm() {
    const navigate = useNavigate()
    const [{ fileDefinition }, { setDecryptionKey, setVault }] =
        useContext(VaultContext)
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
            const key = await hashPassword(password)
            setDecryptionKey(key)
            const vault = {}
            await save(
                { decryptionKey: key, filepath: fileDefinition.filepath },
                vault,
            )
            setVault(vault)
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
