import { useNavigate } from 'react-router-dom'
import { VaultItem, VaultModel } from '../../models/VaultModel'
import { Button } from '../common/Button'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { EntryForm } from '../form/EntryForm'
import { EntryMenuItem } from '../EntryMenuItem'

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
        <section className={twMerge('flex gap-8')}>
            <nav className={twMerge('w-1/5')}>
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

                <Button
                    label='add'
                    onClick={() => {
                        setCurrentEntry({
                            key: crypto.randomUUID(),
                            value: new VaultItem(),
                        })
                    }}
                />
                <Button
                    label='Lock'
                    onClick={() => {
                        // TODO
                        onLock()
                        navigate('/')
                    }}
                />
            </nav>

            <div>
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
