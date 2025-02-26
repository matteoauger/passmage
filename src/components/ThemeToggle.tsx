import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { twMerge } from 'tailwind-merge'
import { useSettingsContext } from '../hooks/useSettings'

export function ThemeToggle({ className }: { className?: string }) {
    const [{ theme }, dispatch] = useSettingsContext()

    const handleButtonClick = () => {
        dispatch({
            type: 'TOGGLE_THEME',
        })
    }

    return (
        <button
            onClick={handleButtonClick}
            className={twMerge('text-xl', className)}
        >
            {theme === 'light' ? (
                <FontAwesomeIcon
                    icon={faMoon}
                    className='text-neutral-500 hover:text-neutral-700'
                />
            ) : (
                <FontAwesomeIcon
                    icon={faSun}
                    className='text-neutral-500 hover:text-neutral-300'
                />
            )}
        </button>
    )
}
