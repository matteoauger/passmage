import { FormEvent, useEffect, useState } from 'react'
import { IndexedVaultItem } from '../routes/Editor'
import { VaultItem } from '../../models/VaultModel'
import { twMerge } from 'tailwind-merge'
import { TextInput } from './input/TextInput'
import { Label } from './Label'
import { Indicator } from '../common/Indicator'
import { Button } from '../common/Button'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { TextArea } from './input/TextArea'

interface Props {
    entry: IndexedVaultItem
    onSubmit: (item: IndexedVaultItem) => void
}

export function EntryForm({ entry, onSubmit }: Props) {
    const [error, setError] = useState('')
    useEffect(() => {
        if (!entry) return
        const form = document.querySelector('form') as HTMLFormElement
        const data = entry.value

        form.entryName.value = data.name
        form.username.value = data.username
        form.password.value = data.password
        form.url.value = data.url
        form.notes.value = data.notes
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
                        <TextInput
                            type='password'
                            name='password'
                            placeholder='Password'
                        />
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

                <div className={twMerge('flex justify-end items-center')}>
                    <Button
                        type='submit'
                        label='Save'
                        icon={{ def: faFloppyDisk, placement: 'left' }}
                    />
                </div>
            </form>
        </section>
    )
}
