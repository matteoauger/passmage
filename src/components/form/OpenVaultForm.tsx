import { faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../common/Button'
import { PasswordInput } from './input/text/PasswordInput'
import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../../utils/crypto'
import { FormEvent, useState } from 'react'
import { ValidationState } from '../../models/input/ValidationState'
import { Indicator } from '../common/Indicator'
import { useStorage } from '../../hooks/useStorage'
import { useVaultContext } from '../../hooks/useVault'

export function OpenVaultForm() {
    const [{ fileDefinition }, vaultDispatch] = useVaultContext()
    const { open } = useStorage()
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
            const decryptionKey = await hashPassword(password)
            vaultDispatch({
                type: 'SET_DECRYPTION_KEY',
                payload: { decryptionKey },
            })
            const decryptedVault = await open({
                decryptionKey: decryptionKey,
                filepath: fileDefinition.filepath,
            })
            vaultDispatch({
                type: 'SET_VAULT',
                payload: { vault: decryptedVault },
            })
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
            className='flex flex-col gap-4 w-full'
        >
            <div>
                <PasswordInput
                    name='password'
                    placeholder='Master password'
                    onChange={_ => {
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
