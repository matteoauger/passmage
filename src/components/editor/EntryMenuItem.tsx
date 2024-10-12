import { twMerge } from 'tailwind-merge'
import { IndexedVaultItem } from '../routes/Editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Props {
    entry: IndexedVaultItem
    onClick: () => void
    onDelete: () => void
    selected: boolean
}

export function EntryMenuItem({ entry, onClick, onDelete, selected }: Props) {
    const classes = [
        'flex',
        'justify-between',
        'items-center',
        'px-4',
        'py-2',
        'border-b',
        'cursor-pointer',
        selected ? 'border-primary-500' : 'border-grey-300',
        selected ? 'bg-primary-500' : 'bg-white',
        selected ? 'text-white' : 'text-black',
        selected ? 'font-bold' : 'font-normal',
    ]

    return (
        <div className={twMerge(classes)} onClick={() => onClick()}>
            <div>
                <div className='text-lg font-medium'>{entry.value.name}</div>
            </div>
            <span onClick={() => onDelete()}>
                <FontAwesomeIcon icon={faTrash} />
            </span>
        </div>
    )
}
