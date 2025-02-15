import { useEffect, useState } from 'react'
import { Button } from '../../common/Button'
import { invoke } from '@tauri-apps/api/core'
import { PasswStrengthMeter } from '../input/PasswStrengthMeter'
import { faArrowRight, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import { Checkbox } from '../input/Checkbox'
import { PasswordShowcase } from './PasswordShowcase'
import { Select } from '../input/Select'

type PasswordType = 'password' | 'passphrase'

interface Props {
    onSubmit: (password: string) => void
}

export function PasswordGenerator({ onSubmit }: Props) {
    const [password, setPassword] = useState('')
    const [type, setType] = useState<PasswordType>('password')
    const [length, setLength] = useState(16)

    // Used for password only
    const [capitals, setCapitals] = useState(true)
    const [numbers, setNumbers] = useState(true)
    const [specials, setSpecials] = useState(true)

    // Used for passphrase only
    const [separator, setSeparator] = useState('-')

    let lengthBoundaries = [
        type === 'password' ? 6 : 2,
        type === 'password' ? 64 : 12,
    ]

    useEffect(() => {
        generatePassword()
    }, [])

    // Automatically generate a password when parameters are updated
    useEffect(() => {
        generatePassword()
    }, [type, length, capitals, numbers, specials, separator])

    useEffect(() => {
        let boundLength = length
        boundLength = Math.min(boundLength, lengthBoundaries[1])
        boundLength = Math.max(boundLength, lengthBoundaries[0])

        setLength(boundLength)
    }, [type])

    const generatePassword = async () => {
        if (type === 'passphrase') {
            const password = (await invoke('gen_passphrase', {
                length,
                separator,
            })) as string
            setPassword(password)
            return
        }
        const password = (await invoke('gen_password', {
            length,
            capitals,
            numbers,
            specials,
        })) as string
        setPassword(password)
    }

    const typeOptions = [
        { value: 'password', label: 'Password' },
        { value: 'passphrase', label: 'Passphrase' },
    ]

    const separatorOptions = [
        { value: '-', label: '-' },
        { value: '_', label: '_' },
        { value: '.', label: '.' },
        { value: ' ', label: 'Space' },
    ]

    return (
        <div className={twMerge('flex flex-col gap-4')}>
            <h3 className='text-2xl mb-2'>Generate a password :</h3>

            <div className='flex gap-2 w-full'>
                <PasswordShowcase
                    value={password}
                    className={twMerge('w-full')}
                />
            </div>
            <PasswStrengthMeter password={password} />

            <div>
                <h4>Options</h4>
                <div className='flex flex-col gap-4'>
                    <Select
                        label='Type'
                        value={type}
                        onChange={value => setType(value as PasswordType)}
                        options={typeOptions}
                    />
                    
                    <div className='flex gap-2'>
                        <label>Length:</label>
                        <input
                            type='range'
                            value={length}
                            min={lengthBoundaries[0]}
                            max={lengthBoundaries[1]}
                            onChange={evt => setLength(+evt.target.value)}
                        />
                        <input
                            type='number'
                            value={length}
                            onChange={evt => setLength(+evt.target.value)}
                        />
                    </div>

                    {type === 'password' && (
                        <>
                            <Checkbox
                                label='Include capitals'
                                checked={capitals}
                                onChange={setCapitals}
                            />
                            <Checkbox
                                label='Include numbers'
                                checked={numbers}
                                onChange={setNumbers}
                            />
                            <Checkbox
                                label='Include specials'
                                checked={specials}
                                onChange={setSpecials}
                            />
                        </>
                    )}
                    
                    {type === 'passphrase' && (
                        <Select
                            label='Separator'
                            value={separator}
                            onChange={setSeparator}
                            options={separatorOptions}
                        />
                    )}
                </div>
            </div>

            <div className='flex gap-2 justify-end'>
                <Button
                    onClick={() => generatePassword()}
                    icon={{ def: faArrowsRotate, placement: 'left' }}
                />
                <Button
                    onClick={() => onSubmit(password)}
                    label='Apply'
                    icon={{ def: faArrowRight, placement: 'right' }}
                />
            </div>
        </div>
    )
}
