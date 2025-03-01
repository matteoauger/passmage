import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import { useSettingsContext } from '../hooks/useSettings'

export function ThemeToggle() {
    const [{ theme }, dispatch] = useSettingsContext()

    const handleButtonClick = () => {
        dispatch({
            type: 'TOGGLE_THEME',
        })
    }

    return (
        <div className='flex items-center gap-2 text-sm'>
            <FontAwesomeIcon
                icon={faSun}
                className='text-neutral-500'
                onClick={handleButtonClick}
            />
            <label className='relative inline-flex items-center cursor-pointer'>
                <input
                    type='checkbox'
                    checked={theme === 'dark'}
                    onChange={handleButtonClick}
                    className='sr-only peer'
                />
                <div
                    className={twMerge(
                        'w-11 h-6 bg-neutral-200 rounded-full peer dark:bg-neutral-700',
                        'peer-checked:after:translate-x-full peer-checked:after:border-white',
                        'after:content-[""] after:absolute after:top-0.5 after:left-[2px] after:bg-white',
                        'after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5',
                        'after:transition-all dark:border-neutral-600 peer-checked:bg-violet-600',
                    )}
                />
            </label>
            <FontAwesomeIcon
                icon={faMoon}
                className='text-neutral-500'
                onClick={handleButtonClick}
            />
        </div>
    )
}
