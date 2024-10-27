import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { TextInput } from '../form/input/TextInput'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRef } from 'react'

interface Props {
    value: string
    onChange: (term: string) => void
}

export function SearchBar({ value, onChange }: Props) {
    const searchBar = useRef<HTMLInputElement>(null)
    useHotkeys('ctrl+k', () => {
        // Focus on search bar
        const search = searchBar.current
        search?.focus()
    })

    return (
        <TextInput
            ref={searchBar}
            leftIcon={faSearch}
            className='w-full'
            rightText='Ctrl + K'
            placeholder='Search...'
            value={value}
            onChange={(e: any) => {
                onChange(e.target.value)
            }}
        />
    )
}
