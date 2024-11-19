import { twMerge } from 'tailwind-merge'
import { EntryModel } from '../../models/EntryModel'

interface Props {
    entry: EntryModel
    onClick: () => void
    selected: boolean
}

export function EntryMenuItem({ entry, onClick, selected }: Props) {
    const classes = [
        'flex',
        'justify-between',
        'items-center',
        'p-2',
        'pl-4',
        'border-b',
        'cursor-pointer',
        selected ? 'border-violet-500' : 'border-gray-300',
        selected ? 'bg-violet-500' : 'bg-white',
        selected ? 'text-white' : 'text-black',
        selected ? 'font-bold' : 'font-normal',
    ]

    return (
        <div className={twMerge(classes)} onClick={() => onClick()}>
            <div className='text-lg font-medium'>{entry.value.name}</div>
        </div>
    )
}
