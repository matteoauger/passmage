import { FormEvent, useEffect, useState } from 'react'
import { IndexedVaultItem } from '../routes/Editor'
import { twMerge } from 'tailwind-merge'
import { TextInput } from './input/TextInput'
import { Label } from './Label'
import { Indicator } from '../common/Indicator'
import { Button } from '../common/Button'
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TextArea } from './input/TextArea'
import { PasswStrengthMeter } from './input/PasswStrengthMeter'
import { PasswordInput } from './input/PasswordInput'

interface Props {
    entry: IndexedVaultItem
    isNew: boolean
    onSubmit: (item: IndexedVaultItem) => void
    onDelete: (key: string) => void
}

export function EntryForm({ entry, isNew, onSubmit, onDelete }: Props) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    let createdAt = ''
    let updatedAt = ''
    if (entry.value.createdAtUTC) {
        const createdAtDate = new Date(entry.value.createdAtUTC)
        createdAt = createdAtDate.toLocaleString()
    }
    if (entry.value.updatedAtUTC) {
        const updatedAtDate = new Date(entry.value.updatedAtUTC)
        updatedAt = updatedAtDate.toLocaleString()
    }

    useEffect(() => {
        if (!entry) return
        const form = document.querySelector('form') as HTMLFormElement
        const data = entry.value

        form.entryName.value = data.name
        form.username.value = data.username
        form.password.value = data.password
        form.url.value = data.url
        form.notes.value = data.notes

        setPassword(data.password)
    }, [entry])

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())

        if (!data.entryName) {
            setError('Name is required')
            return
        }

        setError('')

        onSubmit({
            key: entry.key,
            value: {
                name: data.entryName as string,
                username: data.username as string,
                password: data.password as string,
                url: data.url as string,
                notes: data.notes as string,
                createdAtUTC: entry.value.createdAtUTC ?? Date.now(),
                updatedAtUTC: Date.now(),
            },
        })
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <section
                    className={twMerge(
                        'grid grid-cols-2 gap-4 w-full bg-transparent border-b border-grey-300 pb-4',
                    )}
                >
                    <div>
                        <Label htmlFor='entryName' text='Name' />
                        <TextInput
                            type='text'
                            name='entryName'
                            placeholder='Name'
                        />
                        {error && <Indicator type='error' text={error} />}
                    </div>

                    <div>
                        <Label htmlFor='username' text='Username' />
                        <TextInput
                            type='text'
                            name='username'
                            placeholder='Username'
                        />
                    </div>

                    <div>
                        <Label htmlFor='password' text='Password' />
                        <PasswordInput
                            icon={false}
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            enableGeneration={true}
                            onChange={evt => setPassword(evt.target.value)}
                        />
                        {<PasswStrengthMeter password={password} />}
                    </div>

                    <div>
                        <Label htmlFor='url' text='URL' />
                        <TextInput type='text' name='url' placeholder='URL' />
                    </div>
                </section>

                <div>
                    <Label htmlFor='notes' text='Notes' />
                    <TextArea name='notes' placeholder='Notes' />
                </div>

                <div className={twMerge('flex justify-between items-center')}>
                    <div className={twMerge('text-grey-500 text-sm')}>
                        {createdAt && <span>Created: {createdAt}</span>}
                        <br />
                        {createdAt && <span>Updated: {updatedAt}</span>}
                    </div>

                    <div className={twMerge('flex gap-2')}>
                        {!isNew && (
                            <Button
                                type='button'
                                label='Delete'
                                icon={{ def: faTrash, placement: 'left' }}
                                onClick={() => onDelete(entry.key)}
                            />
                        )}

                        <Button
                            type='submit'
                            label='Save'
                            icon={{ def: faFloppyDisk, placement: 'left' }}
                        />
                    </div>
                </div>
            </form>
        </section>
    )
}
