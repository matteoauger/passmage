import { twMerge } from 'tailwind-merge'
import { IndexedVaultItem } from './routes/Editor'

interface Props {
    entry: IndexedVaultItem
    onClick: (entry: IndexedVaultItem) => void
    selected: boolean
}

export function EntryMenuItem({ entry, onClick, selected }: Props) {
    const classes = [
        'flex',
        'justify-between',
        'items-center',
        'px-4',
        'py-2',
        'border-b',
        selected ? 'border-blue-500' : 'border-gray-200',
    ]

    return (
        <div className={twMerge(classes)} onClick={() => onClick(entry)}>
            <div>
                <div className='text-lg font-medium'>{entry.value.name}</div>
            </div>
            <div></div>
        </div>
    )
}
