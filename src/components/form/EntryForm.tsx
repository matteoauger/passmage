import { FormEvent, useEffect, useState } from 'react'
import { IndexedVaultItem } from '../routes/Editor'
import { twMerge } from 'tailwind-merge'
import { TextInput } from './input/TextInput'
import { Label } from './Label'
import { Indicator } from '../common/Indicator'
import { Button } from '../common/Button'
import { faFloppyDisk, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TextArea } from './input/TextArea'
import { PasswStrengthMeter } from './input/PasswStrengthMeter'
import { PasswordInput } from './input/PasswordInput'
import { ClipboardInput } from './input/ClipboardInput'

interface Props {
    entry: IndexedVaultItem
    isNew: boolean
    onSubmit: (item: IndexedVaultItem) => void
    onDelete: (key: string) => void
}

export function EntryForm({ entry, isNew, onSubmit, onDelete }: Props) {
    const [isReadonly, setIsReadonly] = useState(true)
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
        setError('') // Reset error message
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
        setIsReadonly(true)

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
                        'flex flex-col gap-4 w-full bg-transparent border-b border-grey-300 pb-4',
                    )}
                >
                    <div className='w-full flex gap-4 border-b border-grey-300 pb-4'>
                        <div className='w-1/2'>
                            <Label htmlFor='entryName' text='Name' />
                            <TextInput
                                type='text'
                                name='entryName'
                                placeholder='Name'
                                readOnly={isReadonly}
                            />
                            {error && <Indicator type='error' text={error} />}
                        </div>
                        <div className='w-1/2'>
                            <Label htmlFor='url' text='URL' />
                            <ClipboardInput
                                hotkey='Ctrl + U'
                                type='text'
                                name='url'
                                placeholder='URL'
                                readOnly={isReadonly}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor='username' text='Username' />
                        <ClipboardInput
                            hotkey='Ctrl + B'
                            type='text'
                            name='username'
                            placeholder='Username'
                            readOnly={isReadonly}
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
                        <PasswStrengthMeter
                            className='mt-2'
                            password={password}
                        />
                    </div>
                </section>

                <div>
                    <Label htmlFor='notes' text='Notes' />
                    <TextArea
                        name='notes'
                        placeholder='Notes'
                        readOnly={isReadonly}
                    />
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

                        {!isReadonly && (
                            <Button
                                type='submit'
                                label='Save'
                                icon={{ def: faFloppyDisk, placement: 'left' }}
                            />
                        )}

                        {isReadonly && (
                            <Button
                                type='button'
                                label='Edit'
                                icon={{ def: faPen, placement: 'left' }}
                                onClick={() => setIsReadonly(false)}
                            />
                        )}
                    </div>
                </div>
            </form>
        </section>
    )
}
