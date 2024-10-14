import { twMerge } from 'tailwind-merge'
import { IndexedVaultItem } from '../routes/Editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Props {
    entry: IndexedVaultItem
    onClick: () => void
    selected: boolean
}

export function EntryMenuItem({ entry, onClick, selected }: Props) {
    const classes = [
        'flex',
        'justify-between',
        'items-center',
        'p-2',
        'border-b',
        'cursor-pointer',
        selected ? 'border-primary-500' : 'border-grey-300',
        selected ? 'bg-primary-500' : 'bg-white',
        selected ? 'text-white' : 'text-black',
        selected ? 'font-bold' : 'font-normal',
    ]

    return (
        <div className={twMerge(classes)} onClick={() => onClick()}>
            <div className='text-lg font-medium'>{entry.value.name}</div>
        </div>
    )
}
