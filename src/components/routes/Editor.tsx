import { useNavigate } from 'react-router-dom'
import { VaultItem, VaultModel } from '../../models/VaultModel'
import { Button } from '../common/Button'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { EntryForm } from '../form/EntryForm'
import { EntryMenuItem } from '../editor/EntryMenuItem'
import { EntryButton } from '../editor/EntryButton'
import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons'

interface Props {
    vault: VaultModel | null
    onLock: () => void
    onChange: (vault: VaultModel) => void
}

export interface IndexedVaultItem {
    key: string
    value: VaultItem
}

export function Editor({ vault, onLock, onChange }: Props) {
    const navigate = useNavigate()
    const entries = vault ? Object.entries(vault) : []
    const [currentEntry, setCurrentEntry] = useState<IndexedVaultItem | null>(
        null,
    )

    return (
        <section className={twMerge('flex h-full')}>
            <nav
                className={twMerge(
                    'bg-white w-1/4 h-full border-r-2 border-r-primary-500 relative',
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

                <EntryButton
                    icon={faPlus}
                    label=''
                    className='w-full'
                    onClick={() => {
                        setCurrentEntry({
                            key: crypto.randomUUID(),
                            value: new VaultItem(),
                        })
                    }}
                />
                <div className={twMerge('w-full absolute bottom-4 px-4')}>
                    <Button
                        icon={{ def: faLock, placement: 'left' }}
                        label='Lock'
                        className={twMerge('w-full')}
                        onClick={() => {
                            // TODO
                            onLock()
                            navigate('/')
                        }}
                    />
                </div>
            </nav>

            <div className={twMerge('bg-background-100 h-full w-3/4 p-8')}>
                {currentEntry && (
                    <EntryForm
                        entry={currentEntry}
                        onSubmit={item => {
                            onChange({
                                ...vault,
                                [item.key]: item.value,
                            })

                            setCurrentEntry(null)
                        }}
                    />
                )}
            </div>
        </section>
    )
}
