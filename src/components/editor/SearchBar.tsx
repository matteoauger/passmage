import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { IconInputWrapper } from '../form/input/IconInputWrapper'
import { TextInput } from '../form/input/TextInput'
import { InputStyles } from '../../utils/styles'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRef } from 'react'

interface Props {
    onSearch: (entry: string) => void
}

export function SearchBar({ onSearch }: Props) {
    const searchBar = useRef<HTMLInputElement>(null)
    useHotkeys('ctrl+k', () => {
        // Focus on search bar
        const search = searchBar.current
        search?.focus()
        console.log('Focus on search bar')
    })

    return (
        <IconInputWrapper icon={faSearch} className='w-full relative'>
            <TextInput
                ref={searchBar}
                placeholder='Search...'
                className={InputStyles.Pad}
                onChange={(e: any) => {
                    onSearch(e.target.value)
                }}
            />
            <i className='absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-grey-500'>
                Ctrl + K
            </i>
        </IconInputWrapper>
    )
}
