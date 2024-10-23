import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { IconInputWrapper } from '../form/input/IconInputWrapper'
import { TextInput } from '../form/input/TextInput'
import { InputStyles } from '../../utils/styles'
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
        <IconInputWrapper icon={faSearch} className='w-full relative'>
            <TextInput
                ref={searchBar}
                placeholder='Search...'
                className={InputStyles.Pad}
                value={value}
                onChange={(e: any) => {
                    onChange(e.target.value)
                }}
            />
            <span className='absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-grey-500 text-sm'>
                Ctrl + K
            </span>
        </IconInputWrapper>
    )
}
