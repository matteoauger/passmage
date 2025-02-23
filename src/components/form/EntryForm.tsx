import { FormEvent, useEffect, useState } from 'react'
import { TextInput } from './input/text/TextInput'
import { Indicator } from '../common/Indicator'
import { Button } from '../common/Button'
import {
    faFloppyDisk,
    faPen,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { TextArea } from './input/text/TextArea'
import { PasswStrengthMeter } from './input/PasswStrengthMeter'
import { PasswordInput } from './input/text/PasswordInput'
import { ClipboardInput } from './input/text/ClipboardInput'
import { EntryModel } from '../../models/EntryModel'
import { twMerge } from 'tailwind-merge'
import { BorderClasses } from '../common/style/borderClasses'

interface Props {
    entry: EntryModel
    isNew: boolean
    onSubmit: (item: EntryModel) => void
    onDelete: (key: string) => void
}

export function EntryForm({ entry, isNew, onSubmit, onDelete }: Props) {
    const [isReadonly, setIsReadonly] = useState(false)
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
        resetForm()

        // Putting the form in readonly mode if the entry exists in the vault (ie. Edit mode).
        // The user will then have to click "edit" to change the entry data.
        setIsReadonly(!isNew)
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
                <section className={twMerge('flex flex-col gap-4 w-full bg-transparent border-b pb-4', BorderClasses.Default)}>
                    <div className={twMerge('w-full flex gap-4 border-b pb-4', BorderClasses.Default)}>
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
                            enableHotkey={true}
                            enableGeneration={true}
                            readOnly={isReadonly}
                            onChange={val => setPassword(val)}
                        />
                        <PasswStrengthMeter
                            className='mt-2'
                            password={password}
                        />
                    </div>
                </section>

                <div className='w-full py-4'>
                    <TextArea
                        name='notes'
                        label='Notes'
                        readOnly={isReadonly}
                    />
                </div>

                <div className='flex justify-between items-center'>
                    <div className='text-gray-500 text-sm'>
                        {createdAt && <span>Created: {createdAt}</span>}
                        <br />
                        {createdAt && <span>Updated: {updatedAt}</span>}
                    </div>

                    <div className='flex gap-2'>
                        {!isReadonly && !isNew && (
                            <Button
                                type='button'
                                label='Delete'
                                variant='danger'
                                icon={{ def: faTrash, placement: 'left' }}
                                onClick={() => onDelete(entry.key)}
                            />
                        )}

                        {!isReadonly && !isNew && (
                            <Button
                                type='submit'
                                label='Discard'
                                variant='secondary'
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
