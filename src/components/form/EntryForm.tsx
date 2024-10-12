import { FormEvent } from 'react'
import { IndexedVaultItem } from '../routes/Editor'
import { VaultItem } from '../../models/VaultModel'
import { twMerge } from 'tailwind-merge'
import { TextInput } from './input/TextInput'

interface Props {
    entry: IndexedVaultItem
    onSubmit: (item: IndexedVaultItem) => void
}

export function EntryForm({ entry, onSubmit }: Props) {
    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const data = Object.fromEntries(formData.entries())

        onSubmit({
            key: entry.key,
            value: {
                name: data.name as string,
                username: data.username as string,
                password: data.password as string,
                url: data.url as string,
                notes: data.notes as string,
            },
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={twMerge('grid grid-cols-2 gap-4 w-full bg-transparent')}
        >
            <div>
                <label htmlFor='name'>Name:</label>
                <TextInput type='text' name='name' placeholder='Name' />
            </div>

            <div>
                <label htmlFor='username'>Username:</label>
                <TextInput type='text' name='username' placeholder='Username' />
            </div>

            <div>
                <label htmlFor='password'>Password:</label>
                <TextInput type='text' name='password' placeholder='Password' />
            </div>

            <div>
                <label htmlFor='url'>URL:</label>
                <TextInput type='text' name='url' placeholder='URL' />
            </div>

            <div>
                <label htmlFor='notes'>Notes:</label>
                <textarea name='notes' placeholder='Notes' />
            </div>
            <button type='submit'>Save</button>
        </form>
    )
}
