import { twMerge } from 'tailwind-merge'
import { IndexedVaultItem } from '../routes/Editor'

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
        'cursor-pointer',
        selected ? 'border-primary-500' : 'border-gray-200',
        selected ? 'bg-primary-500' : 'bg-white',
        selected ? 'text-white' : 'text-black',
        selected ? 'font-bold' : 'font-normal',
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
