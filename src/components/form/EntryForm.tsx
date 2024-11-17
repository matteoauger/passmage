import { FormEvent, useEffect, useState } from 'react'
import { TextInput } from './input/TextInput'
import { Label } from './Label'
import { Indicator } from '../common/Indicator'
import { Button } from '../common/Button'
import {
    faFloppyDisk,
    faPen,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { TextArea } from './input/TextArea'
import { PasswStrengthMeter } from './input/PasswStrengthMeter'
import { PasswordInput } from './input/PasswordInput'
import { ClipboardInput } from './input/ClipboardInput'
import { EntryModel } from '../../models/EntryModel'

interface Props {
    entry: EntryModel
    isNew: boolean
    onSubmit: (item: EntryModel) => void
    onDelete: (key: string) => void
}

// TODO debug edition / read modes
// TODO fix bug allowing whitespaces to be calculated in entropy
// TODO fix bug not copying the password to clipboard

export function EntryForm({ entry, isNew, onSubmit, onDelete }: Props) {
    const [isReadonly, setIsReadonly] = useState(!isNew)
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
        resetForm()
    }, [entry])

    const resetForm = () => {
        const form = document.querySelector('form') as HTMLFormElement
        const data = entry.value

        form.entryName.value = data.name
        form.username.value = data.username
        form.password.value = data.password
        form.url.value = data.url
        form.notes.value = data.notes

        setPassword(data.password)
        setError('') // Reset error message
    }

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
                <section className='flex flex-col gap-4 w-full bg-transparent border-b border-grey-300 pb-4'>
                    <div className='w-full flex gap-4 border-b border-grey-300 pb-4'>
                        <div className='w-1/2'>
                            <TextInput
                                type='text'
                                name='entryName'
                                label='Name'
                                placeholder='Input the website name'
                                readOnly={isReadonly}
                            />
                            {error && <Indicator type='error' text={error} />}
                        </div>
                        <div className='w-1/2'>
                            <ClipboardInput
                                hotkey='Ctrl + U'
                                name='url'
                                label='URL'
                                placeholder='URL'
                                readOnly={isReadonly}
                            />
                        </div>
                    </div>

                    <div>
                        <ClipboardInput
                            hotkey='Ctrl + B'
                            name='username'
                            label='Username'
                            placeholder='Username'
                            readOnly={isReadonly}
                        />
                    </div>
                    <div>
                        <PasswordInput
                            label='Password'
                            icon={false}
                            name='password'
                            value={password}
                            enableGeneration={true}
                            onChange={val => setPassword(val)}
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

                <div className='flex justify-between items-center'>
                    <div className='text-grey-500 text-sm'>
                        {createdAt && <span>Created: {createdAt}</span>}
                        <br />
                        {createdAt && <span>Updated: {updatedAt}</span>}
                    </div>

                    <div className='flex gap-2'>
                        {!isReadonly && !isNew && (
                            <Button
                                type='button'
                                label='Delete'
                                icon={{ def: faTrash, placement: 'left' }}
                                onClick={() => onDelete(entry.key)}
                            />
                        )}

                        {!isReadonly && !isNew && (
                            <Button
                                type='submit'
                                label='Discard'
                                icon={{ def: faXmark, placement: 'left' }}
                                onClick={resetForm}
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
