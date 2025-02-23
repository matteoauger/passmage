import { useNavigate } from 'react-router-dom'
import { VaultItem } from '../../models/VaultModel'
import { Button } from '../common/Button'
import { useContext, useEffect, useState } from 'react'
import { EntryForm } from '../form/EntryForm'
import { EntryMenuItem } from '../editor/EntryMenuItem'
import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { SearchBar } from '../editor/SearchBar'
import { VaultContext } from '../provider/VaultProvider'
import { EntryModel } from '../../models/EntryModel'
import { useStorage } from '../../hooks/useStorage'
import { confirm } from '@tauri-apps/plugin-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'
import { BorderClasses } from '../common/style/borderClasses'
import { TextClasses } from '../common/style/textClasses'

export function Editor() {
    const [{ vault, fileDefinition }, vaultActions] = useContext(VaultContext)
    const navigate = useNavigate()

    const [entries, setEntries] = useState(Object.entries(vault))
    const [currentEntry, setCurrentEntry] = useState<EntryModel | null>(null)
    const [search, setSearch] = useState('')
    const { save } = useStorage()

    const entryExists =
        (currentEntry && vault.hasOwnProperty(currentEntry.key)) ?? false

    useEffect(() => {
        setSearch('')
        setEntries(Object.entries(vault))
        save(fileDefinition, vault)
    }, [vault])

    const handleSearch = (term: string) => {
        setSearch(term.toLowerCase())
        if (!term && vault) {
            setEntries(Object.entries(vault))
            return
        }

        var allEntries = Object.entries(vault ?? [])
        const searchResult = allEntries.filter(([_, value]) => {
            const { name, username, url } = value
            return (
                name.toLowerCase().includes(term) ||
                username.toLowerCase().includes(term) ||
                url.toLowerCase().includes(term)
            )
        })

        setEntries(searchResult)
    }

    const handleEntrySubmit = async (item: EntryModel) => {
        vaultActions.addEntry(item)
        setCurrentEntry(item)
    }

    const handleEntryDelete = async (key: string) => {
        // Show up a confirmation dialog.
        const confirmation = await confirm(
            'You are about to permanently delete this entry. Are you sure ?',
            { title: 'Confirm deletion', kind: 'warning' },
        )

        if (confirmation) {
            vaultActions.removeEntry(key)
            setCurrentEntry(null)
        }
    }

    const handleLock = async () => {
        await save(fileDefinition, vault)
        vaultActions.setDecryptionKey('')
        navigate('/')
    }

    const handleNewEntryClick = () => {
        setCurrentEntry({
            key: crypto.randomUUID(),
            value: new VaultItem(),
        })
        setSearch('')
    }

    return (
        <article className='h-full'>
            <header className={twMerge('flex gap-2 p-4 border-b-2 items-center', BorderClasses.Default)}>
                <SearchBar
                    value={search}
                    onChange={term => handleSearch(term)}
                />
                {/* New entry button */}
                <Button
                    icon={{ def: faPlus, placement: 'left' }}
                    onClick={() => handleNewEntryClick()}
                    variant='secondary'
                    className='h-12 w-12'
                />

                {/* Lock vault button */}
                <Button
                    icon={{ def: faLock, placement: 'left' }}
                    variant='secondary'
                    onClick={handleLock}
                    className='h-12 w-12'
                />
            </header>
            <section className='flex h-[calc(100%-90px)]'>
                <nav className={twMerge('w-1/4 flex flex-col overflow-y-auto border-r gap-2 p-2 bg-neutral-100 dark:bg-neutral-800', BorderClasses.Default)}>
                    {entries.map(([key, value]) => {
                        const indexedItem = { key, value }

                        return (
                            <EntryMenuItem
                                key={key}
                                entry={indexedItem}
                                onClick={() => {
                                    setCurrentEntry(indexedItem)
                                }}
                                selected={currentEntry?.key === key}
                            />
                        )
                    })}
                    <button className={twMerge('h-12 w-full', TextClasses.Icon)} type="button" onClick={handleNewEntryClick}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </nav>

                <div className='h-full w-3/4 p-4'>
                    {currentEntry && (
                        <EntryForm
                            entry={currentEntry}
                            isNew={!entryExists}
                            onSubmit={handleEntrySubmit}
                            onDelete={() => {
                                handleEntryDelete(currentEntry.key)
                            }}
                        />
                    )}
                </div>
            </section>
        </article>
    )
}
