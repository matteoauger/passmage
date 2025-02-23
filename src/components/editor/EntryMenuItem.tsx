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
        'cursor-pointer',
        'rounded-md',
        'transition-all',
        'text-neutral-900 dark:text-neutral-200',
        selected
            ? 'bg-violet-700 hover:bg-violet-800 text-white font-bold'
            : 'bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600',
    ]

    return (
        <div className={twMerge(classes)} onClick={() => onClick()}>
            <div className='text-lg font-medium'>{entry.value.name}</div>
        </div>
    )
}
