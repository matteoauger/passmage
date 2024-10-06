import { FormEvent } from 'react'
import { IndexedVaultItem } from '../routes/Editor'
import { VaultItem } from '../../models/VaultModel'

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
        <form onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='Name' />
            <input type='text' name='username' placeholder='Username' />
            <input type='text' name='password' placeholder='Password' />
            <input type='text' name='url' placeholder='URL' />
            <textarea name='notes' placeholder='Notes' />
            <button type='submit'>Save</button>
        </form>
    )
}
