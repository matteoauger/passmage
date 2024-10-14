import { useNavigate } from 'react-router-dom'
import { VaultItem, VaultModel } from '../../models/VaultModel'
import { Button } from '../common/Button'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { EntryForm } from '../form/EntryForm'
import { EntryMenuItem } from '../editor/EntryMenuItem'
import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { SearchBar } from '../editor/SearchBar'

interface Props {
    vault: VaultModel
    onLock: () => void
    onChange: (vault: VaultModel) => void
}

export interface IndexedVaultItem {
    key: string
    value: VaultItem
}

export function Editor({ vault, onLock, onChange }: Props) {
    const navigate = useNavigate()
    const [entries, setEntries] = useState(vault ? Object.entries(vault) : [])
    const [currentEntry, setCurrentEntry] = useState<IndexedVaultItem | null>(
        null,
    )
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (vault) {
            setEntries(Object.entries(vault))
        }
    }, [vault])

    // Check if the current entry exists in the vault
    const entryExists =
        (currentEntry && vault.hasOwnProperty(currentEntry.key)) ?? false

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

    const handleEntryDelete = (key: string) => {
        if (vault) {
            const { [key]: _, ...rest } = vault
            setCurrentEntry(null)
            onChange(rest)
        }
    }

    return (
        <article className={twMerge('h-full')}>
            <header
                className={twMerge(
                    'flex gap-2 p-4 border-b-2 border-b-grey-300 h-[90px]',
                )}
            >
                <SearchBar
                    value={search}
                    onChange={term => handleSearch(term)}
                />
                <Button
                    icon={{ def: faPlus, placement: 'left' }}
                    onClick={() => {
                        setCurrentEntry({
                            key: crypto.randomUUID(),
                            value: new VaultItem(),
                        })
                    }}
                />
                <Button
                    icon={{ def: faLock, placement: 'left' }}
                    onClick={() => {
                        onLock()
                        navigate('/')
                    }}
                />
            </header>
            <section className={twMerge('flex h-[calc(100%-90px)]')}>
                <nav
                    className={twMerge(
                        'bg-white w-1/4 border-r-2 border-r-grey-300 flex flex-col overflow-y-scroll ',
                    )}
                >
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
                </nav>

                <div className={twMerge('bg-background-100 h-full w-3/4 p-8')}>
                    {currentEntry && (
                        <EntryForm
                            entry={currentEntry}
                            isNew={!entryExists}
                            onSubmit={item => {
                                onChange({
                                    ...vault,
                                    [item.key]: item.value,
                                })
                                setCurrentEntry(item)
                            }}
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
